export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cards: {
        Row: {
          created_at: string
          definition: string
          id: number
          owner_id: string | null
          word: string
        }
        Insert: {
          created_at?: string
          definition?: string
          id?: number
          owner_id?: string | null
          word?: string
        }
        Update: {
          created_at?: string
          definition?: string
          id?: number
          owner_id?: string | null
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_cards_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cards_in_stacks: {
        Row: {
          card_id: number
          mastery_level: number
          owner_id: string | null
          stack_id: number
        }
        Insert: {
          card_id: number
          mastery_level?: number
          owner_id?: string | null
          stack_id: number
        }
        Update: {
          card_id?: number
          mastery_level?: number
          owner_id?: string | null
          stack_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_cards_in_stacks_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_cards_in_stacks_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_cards_in_stacks_stack_id_fkey"
            columns: ["stack_id"]
            isOneToOne: true
            referencedRelation: "stacks"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string
          description: string | null
          id: number
          image_url: string | null
          name: string
          owner_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          image_url?: string | null
          name: string
          owner_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          image_url?: string | null
          name?: string
          owner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_courses_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      folders: {
        Row: {
          course_id: number
          created_at: string
          id: number
          name: string
          owner_id: string
        }
        Insert: {
          course_id: number
          created_at?: string
          id?: number
          name: string
          owner_id: string
        }
        Update: {
          course_id?: number
          created_at?: string
          id?: number
          name?: string
          owner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_folders_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_folders_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stacks: {
        Row: {
          created_at: string
          definition_lang: string
          folder_id: number
          id: number
          name: string
          owner_id: string
          word_lang: string
        }
        Insert: {
          created_at?: string
          definition_lang: string
          folder_id: number
          id?: number
          name: string
          owner_id: string
          word_lang: string
        }
        Update: {
          created_at?: string
          definition_lang?: string
          folder_id?: number
          id?: number
          name?: string
          owner_id?: string
          word_lang?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_stacks_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_stacks_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
