import { formatAmount } from '../utils/utils';

interface BalancePillProps {
  balance: number;
  currency: string;
  loading?: boolean;
}

const BalancePill = ({ balance, currency, loading = false }: BalancePillProps) => {
  return (
    <div className="rounded-full bg-slate-700 px-3 py-1.5 shadow-inner">
      <span className="text-sm font-medium text-slate-200">Balance: </span>
      {loading ? (
        <span className="inline-flex items-center">
          <span className="mr-2 ml-1 h-4 w-4 animate-spin rounded-full border-2 border-slate-600 border-t-indigo-500"></span>
        </span>
      ) : (
        <>
          <span className="text-sm font-bold text-white">{formatAmount(balance)}</span>
          <span className="text-sm font-medium text-white"> {currency} </span>
        </>
      )}
    </div>
  );
};
export default BalancePill;
