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
    {
        id: "TUYAUTERIE", motCle: "tuyauterie", refConforme: "Plans Ramery CVC-PB", descriptif: ""
    },
    { id: "GAINES_AERAU", motCle: "aéraulique", refConforme: "Plans Ramery ventilation", descriptif: "" },
    { id: "GAINE_DF", motCle: "gaines désenf", refConforme: "Plans Ramery désenfumage", descriptif: "" },

    // --- GENERALITES (Série 100) ---
    { id: "APP_SANIT", motCle: "appareils sanit", refConforme: "Plans Ramery plomberie", descriptif: "" },
    { id: "PROD_ECS", motCle: "production ECS", refConforme: "Plans Ramery plomberie", descriptif: "" },
    { id: "POMPES_ECS", motCle: "pompes ECS", refConforme: "Plans Ramery plomberie", descriptif: "" },
    { id: "VASE_ECS", motCle: "vase expansion ECS", refConforme: "Plans Ramery plomberie", descriptif: "" },
    { id: "ROB_ECS", motCle: "robinetterie ECS", refConforme: "Plans Ramery plomberie", descriptif: "" },
    { id: "DIVERS_ECS", motCle: "divers ECS", refConforme: "Plans Ramery plomberie", descriptif: "" },

    // --- CHAUFFAGE (Série 200) ---
    { id: "TERMINAUX_CH", motCle: "Terminaux chau", refConforme: "Plans Ramery chauffage", descriptif: "" },
    { id: "PROD_CH", motCle: "Production de chaleur", refConforme: "Plans Ramery chauffage", descriptif: "" },
    { id: "POMPE_CH", motCle: "pompes chau", refConforme: "Plans Ramery chauffage", descriptif: "" },
    { id: "V3V_CH", motCle: "voies chau", refConforme: "Plans Ramery chauffage", descriptif: "" },
    { id: "VASE_CH", motCle: "expansion chau", refConforme: "Plans Ramery chauffage", descriptif: "" },
    { id: "ROB_CH", motCle: "robinetterie chau", refConforme: "Plans Ramery chauffage", descriptif: "" },
    { id: "DIVERS_CH", motCle: "divers chau", refConforme: "Plans Ramery chauffage", descriptif: "" },

    // --- VENTILATION (série 300) ---
    { id: "BOUCHE_VE", motCle: "Bouche", refConforme: "Plans Ramery ventilation", descriptif: "L’ensemble des bouches et diffuseurs auront les caractéristiques suivantes :" },
    {
        id: "CTA_VE", motCle: "CTA", refConforme: "Plans Ramery ventilation", descriptif: "Les centrales de traitement d’air auront les caractéristiques suivantes :\n\n" +
            "Centrale 1 :\n" +
            "Type : double flux\n" +
            "Position :\n" +
            "Débit :\n" +
            "Pression disponible :\n" +
            "Marque :\n" +
            "Type :\n" +
            "Dimensions :\n" +
            "Poids :\n\n" +
            "Caractéristiques spécifiques :\n" +
            "Filtration :\n" +
            "Échangeur :\n" +
            "Batterie chaude :\n" +
            "Batterie froide :\n\n" +
            "Raccordements :\n" +
            "Aeraulique :\n" +
            "Hydraulique :\n" +
            "Electrique :"
    },
    { id: "EXTRACTEUR_VE", motCle: "Extracteur", refConforme: "Plans Ramery ventilation", descriptif: "" },
    {
        id: "REGISTRE_VE", motCle: "registre", refConforme: "Plans Ramery ventilation", descriptif: "Les registres auront les caractéristiques suivantes :\n\n" +
            "Registres manuels :\n" +
            "Marque :\n" +
            "Modèle :\n" +
            "Diamètres : selon plans ventilation\n" +
            "Quantité : selon plans de ventilation\n" +
            "Localisation : selon plans ventilation\n\n" +
            "Registres motorisés :\n" +
            "Marque :\n" +
            "Modèle :\n" +
            "Diamètres : selon plans ventilation\n" +
            "Quantité : selon plans ventilation\n" +
            "Localisation : selon plans ventilation\n" +
            "Moteur :\n" +
            "Asservissement :"
    },
    {
        id: "PAS_VE", motCle: "piège", refConforme: "Plans Ramery ventilation", descriptif: "Les pièges à son auront les caractéristiques suivantes :\n\n" +
            "CTA 1 :\n" +
            "Marque :\n" +
            "Modèle :\n" +
            "Quantité :\n" +
            "Position :\n" +
            "Dimensions unitaires :\n" +
            "Poids unitaire:"
    },
    { id: "CCF_VE", motCle: "clapet", refConforme: "Plans Ramery ventilation", descriptif: "" },
    { id: "GRILLE_VE", motCle: "grille", refConforme: "Plans Ramery ventilation", descriptif: "" },
    { id: "ACCESSOIRE_VE", motCle: "Accessoires ve", refConforme: "Plans Ramery ventilation", descriptif: "" },
    { id: "Divers_VE", motCle: "divers ve", refConforme: "Plans Ramery ventilation", descriptif: "" },

    // --- EAU GLACEE (série 400) ---
    { id: "TERMINAUX_EG", motCle: "Terminaux EG", refConforme: "Plans Ramery eau glacée", descriptif: "" },
    { id: "PROD_EG", motCle: "production de froid", refConforme: "Plans Ramery eau glacée", descriptif: "" },
    { id: "POMPE_EG", motCle: "Pompes EG", refConforme: "Plans Ramery eau glacée", descriptif: "" },
    { id: "V3V_EG", motCle: "voies EG", refConforme: "Plans Ramery eau glacée", descriptif: "" },
    { id: "VASE_EG", motCle: "expansion eg", refConforme: "Plans Ramery eau glacée", descriptif: "" },
    { id: "ROB_EG", motCle: "Robinetterie e", refConforme: "Plans Ramery eau glacée", descriptif: "" },
    { id: "DIVERS_EG", motCle: "divers e", refConforme: "Plans Ramery eau glacée", descriptif: "" },

    // --- DESENFUMAGE (série 500) ---
    { id: "VOLET_DF", motCle: "volet", refConforme: "Plans Ramery désenfumage", descriptif: "" },
    { id: "EXTRACTEUR_DF", motCle: "Extracteur de dés", refConforme: "Plans Ramery désenfumage", descriptif: "" },
    { id: "TOURELLE_DF", motCle: "Tourelle", refConforme: "Plans Ramery désenfumage", descriptif: "" },

    // --- CLIM (série 600) ---
    { id: "TERMINAUX_CLIM", motCle: "Terminaux cli", refConforme: "Plans Ramery climatisation", descriptif: "" },
    { id: "GROUPE_CLIM", motCle: "Groupes de cli", refConforme: "Plans Ramery climatisation", descriptif: "" },
    { id: "BOITIER_CLIM", motCle: "répartition cli", refConforme: "Plans Ramery climatisation", descriptif: "" },
    { id: "DIVERS_CLIM", motCle: "divers cli", refConforme: "Plans Ramery climatisation", descriptif: "" },

    // -- AUTRES (hors série) --
    {
        id: "BALLON", motCle: "ballon", refConforme: "Plans Ramery", descriptif: "Les ballons auront les caractéristiques suivantes :\n\n" +
            "• Ballon 1 :\n" +
            "   - Marque :\n" +
            "   - Modèle :\n" +
            "   - Quantité :\n" +
            "   - Capacité :\n" +
            "   - Température d’eau :\n\n" +
            "• Dimensions :\n" +
            "   - Diamètre :\n" +
            "   - Hauteur :\n" +
            "   - Poids à vide :\n" +
            "   - Poids plein :\n\n" +
            "• Accessoires :\n" +
            "   - Robinet de puisage pour vidange\n" +
            "   - Purgeur automatique en point haut\n" +
            "   - Jeu de vannes d'isolement"
    },
    {
        id: "RIDEAU", motCle: "Rideau", refConforme: "Plans Ramery", descriptif: "Les rideaux d'air chaud auront les caractéristiques suivantes :\n\n" +
            "Rideau 1 :\n" +
            "Marque :\n" +
            "Modèle :\n" +
            "Quantité :\n" +
            "Position :\n" +
            "Débit d’air :\n" +
            "Type de chauffage :\n" +
            "Puissance chauffage :\n" +
            "Accessoires :\n" +
            "Raccordement électrique :"
    },
];