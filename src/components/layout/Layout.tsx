import { useState, type ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen((previous) => !previous);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="dashboard">
      <Header
        onMenuClick={handleMenuClick}
        isMenuOpen={isMenuOpen}
      />

      <div className="dashboard-body">
        <Sidebar
          isMenuOpen={isMenuOpen}
          onMenuClose={handleMenuClose}
        />

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
