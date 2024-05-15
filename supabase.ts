export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      card_levels: {
        Row: {
          card_id: number;
          last_changed: string;
          level: number;
          user_id: string;
        };
        Insert: {
          card_id: number;
          last_changed?: string;
          level?: number;
          user_id?: string;
        };
        Update: {
          card_id?: number;
          last_changed?: string;
          level?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_mastery_level_card_id_fkey";
            columns: ["card_id"];
            isOneToOne: false;
            referencedRelation: "cards";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_mastery_level_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      cards: {
        Row: {
          back: string;
          created_at: string;
          front: string;
          id: number;
          stack_id: number;
          user_id: string;
        };
        Insert: {
          back?: string;
          created_at?: string;
          front?: string;
          id?: number;
          stack_id: number;
          user_id?: string;
        };
        Update: {
          back?: string;
          created_at?: string;
          front?: string;
          id?: number;
          stack_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cards_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_cards_stack_id_fkey";
            columns: ["stack_id"];
            isOneToOne: false;
            referencedRelation: "stacks";
            referencedColumns: ["id"];
          }
        ];
      };
      stack_tags: {
        Row: {
          stack_id: number;
          tag: string;
        };
        Insert: {
          stack_id: number;
          tag: string;
        };
        Update: {
          stack_id?: number;
          tag?: string;
        };
        Relationships: [
          {
            foreignKeyName: "stack_tags_stack_id_fkey";
            columns: ["stack_id"];
            isOneToOne: false;
            referencedRelation: "stacks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "stack_tags_tag_fkey";
            columns: ["tag"];
            isOneToOne: false;
            referencedRelation: "tags";
            referencedColumns: ["name"];
          }
        ];
      };
      stacks: {
        Row: {
          created_at: string;
          description: string;
          id: number;
          name: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description?: string;
          id?: number;
          name: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: number;
          name?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "stacks_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      tags: {
        Row: {
          name: string;
        };
        Insert: {
          name: string;
        };
        Update: {
          name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
