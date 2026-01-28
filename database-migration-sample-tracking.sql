-- Database Migration for Sample Tracking and Unique Strain ID
-- Run this SQL command in your Neon database console

-- Step 1: Add new columns to isolate_submissions table
ALTER TABLE isolate_submissions
ADD COLUMN IF NOT EXISTS sample_received BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS sample_received_date DATE,
ADD COLUMN IF NOT EXISTS unique_strain_id VARCHAR(255);

-- Step 2: Backfill unique_strain_id for existing records
-- Format: {strain_name}__{submitting_lab}
UPDATE isolate_submissions 
SET unique_strain_id = strain_name || '__' || submitting_lab
WHERE unique_strain_id IS NULL;

-- Step 3: Add a unique constraint on unique_strain_id to prevent duplicates
-- This ensures each strain + lab combination is unique
-- Note: Run this after the backfill completes
-- ALTER TABLE isolate_submissions ADD CONSTRAINT unique_strain_constraint UNIQUE (unique_strain_id);

-- Verification query - check the new columns
-- SELECT id, strain_name, submitting_lab, unique_strain_id, sample_received, sample_received_date 
-- FROM isolate_submissions 
-- ORDER BY id DESC 
-- LIMIT 10;
