import { Transaction } from '../types/types';
import TransactionCard from './transaction-card';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <section className="flex-1 px-4">
      {/* Fixed-height scrollable container */}
      <div className="mx-auto h-[400px] w-full max-w-7xl overflow-y-auto rounded-lg border border-slate-700 bg-slate-900/30 md:h-[500px]">
        <div className="space-y-4 p-3">
          {transactions?.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransactionList;
