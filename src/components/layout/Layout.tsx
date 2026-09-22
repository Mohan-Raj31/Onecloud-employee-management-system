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
      />

      <div
        className="
          flex min-h-[calc(100vh-76px)]
          max-[650px]:block max-[650px]:min-h-[calc(100vh-65px)]
        "
      >
        <Sidebar
          isMenuOpen={isMenuOpen}
          onMenuClose={handleMenuClose}
        />

        <main
          className="
            min-w-0 flex-1 overflow-x-hidden p-9
            max-[1200px]:p-7
            max-[850px]:p-6
            max-[650px]:p-[20px_14px]
            max-[400px]:p-[16px_11px]
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
