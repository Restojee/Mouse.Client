DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'tags'
      AND column_name = 'parent_tag_id'
  ) THEN
    ALTER TABLE tags ADD COLUMN parent_tag_id integer NULL;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints tc
    WHERE tc.table_name = 'tags'
      AND tc.constraint_type = 'FOREIGN KEY'
      AND tc.constraint_name = 'fk_tags_parent_tag_id'
  ) THEN
    ALTER TABLE tags
      ADD CONSTRAINT fk_tags_parent_tag_id
      FOREIGN KEY (parent_tag_id)
      REFERENCES tags("Id")
      ON DELETE RESTRICT;
  END IF;
END $$;
