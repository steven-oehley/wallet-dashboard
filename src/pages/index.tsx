import BalancePill from '../components/balance-pill';
import FilterToolBar from '../components/filter-toolbar';
import Header from '../components/header';
import TransactionList from '../components/transaction-list';
import WalletActions from '../components/wallet-actions';
import useDashboardData from '../hooks/useDashBoardData';

const DashboardPage = () => {
  const { wallet, transactions, loading, error } = useDashboardData();

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
      <WalletActions />
      <FilterToolBar />
      <TransactionList transactions={transactions} loading={loading} />
    </main>
  );
};
export default DashboardPage;
