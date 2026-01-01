# 🔒 Sécurité et Contrôle des Coûts OpenAI

## 🛡️ Protections Implémentées

### 1. Rate Limiting (Limite de Requêtes)

✅ **Déjà implémenté** dans `app/api/chat/route.ts`

- **20 requêtes par heure** par adresse IP
- Protection contre l'abus et les coûts excessifs
- Headers de réponse pour informer l'utilisateur :
  - `X-RateLimit-Limit`: Limite totale
  - `X-RateLimit-Remaining`: Requêtes restantes
  - `X-RateLimit-Reset`: Heure de réinitialisation

### 2. Limitation des Tokens

✅ **Déjà implémenté**

- Maximum **500 tokens par réponse** (`maxTokens: 500`)
- Limite la longueur des réponses pour réduire les coûts
- Limite la longueur des questions à 500 caractères

### 3. Validation des Entrées

✅ **Déjà implémenté**

- Vérification de la présence des messages
- Validation de la longueur des questions
- Vérification de la clé API avant utilisation

## 💰 Configuration des Limites de Budget OpenAI

### Sur platform.openai.com

1. Allez sur [platform.openai.com/account/billing/limits](https://platform.openai.com/account/billing/limits)
2. Configurez des **hard limits** (limites strictes) :
   - **Hard limit mensuel** : Définissez un montant maximum (ex: $10/mois)
   - **Hard limit par requête** : Limitez le coût par requête
   - **Alertes** : Configurez des alertes à 50%, 75%, 90% de votre budget

### Exemple de Configuration Recommandée

```
Budget mensuel : $10
Alerte à 50% : $5
Alerte à 75% : $7.50
Alerte à 90% : $9
Hard limit : $10 (arrêt automatique)
```

## 📊 Monitoring des Coûts

### 1. Dashboard OpenAI

Surveillez vos coûts en temps réel :
- [platform.openai.com/usage](https://platform.openai.com/usage)
- Voir les coûts par modèle
- Voir les coûts par jour/mois

### 2. Estimation des Coûts

Avec les limites actuelles :
- **20 requêtes/heure/IP**
- **500 tokens max par réponse**
- **Modèle gpt-4o** (~$2.50 par 1M tokens d'entrée, ~$10 par 1M tokens de sortie)

**Estimation par requête** :
- Question : ~50 tokens
- Réponse : ~500 tokens max
- Coût approximatif : **~$0.005 par requête** (0.5 centime)

**Avec 20 requêtes/heure/IP** :
- Coût max par IP/heure : **~$0.10** (10 centimes)
- Coût max par IP/jour (si utilisé 24h) : **~$2.40**
- Coût max par IP/mois : **~$72**

### 3. Variables d'Environnement pour Ajuster les Limites

Créez un fichier `.env.local` avec :

```env
# Rate limiting
RATE_LIMIT_MAX_REQUESTS=20
RATE_LIMIT_WINDOW_HOURS=1

# Token limits
MAX_TOKENS_PER_RESPONSE=500
MAX_QUESTION_LENGTH=500
```

Puis modifiez `lib/api/rate-limit.ts` pour utiliser ces variables.

## 🚀 Améliorations pour la Production

### 1. Utiliser un Service de Rate Limiting Dédié

Pour la production, remplacez le rate limiting en mémoire par :

- **Upstash Redis** (gratuit jusqu'à 10K requêtes/jour)
- **Vercel Edge Config** (si déployé sur Vercel)
- **Cloudflare Rate Limiting**

### 2. Authentification Utilisateur (Optionnel)

Pour limiter par utilisateur plutôt que par IP :

```typescript
// Exemple avec authentification
const userId = await getUserId(req) // Votre système d'auth
const rateLimit = checkRateLimit(`user:${userId}`)
```

### 3. Caching des Réponses (Optionnel)

Cachez les réponses fréquentes pour éviter les appels API :

```typescript
// Exemple avec cache
const cacheKey = `chat:${gameVersion}:${hashQuestion(userQuestion)}`
const cached = await cache.get(cacheKey)
if (cached) return cached
```

### 4. Modèle Moins Cher (Optionnel)

Pour réduire les coûts, utilisez un modèle moins cher :

```typescript
// Au lieu de gpt-4o, utilisez gpt-3.5-turbo
model: openaiModel('gpt-3.5-turbo', {
  apiKey: openaiApiKey,
})
```

**Coûts comparatifs** :
- `gpt-4o` : ~$2.50/$10 par 1M tokens (entrée/sortie)
- `gpt-3.5-turbo` : ~$0.50/$1.50 par 1M tokens (entrée/sortie)

## ⚠️ Checklist Avant la Mise en Production

- [ ] ✅ Rate limiting configuré (20 req/heure/IP)
- [ ] ✅ Limite de tokens configurée (500 tokens max)
- [ ] ✅ Hard limits configurés sur OpenAI (budget mensuel)
- [ ] ✅ Alertes configurées sur OpenAI (50%, 75%, 90%)
- [ ] ✅ Monitoring des coûts activé
- [ ] ⚠️ **À faire** : Tester le rate limiting
- [ ] ⚠️ **À faire** : Configurer les hard limits sur OpenAI
- [ ] ⚠️ **Optionnel** : Implémenter le caching
- [ ] ⚠️ **Optionnel** : Passer à un modèle moins cher si nécessaire

## 🔍 Tester le Rate Limiting

Pour tester que le rate limiting fonctionne :

1. Faites 20 requêtes rapidement
2. La 21ème devrait retourner une erreur 429
3. Attendez 1 heure ou changez d'IP

## 📝 Notes Importantes

1. **Le rate limiting actuel est en mémoire** : Il sera réinitialisé à chaque redémarrage du serveur. Pour la production, utilisez Redis ou un service dédié.

2. **Les limites sont par IP** : Un utilisateur peut contourner en changeant d'IP. Pour une meilleure protection, ajoutez l'authentification.

3. **Surveillez régulièrement** : Vérifiez vos coûts sur le dashboard OpenAI au moins une fois par semaine.

4. **Testez en staging** : Avant de mettre en production, testez avec de vraies requêtes pour estimer les coûts réels.

## 🆘 En Cas de Dépense Excessive

Si vous remarquez des coûts anormaux :

1. **Arrêtez immédiatement** le service
2. **Vérifiez les logs** pour identifier l'abus
3. **Réduisez les limites** dans `lib/api/rate-limit.ts`
4. **Activez les hard limits** sur OpenAI
5. **Contactez le support OpenAI** si nécessaire

