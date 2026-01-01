# 🔑 Configuration de la clé API OpenAI

## ⚠️ Erreur : Clé API incorrecte

Si vous voyez l'erreur `Incorrect API key provided: ssk-proj...`, cela signifie que vous avez utilisé une clé Supabase au lieu d'une clé OpenAI.

## ✅ Solution : Obtenir la bonne clé API

### 1. Clé API OpenAI (requise)

Les clés OpenAI commencent toujours par `sk-` (pas `ssk-`).

**Comment obtenir votre clé OpenAI :**

1. Allez sur [platform.openai.com](https://platform.openai.com)
2. Connectez-vous ou créez un compte
3. Allez dans **API Keys** (ou **Clés API** dans le menu)
4. Cliquez sur **Create new secret key**
5. Donnez-lui un nom (ex: "Skull King App")
6. **Copiez la clé** - elle ressemble à : `sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
7. ⚠️ **Important** : Vous ne pourrez plus voir la clé complète après, alors copiez-la maintenant !

### 2. Mettre à jour le fichier `.env.local`

Ouvrez le fichier `.env.local` à la racine du projet et remplacez la ligne :

```env
OPENAI_API_KEY=sk-votre-cle-api-openai
```

Par votre vraie clé (qui commence par `sk-`) :

```env
OPENAI_API_KEY=sk-proj-votre-vraie-cle-ici
```

**Important :**
- Pas d'espaces autour du `=`
- Pas de guillemets
- La clé doit commencer par `sk-` (pas `ssk-`)

### 3. Redémarrer le serveur

Après avoir mis à jour `.env.local`, redémarrez le serveur :

```bash
# Arrêtez avec Ctrl+C puis :
npm run dev
```

## 🔍 Vérification

Pour vérifier que votre clé est correcte :

1. Elle doit commencer par `sk-` (pas `ssk-`)
2. Elle doit être sur une seule ligne dans `.env.local`
3. Pas d'espaces avant ou après le `=`
4. Pas de guillemets autour de la clé

## 💡 Différence entre les clés

- **OpenAI API Key** : Commence par `sk-` → Pour l'assistant IA
- **Supabase API Key** : Commence par `eyJ...` ou `sb-...` → Pour la base de données (optionnel)

Pour l'instant, vous n'avez besoin que de la clé OpenAI pour que l'assistant fonctionne.

## 🆘 Si vous n'avez pas de compte OpenAI

1. Créez un compte sur [platform.openai.com](https://platform.openai.com)
2. Ajoutez une méthode de paiement (nécessaire pour utiliser l'API)
3. Vous recevrez des crédits gratuits au début
4. Créez ensuite votre clé API comme expliqué ci-dessus

