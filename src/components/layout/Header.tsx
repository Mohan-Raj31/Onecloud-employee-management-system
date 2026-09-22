interface HeaderProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
}

function Header({ onMenuClick, isMenuOpen }: HeaderProps) {
  return (
    <header
      className="
        sticky top-0 z-[100]
        flex h-[76px] items-center justify-between
        border-b border-[#e4e8f0]
        bg-gradient-to-br from-[#f6f6fd] via-[#bed0fc] to-[#b8c8fa]
        px-[34px]
        shadow-[0_5px_25px_rgba(15,23,42,0.06)]
        backdrop-blur-[15px]
        max-[650px]:h-[65px] max-[650px]:px-4
        max-[400px]:px-3
      "
    >
      <h2
        className="
          relative text-[21px] font-extrabold tracking-[-0.6px]
          bg-gradient-to-r from-[#312e81] via-[#4f46e5] to-[#7c3aed]
          bg-clip-text text-transparent
          after:mt-[6px] after:block after:h-[3px] after:w-[38px]
          after:rounded-[10px]
          after:bg-gradient-to-r after:from-[#4f46e5] after:to-[#8b5cf6]
          max-[650px]:text-[17px]
          max-[400px]:text-[16px]
        "
      >
        OneCloud Admin ▼
      </h2>

      <button
        className="
          hidden h-10 w-10 items-center justify-center
          rounded-[10px] border-0 bg-white/55 p-0
          text-[22px] font-bold text-[#312e81]
          transition-all duration-200
          hover:scale-[1.04] hover:bg-white/80
          max-[650px]:flex
          max-[400px]:h-9 max-[400px]:w-9 max-[400px]:text-[20px]
        "
        onClick={onMenuClick}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>
    </header>
  );
}

export default Header;
