interface HeaderProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
  isSidebarCollapsed: boolean;
}

function Header({ onMenuClick, isMenuOpen, isSidebarCollapsed }: HeaderProps) {
  return (
    <header className={`fixed right-0 top-0 z-[100] ${isSidebarCollapsed ? "left-[78px]" : "left-[255px] max-[1200px]:left-[225px]"} max-[850px]:left-0 hidden h-[88px] items-center justify-end border-b border-[#dce4f2] bg-gradient-to-br from-[#f6f6fd] via-[#bed0fc] to-[#b8c8fa] px-[34px] shadow-[0_5px_25px_rgba(15,23,42,0.06)] backdrop-blur-[15px] min-[851px]:flex max-[850px]:sticky max-[850px]:flex max-[850px]:h-[65px] max-[850px]:justify-between max-[850px]:px-4 max-[400px]:px-3`}>
      <div className="flex items-center gap-4 max-[850px]:order-2">
        <div className="text-right leading-tight">
          <p className="text-[20px] font-extrabold tracking-[-0.5px] text-slate-950">
            Super Administrator
          </p>
          <p className="mt-1 text-[14px] font-medium text-slate-600">
            Global access
          </p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[18px] font-extrabold text-slate-800 shadow-sm">
          SA
        </div>
      </div>

      <button
        className="flex h-10 w-10 items-center justify-center rounded-[10px] border-0 bg-white/55 p-0 text-[22px] font-bold text-[#312e81] transition-all duration-200 hover:scale-[1.04] hover:bg-white/80 max-[400px]:h-9 max-[400px]:w-9 max-[400px]:text-[20px] min-[851px]:hidden max-[850px]:order-1"
        onClick={onMenuClick}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>
      
    </header>
  );
}

export default Header;
