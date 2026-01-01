# 🚀 Guide de démarrage rapide

## Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📋 Checklist de test

### 1. Sélection de version
- [ ] Les deux versions s'affichent correctement
- [ ] Les icônes sont visibles
- [ ] Le clic redirige vers `/setup`

### 2. Configuration des joueurs
- [ ] Ajout de joueurs fonctionne
- [ ] Suppression de joueurs fonctionne
- [ ] Validation : minimum 2 joueurs
- [ ] Validation : maximum 8 joueurs
- [ ] Le bouton "Commencer" est désactivé si < 2 joueurs

### 3. Saisie des paris
- [ ] Affichage du joueur actuel
- [ ] Sélection du nombre de plis (0 à N)
- [ ] Navigation entre joueurs
- [ ] Affichage du résumé des paris

### 4. Saisie des résultats
- [ ] Affichage du pari du joueur
- [ ] Saisie des plis réalisés
- [ ] Saisie des bonus (Skull-Pirate, Mermaid-Skull, Cartes 14)
- [ ] Calcul automatique du score
- [ ] Différenciation version nouvelle (cartes 14 noires)

### 5. Tableau des scores
- [ ] Affichage correct des paris/résultats
- [ ] Couleurs vert/rouge selon succès/échec
- [ ] Total cumulé correct

### 6. Résultats finaux
- [ ] Podium avec animations
- [ ] Classement complet
- [ ] Bouton "Nouvelle partie" fonctionne
- [ ] Reset complet de l'état

## 🐛 Problèmes courants

### Les images ne s'affichent pas
- Vérifiez que les fichiers `Skull_New_icon.png` et `Skull_Old_icon.png` sont dans `public/`
- Redémarrez le serveur de développement

### Les scores ne se calculent pas correctement
- Vérifiez la version sélectionnée (old vs new)
- Vérifiez que les bonus sont bien saisis
- Consultez `lib/game/scoring.ts` pour la logique

### L'état ne persiste pas
- Vérifiez que localStorage est activé dans le navigateur
- Vérifiez la console pour les erreurs

## 📝 Notes de développement

### Structure des données
- État stocké dans Zustand avec persist (localStorage)
- Clé de stockage : `skull-king-game`

### Calcul des scores
- Logique dans `lib/game/scoring.ts`
- Différences entre versions dans `lib/game/rules-comparison.ts`

### Thème
- Couleurs définies dans `tailwind.config.ts`
- Styles globaux dans `app/globals.css`
- Classes utilitaires : `card-pirate`, `button-pirate`

## 🎯 Prochaines améliorations

Voir `IMPROVEMENTS.md` pour la liste complète des améliorations prévues en V2.

