import { useState } from 'react';
import { nanoid } from 'nanoid';
import BalancePill from '../components/balance-pill';
import FilterToolBar from '../components/filter-toolbar';
import Header from '../components/header';
import TransactionList from '../components/transaction-list';
import WalletActionsRow from '../components/wallet-actions';
import WalletModal from '../components/wallet-modal';
import useDashboardData from '../hooks/useDashBoardData';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const DashboardPage = () => {
  const [actionType, setActionType] = useState<'deposit' | 'withdraw' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterType, setFilterType] = useState<string | null>(null);
  const { wallet, setWallet, transactions, setTransactions, loading, error } = useDashboardData();

  const walletAction = (amount: number, transactionType: 'deposit' | 'withdrawal') => {
    setWallet(prevWallet => {
      if (!prevWallet) return null;

      if (transactionType === 'withdrawal') {
        return { ...prevWallet, balance: prevWallet.balance - amount };
      }

      return { ...prevWallet, balance: prevWallet.balance + amount };
    });
    setTransactions(prevTransactions => [
      ...prevTransactions,
      {
        id: nanoid(),
        type: transactionType,
        amount: amount,
        currency: wallet?.currency ?? '',
        status: 'success',
        date: new Date().toISOString(),
      },
    ]);

    setActionType(null);
  };

  const onModalSubmit = (amount: number) => {
    if (actionType === 'withdraw') {
      walletAction(amount, 'withdrawal');
    } else {
      walletAction(amount, 'deposit');
    }
    setActionType(null);
    toast.success(
      `Successfully ${actionType === 'deposit' ? 'deposited' : 'withdrew'} ${amount} ${wallet?.currency ?? ''}`
    );
  };

  const onClearFilter = () => {
    setFilterType(null);
    setSortOrder('desc');
  };

  const filteredTransactions = transactions
    .filter(transaction => {
      // Apply type filter if set
      if (!filterType) return true;
      return transaction.type === filterType;
    })
    .sort((a, b) => {
      // Sort by date
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortOrder === 'asc') {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 to-slate-900">
      <Header title="Wallet 💰">
        {!error && (
          <BalancePill
            balance={wallet?.balance ?? 0}
            currency={wallet?.currency ?? ''}
            loading={loading}
          />
        )}
      </Header>
      <WalletActionsRow>
        <button
          onClick={() => setActionType('deposit')}
          className="rounded-xl border border-green-500 bg-gradient-to-r from-green-500 to-green-800 px-6 py-2.5 font-semibold text-white transition-all duration-300 hover:shadow-md hover:shadow-green-500/20 md:hover:-translate-y-1 md:hover:scale-105"
        >
          Deposit
        </button>

        <button
          onClick={() => setActionType('withdraw')}
          className="rounded-xl border border-orange-500 px-6 py-2.5 font-semibold text-orange-500 transition-all duration-300 hover:shadow-md hover:shadow-orange-500/20 md:hover:-translate-y-1 md:hover:scale-105"
        >
          Withdraw
        </button>
      </WalletActionsRow>
      <FilterToolBar
        onClearFilter={onClearFilter}
        onSortChange={setSortOrder}
        onFilterChange={setFilterType}
        sortOrder={sortOrder}
        filterType={filterType}
        totalCount={transactions.length}
        filteredCount={filteredTransactions.length}
      />
      <TransactionList transactions={filteredTransactions} loading={loading} />
      {actionType && (
        <WalletModal
          maxWithdrawal={wallet?.balance ?? 0}
          type={actionType}
          onClose={() => setActionType(null)}
          onModalSubmit={onModalSubmit}
          currency={wallet?.currency ?? ''}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </main>
  );
};
export default DashboardPage;
