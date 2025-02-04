export interface Player {
  id: string;
  pga_player_id: string;
  name: string;
  created_at: string;
}

export interface Tournament {
  id: string;
  pga_tournament_id: string;
  name: string;
  course: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

export interface Round {
  id: string;
  player_id: string;
  tournament_id: string;
  round_number: number;
  score: number;
  fairways_hit?: number;
  greens_in_regulation?: number;
  putts?: number;
  round_date: string;
  created_at: string;
}

export interface Shot {
  id: string;
  round_id: string;
  shot_number: number;
  hole_number: number;
  distance?: number;
  club_used?: string;
  start_location_x?: number;
  start_location_y?: number;
  end_location_x?: number;
  end_location_y?: number;
  shot_type?: string;
  created_at: string;
}