/**
 * Réinitialise l'interface de dépôt en cas d'erreur.
 * On utilise 'export' pour rendre la fonction disponible ailleurs.
 */
export function resetInterfaceDepot() {
    const fileNameSpan = document.getElementById('file-name');
    const fileInfoArea = document.getElementById('file-info');
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('fileInput');

    if (fileInfoArea) fileInfoArea.classList.add('hidden');
    if (dropArea) dropArea.classList.remove('hidden');

    // SÉCURITÉ & NETTOYAGE : 
    if (fileNameSpan) fileNameSpan.textContent = "";
    if (fileInput) fileInput.value = "";

    window.fichierSource = null;
}


/**
 * RECHERCHE DE CORRESPONDANCE TECHNIQUE (MATCH)
 * Parcourt le référentiel pour trouver un matériel basé sur un mot-clé.
 * @param {string} designationExcel - La désignation brute issue de l'Excel.
 * @param {Array} referentiel - Le tableau REFERENTIEL_MATERIEL importé depuis ressources.
 * @returns {Object} 
 */
export function trouverConfigurationMateriel(designationExcel, referentiel) {
    // 1. Sécurisation : si la désignation est vide
    if (!designationExcel) {
        return {
            ref: "",
            desc: "Descriptif produit :"
        };
    }

    // Passage en minuscules
    const texteNettoye = designationExcel.toLowerCase();

    // Recherche de l'élément correspondant
    const correspondance = referentiel.find(materiel => {
        const mot = materiel.motCle.toLowerCase();
        return texteNettoye.includes(mot);
    });

    // Retour des données trouvées ou valeurs de secours (Fallback)
    if (correspondance) {
        return {
            ref: correspondance.refConforme,
            desc: correspondance.descriptif
        };
    } else {
        return {
            ref: "",
            desc: "Descriptif produit :"
        };
    }
}


/**
 * GÉNÉRATION DE DOCUMENT WORD
 * Prend un template binaire et un objet de données pour retourner un fichier Word (Blob).
 * @param {ArrayBuffer} templateBinaire - Le contenu du fichier .docx source.
 * @param {Object} donnees - Les balises à remplacer (ex: donneesFiche).
 * @returns {Blob} - Le fichier final prêt à être mis dans le ZIP.
 */
export function genererDocument(templateBinaire, donnees) {
    try {
        // Chargement du binaire dans PizZip
        const zip = new window.PizZip(templateBinaire);

        // Configuration Docxtemplater sur le zip
        const doc = new window.docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        // Injection des données et rendu du document
        doc.setData(donnees);
        doc.render();

        // Généreration du fichier binaire final (Blob)
        return doc.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
    } catch (erreur) {
        const errorDetails = {
            message: erreur.message,
            name: erreur.name,
            properties: erreur.properties,
            stack: erreur.stack
        };
        throw errorDetails;
    }
}