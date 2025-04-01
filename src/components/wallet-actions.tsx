interface WalletActionProps {
  onDeposit?: () => void;
  onWithdraw?: () => void;
}

const WalletAction = ({ onDeposit, onWithdraw }: WalletActionProps) => {
  return (
    <section className="w-full px-4 py-3 md:py-5">
      <div className="mx-auto flex max-w-7xl justify-center gap-4 md:gap-8">
        <button
          onClick={onDeposit}
          className="rounded-xl bg-gradient-to-r from-green-500 to-green-800 px-6 py-2.5 font-semibold text-white transition-all duration-300 hover:shadow-md hover:shadow-green-500/20 md:hover:-translate-y-1 md:hover:scale-105 md:hover:from-green-600 md:hover:to-green-900 md:hover:shadow-lg md:hover:shadow-green-500/30"
        >
          Deposit
        </button>

        <button
          onClick={onWithdraw}
          className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-800 px-6 py-2.5 font-semibold text-white transition-all duration-300 hover:shadow-md hover:shadow-orange-500/20 md:hover:-translate-y-1 md:hover:scale-105 md:hover:from-orange-600 md:hover:to-orange-900 md:hover:shadow-lg md:hover:shadow-orange-500/30"
        >
          Withdraw
        </button>
      </div>
    </section>
  );
};
export default WalletAction;
