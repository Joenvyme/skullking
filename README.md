# Skull King Score Keeper

Une Progressive Web App (PWA) pour compter les points du jeu de cartes Skull King, avec support de deux versions du jeu (ancienne et nouvelle).

## 🎯 Fonctionnalités

- ✅ Support de deux versions du jeu (Classique et Nouvelle)
- ✅ Configuration des joueurs (2-8 joueurs)
- ✅ Saisie des paris et résultats
- ✅ Calcul automatique des scores avec bonus
- ✅ Tableau de scores en temps réel
- ✅ Podium final avec animations
- ✅ Thème pirate personnalisé
- ✅ PWA installable

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Lancer en production
npm start
```

## 📱 Utilisation

1. **Sélection de version** : Choisissez entre la version Classique ou Nouvelle
2. **Configuration** : Ajoutez entre 2 et 8 joueurs
3. **Jeu** : 
   - Saisissez les paris pour chaque joueur
   - Saisissez les résultats avec les bonus éventuels
   - Consultez le tableau des scores
4. **Résultats** : Visualisez le podium final et le classement complet

## 🎨 Thème

L'application utilise un thème pirate avec :
- Couleurs : Or (#D4AF37), Bleu marine (#0A1628), Crème (#F5E6D3)
- Police : Pirata One pour les titres, Inter pour le texte
- Style : Cartes parchemin, boutons dorés, effets d'ombre

## 📊 Calcul des scores

### Version Classique
- Pari réussi : 20 points par pli
- Pari zéro réussi : 10 × nombre de cartes
- Bonus Mermaid-Skull : 50 points
- Bonus Skull-Pirate : 30 points par pirate
- Bonus Carte 14 : 10 points (toutes)

### Version Nouvelle
- Pari réussi : 20 points par pli
- Pari zéro réussi : 10 × nombre de cartes
- Bonus Mermaid-Skull : 40 points
- Bonus Skull-Pirate : 30 points par pirate
- Bonus Carte 14 standard : 10 points
- Bonus Carte 14 noire (trump) : 20 points

### Pénalités
- Pari raté : -10 points par pli de différence

## 🛠️ Technologies

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (gestion d'état)
- **Framer Motion** (animations)
- **shadcn/ui** (composants UI)

## 📝 Notes

- Les données sont stockées localement (localStorage)
- L'assistant IA avec RAG est prévu pour une version future
- Les règles complètes sont disponibles dans les PDFs fournis

## 🎮 Versions du jeu

### Version Classique
- Règles originales du Skull King
- Pas de cartes avancées
- Pas d'abilités de pirates

### Version Nouvelle
- Règles mises à jour
- Cartes avancées (Kraken, White Whale, Loot)
- Abilités spéciales des pirates
- Différenciation des cartes 14 (trump vs standard)

