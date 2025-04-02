interface WalletActionProps {
  children: React.ReactNode;
}

const WalletActionsRow = ({ children }: WalletActionProps) => {
  return (
    <>
      <section className="w-full px-4 py-3 md:py-5">
        <div className="mx-auto flex max-w-7xl justify-center gap-4 md:gap-8">{children}</div>
      </section>
    </>
  );
};

export default WalletActionsRow;
