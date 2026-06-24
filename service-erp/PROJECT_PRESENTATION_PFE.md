# 🏢 Plateforme de Gestion ERP & CRM - Prestige Maroc

**Projet de Fin d'Études (PFE)**
Une solution complète, moderne et sécurisée pour la gestion globale d'une entreprise (axée sur la location), développée avec la stack MERN (MongoDB, Express, React, Node.js).

---

## 1. ⚠️ La Problématique (Le Problème Initial)
Les entreprises modernes, particulièrement dans le secteur de la location ou du service, font souvent face à des défis organisationnels majeurs :
- **Dispersion des données :** Les informations clients sont dans des carnets, les devis sur Word, et le suivi financier sur Excel. Il n'y a aucune centralisation.
- **Lourdeur administrative :** Créer un devis, le transformer en facture, puis suivre son paiement demande un travail manuel répétitif et propice aux erreurs de calcul (erreurs de TVA, de montants).
- **Manque de visibilité :** Impossible d'avoir une vue d'ensemble en temps réel sur le chiffre d'affaires, les factures impayées ou la performance de l'entreprise.
- **Failles de sécurité et confidentialité :** Tous les employés ont souvent accès aux mêmes fichiers. Un commercial peut voir les informations comptables sensibles ou les modifier par erreur.

## 2. 💡 La Solution Apportée
Ce projet résout tous ces problèmes en fournissant un **"Cerveau Numérique"** centralisé pour l'entreprise. C'est une plateforme web accessible de partout, qui unifie la relation client (CRM) et la gestion des ressources (ERP).

**Ce que l'application aide à faire :**
- Elle automatise les calculs financiers (TVA, remises, sous-totaux).
- Elle numérise et sécurise la base de données clients.
- Elle offre un tableau de bord analytique pour la prise de décision.
- Elle cloisonne l'information grâce à un système de rôles strict (RBAC).

---

## 3. ⚙️ Fonctionnalités Détaillées (Ce que fait le projet)

### A. Module CRM (Customer Relationship Management)
- **Gestion des Clients (Customers) :** Création et maintien d'un annuaire numérique des clients. Stockage de toutes les informations de contact (Nom, Email, Téléphone, Adresse, Pays).
- **Historique :** Chaque client est lié de manière relationnelle (Base de données NoSQL) à ses devis et factures.

### B. Module ERP (Enterprise Resource Planning) & Ventes
- **Devis (Quotes) :** Interface de création de propositions commerciales. Permet d'ajouter plusieurs articles, de définir les quantités, les prix unitaires, et d'appliquer des remises.
- **Facturation (Invoices) :** Transformation transparente des opérations de vente en factures légales.
- **Suivi des statuts :** Chaque document a un cycle de vie (Brouillon, Envoyé, En attente, Refusé, Accepté).

### C. Module Finance & Comptabilité
- **Gestion des Paiements (Payments) :** Suivi granulaire des encaissements. Une facture peut être marquée comme "Impayée", "Partiellement payée" ou "Payée".
- **Modes de Paiement (Payment Modes) :** Configuration des moyens d'encaissement acceptés par l'entreprise (Espèces, Virement bancaire, Carte de crédit, etc.).
- **Gestion des Taxes (Taxes) :** Configuration dynamique des taux de TVA applicables lors de la facturation.

### D. Sécurité et Hiérarchie (RBAC - Role-Based Access Control)
L'application intègre un système de contrôle d'accès basé sur les rôles, garantissant que chaque employé ne voit que ce qui concerne son métier :
- **👑 Owner (Propriétaire) :** Contrôle total sur la plateforme et les paramètres (Settings) de l'entreprise.
- **👔 Manager (Directeur) :** Supervision globale des ventes et des clients, sans accès à la configuration système.
- **💼 Sales (Commercial) :** Accès restreint à la gestion des clients, à la création de devis et de factures. N'a pas accès à la comptabilité.
- **📊 Accountant (Comptable) :** Accès limité à la vérification des factures, à l'enregistrement des paiements et à la gestion des taxes. N'a pas accès au fichier client.

---

## 4. 🛠️ Architecture Technique & Design

- **Backend (API RESTful) :** Construit avec **Node.js** et **Express**. Architecture dynamique où les routes API sont auto-générées à partir des modèles de base de données.
- **Base de données :** **MongoDB** avec Mongoose. Structure NoSQL parfaite pour gérer des documents complexes comme des factures avec de multiples items.
- **Frontend :** **React.js** avec Redux pour la gestion d'état global. 
- **Interface Utilisateur (UI/UX) :** Design "Ultra-Pro" et premium, utilisant la philosophie **Shadcn UI** (minimalisme, mode sombre élégant).
- **Animations :** Intégration de **Framer Motion** (pour les transitions de pages fluides) et de **GSAP** (pour les apparitions en cascade des éléments de tableaux et de formulaires), offrant une expérience utilisateur (UX) digne des plus grandes applications d'entreprise mondiales.
