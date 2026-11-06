-- Ensure pgcrypto extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create articles table for Pale Blue Dot
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  edition INTEGER NOT NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  publish_date DATE,
  abstract TEXT,
  content TEXT,
  language VARCHAR(10) DEFAULT 'en',
  status VARCHAR(20) DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert a sample row for testing
INSERT INTO articles (edition, title, author, publish_date, abstract, content, language, status)
VALUES (
  1,
  'The Pale Meanings of a Pale Blue Dot',
  'María González',
  '2026-06-01',
  'An exploration of planetary perspective in contemporary student scholarship from Chile.',
  'Full article content goes here. This is placeholder content for testing the application. \n\nSection 1...\n\nSection 2...\n',
  'es',
  'published'
);
