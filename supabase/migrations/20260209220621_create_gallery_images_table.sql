/*
  # Create Gallery Images Table

  1. New Tables
    - `gallery_images`
      - `id` (uuid, primary key)
      - `title` (text) - Title of the image
      - `description` (text) - Description of the work shown
      - `image_url` (text) - URL to the image
      - `display_order` (integer) - Order in which to display images
      - `created_at` (timestamptz) - When the image was added
      - `updated_at` (timestamptz) - When the image was last updated

  2. Security
    - Enable RLS on `gallery_images` table
    - Add policy for public read access (gallery is public)
    - Add policy for authenticated admin users to manage images

  3. Notes
    - Images are publicly viewable by all visitors
    - Only authenticated users can add/edit/delete images
    - Display order allows custom sorting of gallery images
*/

CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gallery images"
  ON gallery_images
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert gallery images"
  ON gallery_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update gallery images"
  ON gallery_images
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete gallery images"
  ON gallery_images
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS gallery_images_display_order_idx ON gallery_images(display_order);
