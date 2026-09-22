import { Link } from "react-router-dom";

interface SidebarProps {
  isMenuOpen: boolean;
  onMenuClose: () => void;
}

function Sidebar({ isMenuOpen, onMenuClose }: SidebarProps) {
  return (
    <aside
      className={`
        sticky top-[76px]
        h-[calc(100vh-76px)] w-[255px] min-w-[255px]
        overflow-y-auto
        border-r border-white/5
        bg-gradient-to-b from-[#111827] via-[#171d36] to-[#1e1b4b]
        px-[15px] py-7
        shadow-[8px_0_30px_rgba(15,23,42,0.08)]
        max-[1200px]:w-[225px] max-[1200px]:min-w-[225px]
        max-[850px]:w-[205px] max-[850px]:min-w-[205px]
        max-[650px]:fixed max-[650px]:right-0 max-[650px]:top-[65px]
        max-[650px]:z-[99] max-[650px]:h-[calc(100vh-65px)]
        max-[650px]:w-[250px] max-[650px]:min-w-[250px]
        max-[650px]:translate-x-full
        max-[650px]:transition-transform max-[650px]:duration-300
        max-[650px]:ease-in-out
        ${isMenuOpen ? "max-[650px]:translate-x-0" : ""}
        max-[400px]:w-[220px] max-[400px]:min-w-[220px]
      `}
    >
      <div
        className="
          block px-[15px] pb-[30px]
          text-[15px] font-extrabold tracking-[2px] text-[#818cf8]
        "
      >
        ONECLOUD
      </div>

      <nav className="flex flex-col gap-[7px]">
        <Link
          to="/dashboard"
          onClick={onMenuClose}
          className="
            group relative flex min-h-12 items-center rounded-[11px]
            px-4 text-[15px] font-semibold text-[#a8b1c4]
            transition-all duration-200
            hover:translate-x-[3px] hover:bg-gradient-to-r
            hover:from-[rgba(79,70,229,0.28)] hover:to-[rgba(99,102,241,0.12)]
            hover:text-white
            max-[400px]:min-h-[44px] max-[400px]:text-[14px]
          "
        >
          <span
            className="
              mr-3 h-[7px] w-[7px] rounded-full bg-[#64748b]
              transition-all duration-200
              group-hover:bg-[#818cf8]
              group-hover:shadow-[0_0_10px_rgba(129,140,248,0.8)]
            "
          />
          Dashboard
        </Link>

        <Link
          to="/employees"
          onClick={onMenuClose}
          className="
            group relative flex min-h-12 items-center rounded-[11px]
            px-4 text-[15px] font-semibold text-[#a8b1c4]
            transition-all duration-200
            hover:translate-x-[3px] hover:bg-gradient-to-r
            hover:from-[rgba(79,70,229,0.28)] hover:to-[rgba(99,102,241,0.12)]
            hover:text-white
            max-[400px]:min-h-[44px] max-[400px]:text-[14px]
          "
        >
          <span
            className="
              mr-3 h-[7px] w-[7px] rounded-full bg-[#64748b]
              transition-all duration-200
              group-hover:bg-[#818cf8]
              group-hover:shadow-[0_0_10px_rgba(129,140,248,0.8)]
            "
          />
          Employees
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
