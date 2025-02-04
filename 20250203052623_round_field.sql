/*
  # PGA Tour ShotLink Data Schema

  1. New Tables
    - `players`
      - Basic player information
    - `rounds`
      - Round-level data
    - `shots`
      - Individual shot data from ShotLink
    - `tournaments`
      - Tournament information

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
*/

-- Create players table
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pga_player_id text UNIQUE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create tournaments table
CREATE TABLE IF NOT EXISTS tournaments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pga_tournament_id text UNIQUE NOT NULL,
  name text NOT NULL,
  course text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create rounds table
CREATE TABLE IF NOT EXISTS rounds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES players(id) NOT NULL,
  tournament_id uuid REFERENCES tournaments(id) NOT NULL,
  round_number smallint NOT NULL,
  score smallint NOT NULL,
  fairways_hit smallint,
  greens_in_regulation smallint,
  putts integer,
  round_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(player_id, tournament_id, round_number)
);

-- Create shots table
CREATE TABLE IF NOT EXISTS shots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  round_id uuid REFERENCES rounds(id) NOT NULL,
  shot_number smallint NOT NULL,
  hole_number smallint NOT NULL,
  distance numeric(6,2),
  club_used text,
  start_location_x numeric(8,2),
  start_location_y numeric(8,2),
  end_location_x numeric(8,2),
  end_location_y numeric(8,2),
  shot_type text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE shots ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to players"
  ON players FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow public read access to tournaments"
  ON tournaments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow public read access to rounds"
  ON rounds FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow public read access to shots"
  ON shots FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample players
INSERT INTO players (pga_player_id, name)
VALUES 
  ('T Woods', 'Tiger Woods'),
  ('R McIlroy', 'Rory McIlroy')
ON CONFLICT (pga_player_id) DO NOTHING;