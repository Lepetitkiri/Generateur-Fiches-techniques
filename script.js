/**
 * ==============================================================================
 * APPLICATION : Générateur de Fiches Techniques - Ramery Génie Thermique
 * DESCRIPTION : Automatisation de la création d'arborescence projet à partir
 * d'un export Excel de suivi de plans.
 * ==============================================================================
 */

/**
 * Contenu binaire du modèle Word récupéré via le réseau.
 * Stocké en global pour être réutilisé lors de la génération des fiches.
 * Initialisé à null au démarrage car le fichier Template-FT n'est pas encore chargé
 * @type {ArrayBuffer|null}
 */
window.templateBinaire = null;

/**
 * Fonction asynchrone permettant de récupérer le fichier modèle Word (Template-FT.docx).
 * Met à jour dynamiquement l'interface utilisateur selon l'état de la requête.
 * @async
 * @function initialiserTemplate
 * @returns {Promise<void>}
 */
async function initialiserTemplate() {

    // Récupération des éléments HTML créés à l'étape précédente pour mettre à jour l'interface.
    const statusIcon = document.getElementById('status-icon');
    const statusText = document.getElementById('status-text');
    const statusBar = document.getElementById('template-status');

    try {

        // Requête HTTP GET pour obtenir le fichier world source.
        const reponse = await fetch('./Template-FT.docx');

        if (!reponse.ok) {
            throw new Error('Le fichier modèle est introuvable sur le serveur.');
        }

        // Transformation de la réponse brute du serveur en données binaires pour utilisation par PizZip plus tard.
        window.templateBinaire = await reponse.arrayBuffer();

        // Mise à jour de l'interface utilisateur si succès
        statusText.textContent = 'Modèle Word opérationnel';
        statusIcon.textContent = '✅';
        statusBar.classList.add('status-success');
        statusIcon.classList.remove('spin-animation'); /*suppression de l'animation rotation*/

    } catch (erreur) {

        // GESTION DE L'ERREUR
        // Si le chemin est faux ou si le fichier est corrompu, ce bloc s'exécute.
        console.error('Échec de l\'acquisition du template :', erreur);

        // Mise à jour de l'interface utilisateur si succès
        statusIcon.textContent = '❌';
        statusText.textContent = 'Erreur : Modèle Word non chargé';
        statusBar.classList.add('status-error');

        // On arrête la rotation pour marquer l'arrêt définitif du processus.
        statusIcon.classList.remove('spin-animation');
    }
}

/// Appel à la fonction
initialiserTemplate();





/** @type {HTMLElement} Zone de dépôt des fichiers */
const dropArea = document.getElementById('drop-area');

/** @type {HTMLInputElement} Champ de sélection de fichier */
const fileInput = document.getElementById('fileInput');

/** @type {HTMLButtonElement} Bouton de lancement du processus */
const processBtn = document.getElementById('processBtn');

/** * État global de l'application
 * @namespace
 */
window.fichierSource = null;
window.projetActif = null;

/**
 * MODULE 1 : GESTION DES ENTRÉES FICHIERS
 * Initialisation des écouteurs d'événements pour l'acquisition du document.
 */

// Neutralisation des comportements natifs du navigateur pour le drag & drop
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
});

/** @listens drop */
dropArea.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) chargerFichier(files[0]);
});

/** @listens change */
fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files.length > 0) chargerFichier(files[0]);
});

/**
 * Enregistre le fichier en mémoire et met à jour l'état de l'interface.
 * @param {File} file - Objet fichier récupéré depuis l'interface.
 * @returns {void}
 */
function chargerFichier(file) {
    window.fichierSource = file;

    const fileNameSpan = document.getElementById('file-name');
    const fileInfoArea = document.getElementById('file-info');

    if (fileNameSpan && fileInfoArea) {
        fileNameSpan.textContent = file.name;
        fileInfoArea.classList.remove('hidden');
        dropArea.classList.add('hidden');
    }
}

/**
 * MODULE 2 : TRAITEMENT DES DONNÉES EXCEL
 * Orchestre la lecture du binaire et la conversion en objet exploitable.
 */

/**
 * Lit le binaire du fichier Excel et extrait les données de l'onglet cible.
 * @async
 * @returns {Promise<void>}
 */
async function traiterFichierExcel() {
    /** @type {File} */
    const file = window.fichierSource;
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
        /** @type {Uint8Array} */
        const data = new Uint8Array(e.target.result);

        // Lecture du classeur via la librairie XLSX
        const workbook = XLSX.read(data, { type: 'array' });

        /** @const {string} Nom de l'onglet source dans le fichier Ramery */
        const sheetName = "Liste Plan & NdC";
        const worksheet = workbook.Sheets[sheetName];

        if (!worksheet) {
            alert(`Erreur : L'onglet "${sheetName}" est introuvable.`);
            return;
        }

        /** @type {Array<Array<any>>} Conversion en matrice (Tableau de tableaux) */
        const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        analyserContenuExcel(rawData);
    };
    reader.readAsArrayBuffer(file);
}

/**
 * Extrait les métadonnées du chantier et filtre les fiches techniques valides.
 * @param {Array<Array<any>>} data - Matrice de données issue de l'Excel.
 * @returns {void}
 */
