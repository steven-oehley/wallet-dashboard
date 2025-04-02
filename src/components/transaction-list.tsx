import { motion, AnimatePresence } from 'framer-motion';
import { Transaction } from '../types/types';
interface TransactionListProps {
  transactions: Transaction[];
  loading: boolean;
}

const TransactionList = ({ transactions, loading }: TransactionListProps) => {
  if (loading) {
    return (
      <div className="mx-auto w-full max-w-5xl p-4">
        <div className="flex justify-center py-8">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-slate-600 border-t-indigo-500"></span>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full flex-1 px-4 py-2">
      <div className="mx-auto max-w-5xl">
        {transactions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 p-8 text-center text-slate-400"
          >
            <p>No transactions found</p>
            <p className="text-sm">Try changing your filters or make a transaction</p>
          </motion.div>
        ) : (
          <ul className="space-y-2">
            <AnimatePresence mode="popLayout">
              {transactions.map(transaction => (
                <motion.li
                  key={transaction.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl border border-slate-700 bg-slate-900/50 p-4 shadow-md shadow-gray-900/30"
                >
                  {/* Your transaction item content here */}
                  <div className="flex justify-between">
                    <div>
                      <span
                        className={`rounded-lg px-2 py-1 text-xs font-bold ${
                          transaction.type === 'deposit'
                            ? 'bg-green-900/30 text-green-400'
                            : 'bg-orange-900/30 text-orange-400'
                        }`}
                      >
                        {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                      </span>
                      <p className="mt-2 text-sm text-slate-400">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg font-bold ${
                          transaction.type === 'deposit' ? 'text-green-400' : 'text-orange-400'
                        }`}
                      >
                        {transaction.type === 'deposit' ? '+' : '-'}
                        {transaction.amount} {transaction.currency}
                      </p>
                      <p className="text-xs text-slate-400">Status: {transaction.status}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </section>
  );
};

export default TransactionList;
