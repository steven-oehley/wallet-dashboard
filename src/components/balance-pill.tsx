interface BalancePillProps {
  balance: number;
  currency: string;
}
const formatter = new Intl.NumberFormat('en-US');

const BalancePill = ({ balance, currency }: BalancePillProps) => {
  return (
    <div className="rounded-full bg-slate-700 px-3 py-1.5 shadow-inner">
      <span className="text-sm font-medium text-slate-200">Balance: </span>
      <span className="text-sm font-bold text-white">{formatter.format(balance)}</span>
      <span className="text-sm font-medium text-white"> {currency} </span>
    </div>
  );
};
export default BalancePill;
