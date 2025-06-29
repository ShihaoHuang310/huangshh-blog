export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          category: string
          tags: string[]
          published_at: string | null
          updated_at: string
          view_count: number
          reading_time: number | null
          featured: boolean
          author_id: string
          cover_image: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          category: string
          tags?: string[]
          published_at?: string | null
          updated_at?: string
          view_count?: number
          reading_time?: number | null
          featured?: boolean
          author_id: string
          cover_image?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          category?: string
          tags?: string[]
          published_at?: string | null
          updated_at?: string
          view_count?: number
          reading_time?: number | null
          featured?: boolean
          author_id?: string
          cover_image?: string | null
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          color: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          color?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          color?: string | null
          created_at?: string
        }
      }
      authors: {
        Row: {
          id: string
          name: string
          email: string
          avatar: string | null
          bio: string | null
          website: string | null
          social: Record<string, any> | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          avatar?: string | null
          bio?: string | null
          website?: string | null
          social?: Record<string, any> | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          avatar?: string | null
          bio?: string | null
          website?: string | null
          social?: Record<string, any> | null
          created_at?: string
        }
      }
      subscribers: {
        Row: {
          id: string
          email: string
          subscribed_at: string
          active: boolean
        }
        Insert: {
          id?: string
          email: string
          subscribed_at?: string
          active?: boolean
        }
        Update: {
          id?: string
          email?: string
          subscribed_at?: string
          active?: boolean
        }
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
  }
}
