# Description du projet
Le présent projet consiste en le développement d’un site web e-commerce Full-Stack permettant la vente et la gestion de produits en ligne.
Il a été conçu pour simuler une plateforme marchande moderne, offrant une expérience utilisateur fluide, intuitive et complète, aussi bien pour les clients que pour les administrateurs.

# Architecure du projet
Le projet est divisé en deux dossiers principaux:
### `client`:
Frontend développé avec React, fournissant une interface utilisateur dynamique et réactive.
### `server`:
Backend développé en Node.js avec Express, utilisant Prisma comme ORM pour gérer la base de données PostgreSQL.Le serveur expose une API REST pour la communication avec le frontend.

# Technologies utilisées
### React, Node js, Express js, Prisma, Postgresql

# Lancer l'application Web
Cette section détaille les étapes nécessaires pour lancer notre application web. Suivez attentivement les instructions ci-dessous pour démarrer les deux serveurs et visualiser l'application dans le navigateur.
### Prérequis
Avant de commencer assurez vous d'avoir:
- **Node.js** : [Télécharger et installer Node.js](https://nodejs.org/)
- **npm** : inclus avec Node.js.
#### Cloner le dépot
```bash
git clone https://github.com/Mohssine-CHKIRIDA/E-commerce_Website.git
cd E-commerce_Website
```
#### Installer les dependances
##### Pour le backend
```bash
cd server
npm install
```
##### Pour le frontend 
```bash
cd ../client
npm install
```
#### Configurer de la base de données
Dans le dossier `server`, créez le fichier `.env` puis mettez les informations de connexion à POSTGRESQL

Appliquez les migrations prisma
```bash
npx prisma migrate deploy
```
#### Lancer les serveurs
##### `backend`
```bash
cd ../server
npm run dev
```
##### `frontend`
```bash
cd ../client
npm run dev
```
####  Accéder à l'application
Ouvrez votre navigateur et allez à http://localhost:5173


## Remerciement
Nous tenons à remercier chaleureusement notre encadrant, Pr. Yann BEN MAISSA , pour son accompagnement, ses conseils précieux et sa disponibilité tout au long de la réalisation de ce projet.




