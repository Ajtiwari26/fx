export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          full_name: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name: string;
        };
        Update: {
          email?: string;
          full_name?: string;
        };
      };
      portfolios: {
        Row: {
          id: string;
          user_id: string;
          asset_name: string;
          quantity: number;
          purchase_price: number;
          created_at: string;
        };
        Insert: {
          user_id: string;
          asset_name: string;
          quantity: number;
          purchase_price: number;
        };
        Update: {
          quantity?: number;
          purchase_price?: number;
        };
      };
    };
  };
}