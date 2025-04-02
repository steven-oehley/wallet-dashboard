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
    <section className="flex w-full flex-1 flex-col px-4 py-2">
      <div className="mx-auto flex w-full max-w-5xl flex-grow flex-col">
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
          <div className="relative flex flex-grow flex-col">
            <div className="absolute inset-0 rounded-xl border border-slate-700 bg-slate-900/30 shadow-md shadow-gray-900/20">
              <div className="custom-scrollbar h-full overflow-y-auto">
                <ul className="space-y-2 p-3">
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
                                transaction.type === 'deposit'
                                  ? 'text-green-400'
                                  : 'text-orange-400'
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
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TransactionList;
