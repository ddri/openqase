-- Update aerospace industry with sector values
-- Run this script to add sector information to the aerospace industry

UPDATE industries 
SET sector = '{
  "Commercial Aviation",
  "Defense & Military", 
  "Space Exploration",
  "Satellite Systems",
  "Aircraft Manufacturing",
  "Propulsion Systems",
  "Unmanned Systems",
  "Space Commerce"
}'
WHERE slug = 'aerospace' AND id = '961829fa-278f-4e04-9c5f-89e5a5ad9d8a';

-- Verify the update
SELECT id, slug, name, sector FROM industries WHERE slug = 'aerospace';