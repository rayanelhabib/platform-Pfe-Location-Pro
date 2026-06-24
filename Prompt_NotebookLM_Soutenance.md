# 🎙️ Guide et Prompt pour NotebookLM (Soutenance PFE)

Pour générer votre présentation (PowerPoint) automatiquement et parfaitement avec **NotebookLM**, voici la marche à suivre étape par étape.

---

## ÉTAPE 1 : Les fichiers à donner à NotebookLM (Vos Sources)

Dans NotebookLM, créez un nouveau bloc-notes (Notebook) et importez les **4 fichiers suivants** dans les sources :
1. Votre rapport de stage : `Rapportpfe2026locationVoit_2DAi.pdf` (ou `Rapport_PFE_Ultime.tex`).
2. Le fichier : `ServiceLocation.md`
3. Le fichier : `ServiceErp.md`
4. Le fichier : `ServiceCrm_FInal.md`

*(NotebookLM va ainsi "avaler" tout votre projet, la technique, l'architecture et les détails de chaque bouton de votre interface).*

---

## ÉTAPE 2 : Le Prompt à copier-coller dans le chat de NotebookLM

Une fois les sources chargées, copiez et collez **exactement** le texte suivant dans la zone de chat de NotebookLM :

***

> "Agis comme un expert en communication et création de présentations pour une soutenance de PFE (BTS Développement d'Applications Informatiques). À partir des sources fournies (mon rapport académique et les 3 fichiers Markdown détaillant le fonctionnement de mes services), génère le texte complet de mes diapositives (slides) PowerPoint.
> 
> Le projet est un "Écosystème Numérique Unifié (Site B2C, CRM B2B, ERP Comptable)" pour l'agence de location de voitures Prestige Maroc.
> 
> Génère exactement 12 slides. Pour CHAQUE slide, tu dois fournir la structure suivante :
> **1. Titre du slide**
> **2. Texte affiché à l'écran :** 3 ou 4 points clés (Bullet points) très concis. Le jury ne veut pas lire de longs paragraphes.
> **3. 📸 [ESPACE CAPTURE D'ÉCRAN] :** Indique-moi précisément quelle image je dois insérer ici (ex: "Mets la capture de la grille des véhicules avec le prix en MAD" ou "Mets la capture de la facture PDF").
> **4. 🎤 Discours (Speaker Notes) :** Rédige exactement le texte que je dois prononcer à l'oral. Le ton doit être professionnel, convaincant, et mettre en valeur la complexité technique (SSR, MongoDB, JWT, Puppeteer pour les PDF) et la valeur métier apportée à l'entreprise.
> 
> **Voici la structure obligatoire de la présentation :**
> - Slide 1 : Page de Garde (Titre et Présentation)
> - Slide 2 : Le Contexte et la Problématique (L'archaïsme du papier et la différence B2C/B2B)
> - Slide 3 : La Solution Globale : L'Architecture Microservices (Stack MERN)
> - Slide 4 : Service Location (Le Site B2C pour les touristes)
> - Slide 5 : Service Location (L'Espace Admin et le choix de MongoDB)
> - Slide 6 : Service CRM (La gestion des gros contrats B2B)
> - Slide 7 : Service CRM (La personnalisation extrême : Objets "Véhicules" et "Contrats")
> - Slide 8 : Service ERP (La gestion financière et la rentabilité)
> - Slide 9 : Focus Technique ERP : Le générateur de Facture PDF légale marocaine
> - Slide 10 : Défis Techniques & Sécurité (Verrouillage Optimiste, JWT, RGPD)
> - Slide 11 : Le Bilan et le Retour sur Investissement (ROI) pour Prestige Maroc
> - Slide 12 : Conclusion & Perspectives (Green IT, IA)
> 
> Ne sois pas trop bref sur le "Discours", donne-moi des phrases prêtes à être dites devant un jury exigeant !"

***

## ÉTAPE 3 : Création de votre PowerPoint

1. Une fois que NotebookLM vous a généré le résultat, ouvrez PowerPoint (ou Canva / Google Slides).
2. Créez 12 slides.
3. Copiez les **Titres** et les **Bullet points** de NotebookLM sur vos slides.
4. Dans la zone **[ESPACE CAPTURE D'ÉCRAN]**, insérez les images que vous avez dans votre dossier `ScreenShotAllserviceLocationWeb`.
5. Imprimez ou gardez sur votre téléphone les **🎤 Discours (Speaker Notes)** pour vous entraîner à l'oral.

C'est la méthode ultime. NotebookLM va utiliser toute mon analyse technique et votre rapport pour vous sortir un script digne des meilleures soutenances !
