export interface Wallet {
  balance: number;
  currency: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'purchase' | 'reward';
  amount: number;
  currency: string;
  status: 'success' | 'pending' | 'failed';
  date: string;
  description: string;
  paymentMethod?: string;
  gameName?: string;
  gameId?: string;
}

export interface DashboardData {
  wallet: Wallet | null;
  setWallet: React.Dispatch<React.SetStateAction<Wallet | null>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  loading: boolean;
  error: string | null;
}
