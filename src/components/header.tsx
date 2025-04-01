interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

const Header = ({ title, children }: HeaderProps) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900 shadow-md">
      {/* content container */}
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <h1 className="text-xl font-medium tracking-tight text-white">{title}</h1>
        {children}
      </div>
    </header>
  );
};
export default Header;
