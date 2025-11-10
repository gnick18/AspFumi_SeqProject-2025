-- Database Migration for Privacy Options
-- Run this SQL command in your Neon database console

ALTER TABLE lab_submissions 
ADD COLUMN map_visibility VARCHAR(20) DEFAULT 'full' 
CHECK (map_visibility IN ('full', 'institution_only', 'hidden'));

-- This adds a new column to track privacy preferences:
-- 'full' = Show both lab name and institution (default)
-- 'institution_only' = Show only institution name (anonymous lab)
-- 'hidden' = Do not show on map at all (complete opt-out)