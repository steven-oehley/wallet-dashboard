import { motion } from 'framer-motion';
import { useState } from 'react';
import { formatAmount } from '../utils/utils';
import Spinner from './spinner';

interface WalletModalProps {
  type: 'deposit' | 'withdraw';
  onModalSubmit: (amount: number) => void;
  onClose: () => void;
  currency?: string;
}

const WalletModal = ({
  type,
  onClose,
  onModalSubmit,
  maxWithdrawal,
  currency,
}: WalletModalProps & { maxWithdrawal?: number }) => {
  const [transactionAmount, setTransactionAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check for invalid amount on input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value);
    setTransactionAmount(amount);

    // Clear error when input changes
    if (error) setError(null);

    // Show error if withdrawal amount exceeds balance
    if (type === 'withdraw' && maxWithdrawal !== undefined && amount > maxWithdrawal) {
      setError(`You can't withdraw more than ${maxWithdrawal}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      onModalSubmit(transactionAmount);
      setIsLoading(false);
    }, 1000);
  };

  const isSubmitDisabled =
    maxWithdrawal !== undefined && (transactionAmount > maxWithdrawal || transactionAmount <= 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md rounded-xl bg-slate-900 p-6 text-white shadow-lg"
      >
        <h2 className="mb-4 text-2xl font-bold">
          {type === 'deposit' ? 'Deposit Funds' : 'Withdraw Funds'}
        </h2>
        <p className="mb-6 text-slate-400">
          {type === 'deposit' ? 'Add money to your account' : 'Withdraw funds from your account.'}
        </p>
        {isLoading ? (
          <div className="flex h-32 items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <form onSubmit={e => handleSubmit(e)}>
            <div className="mb-4">
              <input
                type="number"
                min="0"
                max={type === 'withdraw' ? maxWithdrawal : undefined}
                placeholder="Enter amount"
                value={transactionAmount}
                onChange={handleAmountChange}
                required
                className={`w-full rounded-lg border ${error ? 'border-red-500' : 'border-slate-600'} bg-slate-800 px-4 py-2 text-white outline-none focus:border-green-500`}
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              {type === 'withdraw' && maxWithdrawal !== undefined && (
                <p className="mt-1 text-xs text-slate-400">
                  Available balance: {formatAmount(maxWithdrawal)} {currency}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className={`rounded-lg px-4 py-2 ${
                  type === 'deposit' ? 'bg-green-500' : 'bg-orange-500'
                } text-white transition-all hover:scale-105 ${
                  isSubmitDisabled ? 'cursor-not-allowed opacity-50' : ''
                }`}
              >
                {type === 'deposit' ? 'Deposit' : 'Withdraw'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default WalletModal;
