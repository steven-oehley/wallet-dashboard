import { Transaction } from '../types/types';
import Spinner from './spinner';
import TransactionCard from './transaction-card';

interface TransactionListProps {
  transactions: Transaction[];
  loading?: boolean;
}

const TransactionList = ({ transactions, loading }: TransactionListProps) => {
  const isEmpty = !transactions || transactions.length === 0;

  if (loading) {
    return (
      <section className="flex-1 px-4">
        <div className="mx-auto flex h-[400px] w-full max-w-5xl flex-1 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/30 md:h-[500px]">
          <Spinner />
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 px-4">
      {/* Fixed-height scrollable container */}
      <div className="mx-auto h-[450px] w-full max-w-5xl overflow-y-auto rounded-lg border border-slate-700 bg-slate-900/30 md:h-[500px]">
        {!loading && isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 text-5xl">💸</div>
            <h3 className="mb-2 text-xl font-bold text-slate-200">No transactions yet</h3>
            <p className="max-w-md text-slate-400">Deposit funds in your account to get playing!</p>
          </div>
        ) : (
          <div className="space-y-4 p-3">
            {transactions.map(transaction => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TransactionList;