function analyserContenuExcel(data) {
    /** @type {any[]} Première ligne contenant les métadonnées de l'en-tête */
    const headerRow = data[0] || [];

    // Extraction du Nom du Chantier (Recherche sur plage B1:H1)
    let nomChantier = "Chantier_Inconnu";
    for (let i = 1; i <= 7; i++) {
        if (headerRow[i] && headerRow[i].toString().trim() !== "") {
            nomChantier = headerRow[i].toString().trim();
            break;
        }
    }

    // Extraction du Numéro de Chantier (Recherche sur plage J1:L1)
    let numChantier = "000000";
    for (let i = 9; i <= 11; i++) {
        const val = headerRow[i];
        if (val && !isNaN(val) && val.toString().trim() !== "") {
            numChantier = val.toString().trim();
            break;
        }
    }

    // Filtrage des fiches techniques
    /** @type {Array<{designation: string, reference: string}>} */
    const fichesExtract = [];

    // Analyse itérative des lignes pour identifier les spécifications techniques
    data.forEach(ligne => {
        const designation = ligne[0] ? ligne[0].toString().trim().toLowerCase() : "";
        const reference = ligne[2] ? ligne[2].toString().trim().toUpperCase() : "";

        // Critères métier : Présence de "ST-" en référence et mots-clés en désignation
        const aMarqueurST = reference.includes("ST-");
        const contientMotCle = designation.includes("spéc") || designation.includes("fich");

        if (aMarqueurST && contientMotCle) {
            fichesExtract.push({
                designation: ligne[0].toString().trim(),
                reference: reference
            });
        }
    });

    // Sauvegarde de la structure projet
    window.projetActif = {
        nom: nomChantier,
        numero: numChantier,
        fiches: fichesExtract
    };

    genererStructureZip();
}

/**
 * MODULE 3 : GÉNÉRATION DE L'ARCHIVE ZIP
 * Construit l'arborescence de dossiers formatée dans un objet JSZip.
 */

/**
 * Génère les dossiers et sous-dossiers (master/old) pour chaque fiche technique.
 * @async
 * @returns {Promise<void>}
 */
async function genererStructureZip() {
    const projet = window.projetActif;
    if (!projet || projet.fiches.length === 0) {
        alert("Aucune fiche technique valide n'a été détectée.");
        return;
    }

    const zip = new JSZip();

    /** @const {string} Nom de la racine de l'archive */
    const nomDossierRacine = "4-Matériels pour études";
    const dossierRacine = zip.folder(nomDossierRacine);

    for (const fiche of projet.fiches) {
        // Extraction de la référence courte (ex: ST-603)
        const indexST = fiche.reference.indexOf("ST-");
        const refCourte = indexST !== -1 ? fiche.reference.substring(indexST) : fiche.reference;

        // Nettoyage métier de la désignation (Suppression des préfixes/suffixes techniques)
        const desigNettoyee = fiche.designation
            .replace(/Spécification technique/gi, "")
            .replace(/CLIM|CVC|VENT|EG|CH/gi, "")
            .trim();

        // Creation de l'arborescence 
        /** @type {string} Nom du dossier de la fiche (Format: "REF Désignation") */
        const nomDossierFiche = `${refCourte} ${desigNettoyee}`;

        const folderFiche = dossierRacine.folder(nomDossierFiche);

        folderFiche.folder("old");
        const folderMaster = folderFiche.folder("master");

        // Initialisation du moteur du rendu word
        try {
            /** * Chargement du binaire dans PizZip. 
             * @type {PizZip}
             */
            const zipTemplate = new window.PizZip(window.templateBinaire);

            /** * Initialisation de Docxtemplater.
             * Configuration des options de rendu pour la gestion des paragraphes et retours à la ligne.
             * @type {docxtemplater}
             */
            const doc = new window.docxtemplater(zipTemplate, {
                paragraphLoop: true,
                linebreaks: true,
            });

            // Génération du document word
            try {
                /** * Injection des données dans le template
                 * Ces clés doivent correspondre exactement aux balises entre accolades du Template
                 * @type {Object}
                 */
                doc.setData({
                    nomProjet: "PROJET TEST RAMERY",
                    titreFiche: "FICHE TECHNIQUE DEMO",
                    complémentReference: "REF-000-XYZ",
                    descriptifFiche: "Descriptif fiche à remplir."
                });

                // Exécution de la fusion des données
                doc.render();

                /**
                 * Génération du binaire final (Blob).
                 * On récupère le contenu modifié et on le recompresse au format .docx.
                 * @type {Blob}
                 */
                const out = doc.getZip().generate({
                    type: "blob",
                    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                });

                // Note pour l'étape suivante : 'out' contient maintenant le fichier Word prêt à être mis dans le ZIP.

            } catch (erreur) {
                // Gestion spécifique des erreurs de rendu Docxtemplater
                const e = {
                    message: erreur.message,
                    name: erreur.name,
                    stack: erreur.stack,
                    properties: erreur.properties,
                };
                console.error("[Moteur Word] Erreur lors du rendu de la fiche :", e);
            }

        } catch (erreur) {
            console.error(`[Moteur Word] Erreur d'initialisation pour la fiche : ${nomDossierFiche}`, erreur);
        }
    }

    await finaliserExportZip(zip, "4-Matériels pour études");
}

/**
 * Convertit l'objet ZIP en BLOB et déclenche le téléchargement.
 * @async
 * @param {JSZip} zip - L'instance JSZip à compiler.
 * @param {string} nomFichier - Nom du fichier de sortie (sans extension).
 * @returns {Promise<void>}
 */
async function finaliserExportZip(zip, nomFichier) {
    const content = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE", // Force la compression au lieu du simple stockage
        compressionOptions: {
            level: 6 // Niveau de compression équilibré
        }
    });
    saveAs(content, `${nomFichier}.zip`);
}

/** * EVENT LISTENERS
 * Liaison des actions utilisateur aux fonctions métier.
 */
processBtn.addEventListener('click', traiterFichierExcel);