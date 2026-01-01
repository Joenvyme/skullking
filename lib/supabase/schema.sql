-- Schema Supabase pour Skull King PWA

-- Extension pour les vecteurs (pgvector)
CREATE EXTENSION IF NOT EXISTS vector;

-- Table pour les embeddings des règles
CREATE TABLE IF NOT EXISTS rules_embeddings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_version TEXT NOT NULL, -- 'old' ou 'new'
  section TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1536), -- OpenAI embeddings (text-embedding-3-small)
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index pour recherche vectorielle
CREATE INDEX IF NOT EXISTS rules_embeddings_embedding_idx 
ON rules_embeddings 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Index pour filtrer par version
CREATE INDEX IF NOT EXISTS rules_embeddings_version_idx 
ON rules_embeddings (game_version);

-- Fonction de recherche sémantique
CREATE OR REPLACE FUNCTION match_rules(
  query_embedding vector(1536),
  match_threshold FLOAT,
  match_count INT,
  game_version TEXT
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    rules_embeddings.id,
    rules_embeddings.content,
    1 - (rules_embeddings.embedding <=> query_embedding) AS similarity
  FROM rules_embeddings
  WHERE 
    rules_embeddings.game_version = match_rules.game_version
    AND 1 - (rules_embeddings.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

-- Table pour l'historique des parties (optionnel)
CREATE TABLE IF NOT EXISTS games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  version TEXT NOT NULL,
  players JSONB NOT NULL,
  rounds JSONB NOT NULL,
  final_scores JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  finished_at TIMESTAMP
);

-- Index pour les recherches par date
CREATE INDEX IF NOT EXISTS games_created_at_idx ON games (created_at DESC);

