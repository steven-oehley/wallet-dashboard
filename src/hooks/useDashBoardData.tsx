// hooks/useDashboardData.ts
import { useState, useEffect } from 'react';
import { Wallet, Transaction, DashboardData } from '../types/types';

const useDashboardData = (): DashboardData => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);

        // Fetch wallet data
        const walletRes = await fetch('/api/wallet.json');
        if (!walletRes.ok) throw new Error('Failed to fetch wallet data');
        const walletData: Wallet = await walletRes.json();

        // Fetch transactions data
        const transactionsRes = await fetch('/api/transactions.json');
        if (!transactionsRes.ok) throw new Error('Failed to fetch transactions data');
        const transactionsData: Transaction[] = await transactionsRes.json();

        // Add a 1-second delay before updating state
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Update state with fetched data
        setWallet(walletData);
        setTransactions(transactionsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { wallet, setWallet, transactions, setTransactions, loading, error };
};

export default useDashboardData;
