import { useState, type ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen((previous) => !previous);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div
      className="
        min-h-screen min-w-[320px]
        bg-[#f4f7fb] text-[#172033]
        antialiased
        bg-[radial-gradient(circle_at_85%_5%,rgba(99,102,241,0.13),transparent_24%),radial-gradient(circle_at_10%_90%,rgba(14,165,233,0.08),transparent_25%)]
      "
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      <Header
        onMenuClick={handleMenuClick}
        isMenuOpen={isMenuOpen}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      <Sidebar
        isMenuOpen={isMenuOpen}
        onMenuClose={handleMenuClose}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((previous) => !previous)}
      />

      {isMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={handleMenuClose}
          className="fixed inset-0 top-[65px] z-[105] hidden bg-slate-950/30 backdrop-blur-[1px] max-[850px]:block"
        />
      )}

      <main
        className={`
  relative z-0 min-w-0 min-h-screen overflow-x-hidden p-9 pt-[120px]
  transition-[margin] duration-200
  ${isSidebarCollapsed ? "ml-[78px]" : "ml-[255px] max-[1200px]:ml-[225px]"}
  max-[1200px]:px-7 max-[1200px]:pb-7
  max-[850px]:ml-0 max-[850px]:px-[18px] max-[850px]:pt-[24px] max-[850px]:pb-[24px]
  max-[650px]:px-[14px] max-[650px]:pt-[20px] max-[650px]:pb-[20px]
  max-[400px]:px-[11px] max-[400px]:pt-[16px] max-[400px]:pb-[16px]
`}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;
