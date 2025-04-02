import { Transaction } from '../types/types';
import { formatAmount, formatDate } from '../utils/utils';

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  return (
    <article className="rounded-lg bg-indigo-900 p-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-900/50 hover:to-slate-900">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-slate-200 capitalize">{transaction.type}</h1>
          <p className="text-xs font-medium text-slate-400">
            {formatDate(transaction.date).date} • {formatDate(transaction.date).time}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-lg font-bold text-slate-200">
            {formatAmount(transaction.amount)} {transaction.currency}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              transaction.status === 'success'
                ? 'bg-green-900/40 text-green-500'
                : 'bg-red-900/40 text-red-500'
            }`}
          >
            {transaction.status}
          </span>
        </div>
      </div>
    </article>
  );
};

export default TransactionCard;
