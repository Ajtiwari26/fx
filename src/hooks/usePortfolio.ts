import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Portfolio = Database['public']['Tables']['portfolios']['Row'];

export function usePortfolio(userId: string | null) {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchPortfolio();
    }
  }, [userId]);

  const fetchPortfolio = async () => {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('user_id', userId);

    if (!error && data) {
      setPortfolio(data);
    }
    setLoading(false);
  };

  const addAsset = async (assetName: string, quantity: number, purchasePrice: number) => {
    if (!userId) return { error: new Error('User not authenticated') };

    const { error } = await supabase
      .from('portfolios')
      .insert([
        {
          user_id: userId,
          asset_name: assetName,
          quantity,
          purchase_price: purchasePrice
        }
      ]);

    if (!error) {
      fetchPortfolio();
    }

    return { error };
  };

  return { portfolio, loading, addAsset };
}