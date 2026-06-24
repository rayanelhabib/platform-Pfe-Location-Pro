# 🚗 Plateforme de Location de Véhicules (BookCars) - Prestige Maroc

**Projet de Fin d'Études (PFE) - Module de Location (Front-Office & Back-Office Métier)**

Ce projet constitue le "Cœur de Métier" (Core Business) de votre entreprise. Alors que l'ERP gère la comptabilité et l'administration globale, cette plateforme gère l'activité réelle : **la location de véhicules.**

---

## 1. ⚠️ La Problématique (Le Problème Initial)
Les agences de location de voitures (et les agrégateurs de flottes) font face à de nombreux défis pour numériser leurs services :
- **Gestion de la flotte chaotique :** Difficile de savoir précisément quel véhicule est disponible, à quelle heure, et dans quel parking. Il y a un fort risque de double réservation.
- **Acquisition client limitée :** Sans un site web ou une application mobile où le client peut réserver et payer en ligne, l'agence perd de nombreux clients (notamment les touristes).
- **Gestion Multi-Fournisseurs (Marketplace) :** S'il s'agit d'une grande plateforme qui regroupe plusieurs agences (fournisseurs), il est très difficile de calculer la commission, de gérer les différents contrats et de consolider les prix.
- **Complexité tarifaire :** Les prix changent souvent (tarifs horaires, journaliers, hebdomadaires, mensuels) et varient selon les saisons. Un fichier Excel ne suffit plus.

## 2. 💡 La Solution Apportée
Ce projet (BookCars) résout ces problèmes en offrant une **Solution Omnicanal complète (Web + Mobile + Interface d'Administration)**.

C'est une plateforme d'agrégation de location de véhicules qui connecte directement les clients à la flotte disponible de manière 100% automatisée.

**Ce que l'application résout et aide à faire :**
- Elle empêche automatiquement la double réservation grâce à son "Scheduler" (calendrier de flotte).
- Elle digitalise complètement le parcours client : de la recherche à la confirmation, en passant par le paiement en ligne sécurisé.
- Elle permet une tarification dynamique instantanée selon les dates choisies par le client.

---

## 3. ⚙️ Fonctionnalités Détaillées (Ce que fait le projet)

### A. L'Interface Client (Frontend Web & Mobile App)
- **Moteur de Recherche Avancé :** Les clients peuvent chercher une voiture en définissant le lieu de prise en charge (pickup), la date et l'heure. 
- **Système de Réservation (Checkout) :** Parcours de réservation fluide en quelques clics avec gestion du compte client (Google, Apple, Email).
- **Support Multilingue et Multi-devises :** Anglais, Français, Espagnol... idéal pour la clientèle touristique.

### B. Gestion des Paiements
- **Passerelles de Paiement Intégrées :** Support natif de Stripe et PayPal.
- **Méthodes Flexibles :** Possibilité de payer en ligne par carte, Google Pay, Apple Pay, ou de payer directement au comptoir lors de la récupération du véhicule. (Possibilité de payer un acompte ou la totalité).

### C. Le Panneau d'Administration (Back-Office Flotte)
- **Gestion Multi-Fournisseurs :** La plateforme peut gérer les véhicules de la propre agence (Single-supplier) ou les flottes de plusieurs agences partenaires (Marketplace/Aggregator). Chaque fournisseur a son propre panneau pour voir ses propres voitures.
- **Inventaire et Lieux :** Création des lieux de prise en charge (Villes, Aéroports) avec intégration des parkings sur une carte interactive.
- **Calendrier et Réservations :** Un tableau de bord complet pour valider, annuler ou modifier les réservations.

### D. Sécurité et Performance
- **Sécurité Web :** Protection robuste contre les attaques courantes (XSS, CSRF, DDoS).
- **Notifications Push :** Système automatique d'envoi d'e-mails ou de notifications pour chaque nouvelle réservation ou modification.
- **Déploiement Docker :** L'architecture est totalement conteneurisée (Frontend, Backend API, Admin, MongoDB), ce qui la rend extrêmement stable et scalable.

---

## 4. 🔗 Comment ce projet complète l'ERP ?
Dans un scénario réel de **Prestige Maroc** :
1. **Ce projet (Service Location) :** S'occupe de trouver des clients en ligne, de leur louer des voitures et d'encaisser les paiements. C'est l'**Outil Métier**.
2. **Le projet ERP (Service ERP) :** Récupère toutes ces ventes globales pour faire la comptabilité, facturer les entreprises partenaires, déclarer les taxes et gérer les fiches de paie des employés. C'est l'**Outil de Gestion**.
