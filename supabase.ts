export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      players: {
        Row: {
          id: string
          pga_player_id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          pga_player_id: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          pga_player_id?: string
          name?: string
          created_at?: string
        }
      }
      tournaments: {
        Row: {
          id: string
          pga_tournament_id: string
          name: string
          course: string
          start_date: string
          end_date: string
          created_at: string
        }
        Insert: {
          id?: string
          pga_tournament_id: string
          name: string
          course: string
          start_date: string
          end_date: string
          created_at?: string
        }
        Update: {
          id?: string
          pga_tournament_id?: string
          name?: string
          course?: string
          start_date?: string
          end_date?: string
          created_at?: string
        }
      }
      rounds: {
        Row: {
          id: string
          player_id: string
          tournament_id: string
          round_number: number
          score: number
          fairways_hit: number | null
          greens_in_regulation: number | null
          putts: number | null
          round_date: string
          created_at: string
        }
        Insert: {
          id?: string
          player_id: string
          tournament_id: string
          round_number: number
          score: number
          fairways_hit?: number | null
          greens_in_regulation?: number | null
          putts?: number | null
          round_date: string
          created_at?: string
        }
        Update: {
          id?: string
          player_id?: string
          tournament_id?: string
          round_number?: number
          score?: number
          fairways_hit?: number | null
          greens_in_regulation?: number | null
          putts?: number | null
          round_date?: string
          created_at?: string
        }
      }
      shots: {
        Row: {
          id: string
          round_id: string
          shot_number: number
          hole_number: number
          distance: number | null
          club_used: string | null
          start_location_x: number | null
          start_location_y: number | null
          end_location_x: number | null
          end_location_y: number | null
          shot_type: string | null
          created_at: string
        }
        Insert: {
          id?: string
          round_id: string
          shot_number: number
          hole_number: number
          distance?: number | null
          club_used?: string | null
          start_location_x?: number | null
          start_location_y?: number | null
          end_location_x?: number | null
          end_location_y?: number | null
          shot_type?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          round_id?: string
          shot_number?: number
          hole_number?: number
          distance?: number | null
          club_used?: string | null
          start_location_x?: number | null
          start_location_y?: number | null
          end_location_x?: number | null
          end_location_y?: number | null
          shot_type?: string | null
          created_at?: string
        }
      }
    }
  }
}