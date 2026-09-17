import { Link } from "react-router-dom";

interface SidebarProps {
  isMenuOpen: boolean;
  onMenuClose: () => void;
}

function Sidebar({ isMenuOpen, onMenuClose }: SidebarProps) {
  return (
    <aside className={`sidebar ${isMenuOpen ? "sidebar-open" : ""}`}>
      <nav>
        <Link to="/dashboard" onClick={onMenuClose}>
          Dashboard
        </Link>

        <Link to="/employees" onClick={onMenuClose}>
          Employees
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
