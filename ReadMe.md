<div align="center">
  <img src="https://img.shields.io/badge/Status-Completed-success?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/Platform-Web-blue?style=for-the-badge" alt="Platform" />

  <br><br>

  <h1>🚗 Plateforme de Location de Véhicules & ERP/CRM Intégré (PFE 2026)</h1>
  
  <p><b>Une plateforme "Tout-en-un" (Omnicanal) combinant un système de réservation client complet et un ERP métier avancé pour la gestion interne.</b></p>
</div>

---

## 🔑 Mots-Clés / Keywords
**Technologies & Outils :** `MERN Stack`, `React.js`, `Node.js`, `Express.js`, `MongoDB`, `Redux Toolkit`, `Docker`, `Docker Compose`, `Microservices`, `Tailwind CSS`, `Shadcn UI`, `Framer Motion`, `GSAP`, `Stripe API`, `PayPal API`, `JWT`, `RBAC`. <br>
**Domaines Métiers :** `ERP` (Enterprise Resource Planning), `CRM` (Customer Relationship Management), `Plateforme de location de voitures`, `Gestion de flotte`, `Projet de Fin d'Études (PFE)`, `Soutenance`, `Architecture logicielle`, `UI/UX Design`.

---

## 📌 À propos du projet

Ce projet a été conçu et réalisé dans le cadre de mon **Projet de Fin d'Études (PFE)**. Il a pour objectif de digitaliser, centraliser et moderniser la gestion des flottes automobiles. En remplaçant les méthodes de gestion archaïques, cette plateforme évite les doubles réservations, automatise la comptabilité et crée un pont fluide entre les ventes et l'administration interne.

## 🚀 Fonctionnalités Principales

Le système est découpé en plusieurs portails adaptés aux différents acteurs de l'entreprise :

- **👤 Espace Client (Front-Office) :** 
  - Recherche avancée de véhicules disponibles avec filtres dynamiques.
  - Système de réservation en ligne avec calendrier interactif.
  - Intégration de paiements sécurisés (Stripe / PayPal).
- **💼 Espace Commercial / Sales (ERP & CRM) :** 
  - Génération de devis et facturation en quelques clics.
  - Gestion des clients via un annuaire CRM intégré.
- **📊 Espace Comptable :** 
  - Suivi des flux financiers et des paiements.
  - Gestion automatisée des taxes et des rapports financiers.
- **🛡️ Espace Administrateur (Owner) :** 
  - Contrôle total via un système RBAC (Role-Based Access Control).
  - Tableau de bord analytique ultra-moderne avec des statistiques en temps réel.
  - Gestion de la flotte automobile (ajout/suppression de véhicules).

## 💻 Stack Technologique & Architecture

L'architecture est construite autour de **Microservices**, permettant une haute scalabilité et une isolation parfaite des processus métier.

### Technologies Clés (MERN Stack)
- **Base de Données :** `MongoDB` (NoSQL) pour la flexibilité et la rapidité.
- **Back-End :** `Node.js` & `Express.js` (Création d'API REST performantes).
- **Front-End :** `React.js` avec `Redux` pour la gestion d'état complexe.
- **Design & UI :** `Tailwind CSS`, `Shadcn UI`.
- **Animations (UX/UI) :** `Framer Motion` & `GSAP` pour une expérience utilisateur premium.
- **Déploiement :** Conteneurisation complète avec `Docker` & `docker-compose`.

---

## 📂 Structure du Dépôt et Livrables (Documentation & Code)

Ce dépôt contient non seulement le code source des différentes applications, mais également l'ensemble des documents relatifs à la soutenance du Projet de Fin d'Études :

### 💻 Code Source (Microservices)
- `📁 service-location/` : Le code du front-office et de l'API de réservation de véhicules.
- `📁 service-erp/` : Le code du système de planification des ressources de l'entreprise (devis, facturation, comptabilité).
- `📁 service-crm/` : Le code dédié à la gestion de la relation client (historique, annuaire).
- `📁 enterprise-portal/` : Portail unifié pour l'accès aux différents services de l'entreprise.

### 📄 Documentation et Livrables PFE
- `📄 Rapportpfe2026locationVoit_2DAi.pdf` : Le rapport de stage final et complet en format PDF.
- `📁 Rapport_PFE_Final/` & `📦 Rapport_PFE_Complet.zip` : Fichiers sources et ressources annexes du rapport.
- `📄 PLAN_RAPPORT_PFE.md` : La structure académique détaillée utilisée pour la rédaction du rapport.
- `📄 Prompt_NotebookLM_Soutenance.md` : Les prompts IA utilisés pour l'aide à la préparation de la soutenance.
- `📄 ServiceCrm_FInal.md`, `ServiceErp.md`, `ServiceLocation.md` : Documentation technique détaillée pour chaque microservice.

### 🎓 Soutenance et Présentation
- `📄 PresentaionFinalLocatition2026.pptx` (et `.zip` / `📁 pptx_extracted/`) : Le support visuel PowerPoint officiel pour le jour de la soutenance devant le jury.
- `📄 ScriptLocationVOitSoutenance.pdf` : Le discours et script de préparation accompagnant les slides de la soutenance.

### 🖼️ UI & Visuels
- `📁 ScreenShotAllserviceLocationWeb/`, `📁 screenshot/`, `📁 images/` : Captures d'écran des interfaces (Dashboard, site client, paiements) utilisées pour le rapport et la présentation.

---

## ✅ Tâches (To-Do) & Roadmap

- [x] Développer l'architecture Microservices MERN.
- [x] Rédiger le rapport de PFE et finaliser la présentation PowerPoint.
- [x] Configurer `docker-compose` pour lancer tous les services.
- [ ] **Tâche pour @rayanelhabib :** Préparer et répéter le discours de soutenance (`ScriptLocationVOitSoutenance.pdf`) et configurer les clés API de production (`.env`) pour la démonstration en direct (Live Demo) devant le jury ! 🚀
- [ ] Déployer l'infrastructure sur un environnement cloud (ex: AWS / VPS).

---

## 🔒 Licence et Droits d'Auteur

> [!WARNING]  
> **Licence Propriétaire - Tous droits réservés.**

Le code source de ce projet est publié sur GitHub à des fins de **portfolio et de démonstration technique uniquement**.
Toute copie, modification, distribution, ou utilisation de ce projet (partielle ou totale) pour un usage commercial, personnel, ou éducatif est **strictement interdite** sans l'autorisation écrite explicite de l'auteur. 
Pour plus de détails, veuillez consulter le fichier `LICENSE` inclus dans ce dépôt.

## 📞 Contact & Réseaux Sociaux

Ce projet a été développé avec ❤️ par **Rayan El habib**.

Si vous avez des questions, des propositions professionnelles ou si vous souhaitez en savoir plus sur mon travail, n'hésitez pas à me contacter via mes réseaux :

- 🐙 **GitHub:** [@rayanelhabib](https://github.com/rayanelhabib/)
- 💼 **LinkedIn:** [rayan-el-habib](https://www.linkedin.com/in/rayan-el-habib/)
- 📸 **Instagram:** [@skz_rayan23](https://www.instagram.com/skz_rayan23/)

---
<div align="center">
  <i>"L'innovation est ce qui distingue un leader d'un suiveur."</i>
</div>
