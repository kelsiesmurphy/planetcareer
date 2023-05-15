export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      application: {
        Row: {
          applied_date: string | null
          closing_date: string | null
          company_logo: string | null
          company_name: string | null
          cover_letter: Json | null
          created_at: string | null
          further_details: string | null
          id: number
          job_application_period_id: number | null
          pay_range: string | null
          posting_url: string | null
          resume: Json | null
          role: string | null
          stage_id: number | null
          user_profile_id: string | null
        }
        Insert: {
          applied_date?: string | null
          closing_date?: string | null
          company_logo?: string | null
          company_name?: string | null
          cover_letter?: Json | null
          created_at?: string | null
          further_details?: string | null
          id?: number
          job_application_period_id?: number | null
          pay_range?: string | null
          posting_url?: string | null
          resume?: Json | null
          role?: string | null
          stage_id?: number | null
          user_profile_id?: string | null
        }
        Update: {
          applied_date?: string | null
          closing_date?: string | null
          company_logo?: string | null
          company_name?: string | null
          cover_letter?: Json | null
          created_at?: string | null
          further_details?: string | null
          id?: number
          job_application_period_id?: number | null
          pay_range?: string | null
          posting_url?: string | null
          resume?: Json | null
          role?: string | null
          stage_id?: number | null
          user_profile_id?: string | null
        }
      }
      application_demo: {
        Row: {
          applied_date: string | null
          closing_date: string | null
          company_logo: string | null
          company_name: string | null
          cover_letter: Json | null
          created_at: string | null
          further_details: string | null
          id: number
          pay_range: string | null
          posting_url: string | null
          resume: Json | null
          role: string | null
          stage_id: number | null
        }
        Insert: {
          applied_date?: string | null
          closing_date?: string | null
          company_logo?: string | null
          company_name?: string | null
          cover_letter?: Json | null
          created_at?: string | null
          further_details?: string | null
          id?: number
          pay_range?: string | null
          posting_url?: string | null
          resume?: Json | null
          role?: string | null
          stage_id?: number | null
        }
        Update: {
          applied_date?: string | null
          closing_date?: string | null
          company_logo?: string | null
          company_name?: string | null
          cover_letter?: Json | null
          created_at?: string | null
          further_details?: string | null
          id?: number
          pay_range?: string | null
          posting_url?: string | null
          resume?: Json | null
          role?: string | null
          stage_id?: number | null
        }
      }
      job_application_period: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: number
          start_date: string
          user_profile_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: number
          start_date?: string
          user_profile_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: number
          start_date?: string
          user_profile_id?: string | null
        }
      }
      stage: {
        Row: {
          background_colour: string | null
          created_at: string | null
          id: number
          "text-colour": string | null
          title: string | null
        }
        Insert: {
          background_colour?: string | null
          created_at?: string | null
          id?: number
          "text-colour"?: string | null
          title?: string | null
        }
        Update: {
          background_colour?: string | null
          created_at?: string | null
          id?: number
          "text-colour"?: string | null
          title?: string | null
        }
      }
      user_profile: {
        Row: {
          created_at: string | null
          current_application_period_id: number | null
          email: string | null
          first_name: string | null
          id: string
          is_onboarded: boolean | null
          profile_img: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_application_period_id?: number | null
          email?: string | null
          first_name?: string | null
          id: string
          is_onboarded?: boolean | null
          profile_img?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_application_period_id?: number | null
          email?: string | null
          first_name?: string | null
          id?: string
          is_onboarded?: boolean | null
          profile_img?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_avatar: {
        Args: {
          profile_img: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
