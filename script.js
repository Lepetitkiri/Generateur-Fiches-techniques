/**
 * MODULE 1 : Acquisition du fichier source
 * Ce module gère l'interception du fichier Excel via le drag & drop ou l'explorateur de fichiers.
 */

// Éléments de l'interface utilisateur
const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileInput');

// Variable globale pour stocker le fichier en mémoire
window.fichierSource = null;

/**
 * Neutralise les comportements par défaut du navigateur pour la zone de dépôt.
 * Empêche le navigateur d'ouvrir le fichier directement.
 */
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
});

/**
 * Gère l'événement de dépôt (drop) sur la zone dédiée.
 */
dropArea.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        setSourceFile(files[0]);
    }
});

/**
 * Gère la sélection manuelle via le bouton d'import.
 */
fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files.length > 0) {
        setSourceFile(files[0]);
    }
});

/**
 * Enregistre le fichier sélectionné et prépare l'interface.
 * @param {File} file - Le fichier récupéré depuis l'input ou le drop.
 */
function setSourceFile(file) {
    // Stockage du fichier pour les traitements futurs
    window.fichierSource = file;

    // Mise à jour de l'interface utilisateur
    const fileNameSpan = document.getElementById('file-name');
    const fileInfo = document.getElementById('file-info');

    if (fileNameSpan && fileInfo) {
        fileNameSpan.textContent = file.name;
        fileInfo.classList.remove('hidden');

        // On masque la zone de dépôt pour éviter les imports multiples
        dropArea.classList.add('hidden');
    }
}

/**
 * MODULE 2 : Lecture et traitement des données Excel
 * Ce module transforme le flux binaire en objets structurés et extrait les métadonnées.
 */

/**
 * Point d'entrée pour le traitement du fichier.
 * Déclenché par l'événement clic sur le bouton de génération.
 */
async function traiterFichierExcel() {
    const file = window.fichierSource;
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = "Liste Plan & NdC";
        const worksheet = workbook.Sheets[sheetName];

        if (!worksheet) {
            alert(`L'onglet "${sheetName}" est introuvable dans le fichier.`);
            return;
        }

        // Conversion en tableau de tableaux (format brut par lignes)
        const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Extraction des informations structurées
        extraireMetadonneesChantier(rawData);
    };

    reader.readAsArrayBuffer(file);
}

/**
 * Analyse les lignes brutes pour extraire le nom, le numéro de chantier et les fiches.
 * @param {Array[]} data - Tableau 2D représentant les lignes de l'Excel.
 */
function extraireMetadonneesChantier(data) {
    const headerRow = data[0] || [];

    // 1. Recherche dynamique du Nom du Chantier (Index 1 à 7)
    // On récupère la première valeur textuelle trouvée dans la zone de fusion possible
    let nomChantier = "Chantier_Inconnu";
    for (let i = 1; i <= 7; i++) {
        if (headerRow[i] && headerRow[i].toString().trim() !== "") {
            nomChantier = headerRow[i].toString().trim();
            break;
        }
    }

    // 2. Recherche dynamique du Numéro de Chantier (Index 9 à 11)
    // On cherche une valeur purement numérique dans les colonnes J, K ou L
    let numChantier = "000000";
    for (let i = 9; i <= 11; i++) {
        const valeur = headerRow[i];
        if (valeur && !isNaN(valeur) && valeur.toString().trim() !== "") {
            numChantier = valeur.toString().trim();
            break;
        }
    }

    // 3. Extraction des fiches techniques
    // On filtre les lignes dont la désignation contient "Spécification technique"
    // et dont la référence commence par "RET-"
    const fichesExtract = [];
    data.forEach(ligne => {
        const designation = ligne[0] ? ligne[0].toString().trim() : "";
        const reference = ligne[2] ? ligne[2].toString().trim() : "";

        const estSpecification = designation.toLowerCase().includes("spécification technique");
        const aReferenceValide = reference.startsWith("RET-");

        if (estSpecification && aReferenceValide) {
            fichesExtract.push({
                designation: designation,
                reference: reference
            });
        }
    });

    // Stockage centralisé des informations pour les modules suivants
    window.projetActif = {
        nom: nomChantier,
        numero: numChantier,
        fiches: fichesExtract
    };

    // Déclenchement automatique du module suivant (à venir)
    // preparerArchiveZip(); 
}

// Liaison de l'événement au bouton principal
document.getElementById('processBtn').addEventListener('click', traiterFichierExcel);
