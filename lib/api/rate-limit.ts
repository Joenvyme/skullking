/**
 * Rate limiting simple en mémoire
 * Pour la production, utilisez plutôt Redis ou un service dédié
 */

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

// Configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 heure en millisecondes
const MAX_REQUESTS_PER_HOUR = 20 // Maximum 20 requêtes par heure par IP
const MAX_TOKENS_PER_REQUEST = 500 // Maximum 500 tokens par réponse

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: number
}

export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now()
  const record = store[identifier]

  // Pas de record ou fenêtre expirée
  if (!record || now > record.resetTime) {
    store[identifier] = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    }
    return {
      allowed: true,
      remaining: MAX_REQUESTS_PER_HOUR - 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    }
  }

  // Limite atteinte
  if (record.count >= MAX_REQUESTS_PER_HOUR) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    }
  }

  // Incrémenter le compteur
  record.count++
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_HOUR - record.count,
    resetTime: record.resetTime,
  }
}

/**
 * Nettoyer les anciennes entrées (à appeler périodiquement)
 */
export function cleanupRateLimit() {
  const now = Date.now()
  Object.keys(store).forEach((key) => {
    if (now > store[key].resetTime) {
      delete store[key]
    }
  })
}

// Nettoyer toutes les heures
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimit, 60 * 60 * 1000)
}

