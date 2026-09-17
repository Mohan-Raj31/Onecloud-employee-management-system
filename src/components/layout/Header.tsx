interface HeaderProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
}

function Header({ onMenuClick, isMenuOpen }: HeaderProps) {
  return (
    <header className="header">
      <h2>OneCloud Admin ▼</h2>

      <button
        className="menu-button"
        onClick={onMenuClick}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>
    </header>
  );
}

export default Header;
