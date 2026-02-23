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