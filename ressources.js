/**
 * RÉFÉRENTIEL TECHNIQUE - RAMERY GÉNIE THERMIQUE
 * Ce fichier centralise les données métier pour chaque type de matériel.
 * * Structure d'un objet ressource :
 * @property {string} id - Identifiant unique pour le matériel.
 * @property {string} motCle - Le mot recherché dans la désignation Excel pour identifier le matériel.
 * @property {string} refConforme - La donnée à injecter dans {complémentReference}.
 * @property {string} descriptif - Le texte à injecter dans {descriptifFiche}.
 */

export const REFERENTIEL_MATERIEL = [
    // --- GENERALITES (Série 000) ---
    { id: "TUYAUTERIE", motCle: "tuyauterie", refConforme: "test ref tuyauterie", descriptif: "test descriptis tuyauterie" },
    { id: "GAINES_AERAU", motCle: "aéraulique", refConforme: "", descriptif: "" },
    { id: "GAINE_DF", motCle: "gaines désenf", refConforme: "", descriptif: "" },

    // --- GENERALITES (Série 100) ---
    { id: "APP_SANIT", motCle: "appareils sanit", refConforme: "", descriptif: "" },
    { id: "PROD_ECS", motCle: "production ECS", refConforme: "", descriptif: "" },
    { id: "POMPES_ECS", motCle: "pompes ECS", refConforme: "", descriptif: "" },
    { id: "VASE_ECS", motCle: "vase expansion ECS", refConforme: "", descriptif: "" },
    { id: "ROB_ECS", motCle: "robinetterie ECS", refConforme: "", descriptif: "" },
    { id: "DIVERS_ECS", motCle: "divers ECS", refConforme: "", descriptif: "" },

    // --- CHAUFFAGE (Série 200) ---
    { id: "TERMINAUX_CH", motCle: "Terminaux chau", refConforme: "", descriptif: "" },
    { id: "PROD_CH", motCle: "Production de chaleur", refConforme: "", descriptif: "" },
    { id: "POMPE_CH", motCle: "pompes chau", refConforme: "", descriptif: "" },
    { id: "V3V_CH", motCle: "voies chau", refConforme: "", descriptif: "" },
    { id: "VASE_CH", motCle: "expansion chau", refConforme: "", descriptif: "" },
    { id: "ROB_CH", motCle: "robinetterie chau", refConforme: "", descriptif: "" },
    { id: "DIVERS_CH", motCle: "divers chau", refConforme: "", descriptif: "" },

    // --- VENTILATION (série 300) ---
    { id: "BOUCHE_VE", motCle: "Bouche", refConforme: "", descriptif: "" },
    { id: "CTA_VE", motCle: "CTA", refConforme: "", descriptif: "" },
    { id: "EXTRACTEUR_VE", motCle: "Extracteur", refConforme: "", descriptif: "" },
    { id: "REGISTRE_VE", motCle: "registre", refConforme: "", descriptif: "" },
    { id: "PAS_VE", motCle: "piège", refConforme: "", descriptif: "" },
    { id: "CCF_VE", motCle: "clapet", refConforme: "", descriptif: "" },
    { id: "GRILLE_VE", motCle: "grille", refConforme: "", descriptif: "" },
    { id: "ACCESSOIRE_VE", motCle: "Accessoires ve", refConforme: "", descriptif: "" },
    { id: "Divers_VE", motCle: "divers ve", refConforme: "", descriptif: "" },

    // --- EAU GLACEE (série 400) ---
    { id: "TERMINAUX_EG", motCle: "Terminaux EG", refConforme: "", descriptif: "" },
    { id: "PROD_EG", motCle: "production de froid", refConforme: "", descriptif: "" },
    { id: "POMPE_EG", motCle: "Pompes EG", refConforme: "", descriptif: "" },
    { id: "V3V_EG", motCle: "voies EG", refConforme: "", descriptif: "" },
    { id: "VASE_EG", motCle: "expansion eg", refConforme: "", descriptif: "" },
    { id: "ROB_EG", motCle: "Robinetterie e", refConforme: "", descriptif: "" },
    { id: "DIVERS_EG", motCle: "divers e", refConforme: "", descriptif: "" },

    // --- DESENFUMAGE (série 500) ---
    { id: "VOLET_DF", motCle: "volet", refConforme: "", descriptif: "" },
    { id: "EXTRACTEUR_DF", motCle: "Extracteur de dés", refConforme: "", descriptif: "" },
    { id: "TOURELLE_DF", motCle: "Tourelle", refConforme: "", descriptif: "" },

    // --- CLIM (série 600) ---
    { id: "TERMINAUX_CLIM", motCle: "Terminaux cli", refConforme: "", descriptif: "" },
    { id: "GROUPE_CLIM", motCle: "Groupes de cli", refConforme: "", descriptif: "" },
    { id: "BOITIER_CLIM", motCle: "répartition cli", refConforme: "", descriptif: "" },
    { id: "DIVERS_CLIM", motCle: "divers cli", refConforme: "", descriptif: "" }
];