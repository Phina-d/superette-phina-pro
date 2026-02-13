🛒 Supérette Chez Phina

Application web e-commerce développée avec React permettant l’affichage dynamique de produits avec filtrage par catégorie et système de recherche.

🔗 Démo en ligne : (à ajouter après déploiement)

📌 Description

Supérette Chez Phina est un site vitrine e-commerce conçu pour présenter des produits alimentaires et du quotidien.

Le projet met en avant :

Une architecture React propre et modulaire

Une gestion statique des données produits

Un hébergement externe des images via Cloudinary

Une compatibilité avec GitHub Pages pour le déploiement

Ce projet a été conçu dans un objectif pédagogique et de démonstration technique.

✨ Fonctionnalités

🔎 Recherche dynamique des produits

🗂️ Filtrage par catégorie via paramètres URL

🖼️ Images optimisées hébergées sur Cloudinary

📱 Design responsive

⚡ Performance optimisée pour déploiement statique

🛠️ Interface admin locale (non persistante en production)

🛠️ Stack Technique
Technologie	Rôle
React	Interface utilisateur
React Router	Gestion des routes
CSS	Stylisation
Cloudinary	Hébergement des images
GitHub Pages	Déploiement
📂 Architecture du projet
src/
│
├── components/        # Composants réutilisables
├── pages/             # Pages principales
├── data/              # Données statiques (products, categories)
├── styles/            # Fichiers CSS
└── App.js

🚀 Installation & Lancement
Cloner le repository
git clone https://github.com/Phina-d/superette-phina-pro.git

Installer les dépendances
npm install

Lancer le projet en local
npm start

🚀 Déploiement (GitHub Pages)

1️⃣ Ajouter dans package.json :

"homepage": "https://Phina-d.github.io/superette-phina-pro"


2️⃣ Installer gh-pages :

npm install gh-pages --save-dev


3️⃣ Ajouter dans les scripts :

"predeploy": "npm run build",
"deploy": "gh-pages -d build"


4️⃣ Déployer :

npm run deploy

⚠️ Remarques Importantes

Les produits sont stockés statiquement dans products.js

Les images sont hébergées sur Cloudinary

Les données ajoutées via localStorage ne sont pas persistantes après déploiement

Projet conçu comme vitrine démonstrative

👩‍💻 Auteur

Mme NDIAYE
Développeuse Frontend React