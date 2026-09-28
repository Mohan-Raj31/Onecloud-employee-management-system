import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isMenuOpen: boolean;
  onMenuClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

type IconName = "dashboard" | "employees" | "tenants";

function Sidebar({ isMenuOpen, onMenuClose, isCollapsed, onToggleCollapse }: SidebarProps) {
  const location = useLocation();

  const items = [
    { to: "/dashboard", label: "Dashboard", icon: "dashboard" as const, active: location.pathname === "/dashboard" || location.pathname === "/" },
    { to: "/employees", label: "Employees", icon: "employees" as const, active: location.pathname.startsWith("/employees") },
    { to: "/tenants", label: "Tenant Management", icon: "tenants" as const, active: location.pathname.startsWith("/tenants") },
  ];

  return (
    <aside
      className={`
        fixed left-0 top-0 z-[110] flex h-screen flex-col
        overflow-y-auto border-r border-white/5
        bg-gradient-to-b from-[#080b12] via-[#171d36] to-[#1e1b4b]
        shadow-[8px_0_30px_rgba(15,23,42,0.08)]
        transition-[width,transform] duration-200
        ${isCollapsed ? "w-[78px] min-w-[78px]" : "w-[255px] min-w-[255px] max-[1200px]:w-[225px] max-[1200px]:min-w-[225px]"}
        max-[850px]:fixed max-[850px]:right-0 max-[850px]:left-auto max-[850px]:top-[65px]
        max-[850px]:z-[120] max-[850px]:h-[calc(100vh-65px)]
        max-[850px]:w-[260px] max-[850px]:min-w-[260px]
        max-[850px]:px-[15px]
        ${isMenuOpen ? "max-[850px]:translate-x-0 max-[850px]:visible" : "max-[850px]:translate-x-full max-[850px]:invisible"}
        max-[400px]:w-[220px] max-[400px]:min-w-[220px]
      `}
    >
      <div className={`flex h-[88px] shrink-0 items-center border-b border-white/20 max-[850px]:hidden ${isCollapsed ? "justify-center px-2" : "justify-between px-[15px]"}`}>
        <div className={`${isCollapsed ? "hidden" : "block"}`}>
          <p className="text-[21px] font-extrabold tracking-[-0.6px] bg-gradient-to-r from-[#f8fafc] via-[#c7d2fe] to-[#a5b4fc] bg-clip-text text-transparent whitespace-nowrap">
            OneCloud Admin
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="hidden h-10 w-11 shrink-0 items-center justify-center rounded-[15px] border-0 bg-slate-800/70 text-lg font-bold text-white transition-all duration-200 hover:bg-slate-600/80 max-[850px]:hidden min-[851px]:flex"
        >
          {isCollapsed ? "›" : "‹"}
        </button>
      </div>

      <nav className={`mt-5 flex flex-col gap-1 ${isCollapsed ? "px-2" : "px-[15px]"}`}>
        {items.map((item) => (
          <NavItem
            key={item.to}
            {...item}
            collapsed={isCollapsed}
            onClick={onMenuClose}
          />
        ))}
      </nav>
    </aside>
  );
}

function NavItem({
  to,
  label,
  icon,
  active,
  collapsed,
  onClick,
}: {
  to: string;
  label: string;
  icon: IconName;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      aria-label={collapsed ? label : undefined}
      title={collapsed ? label : undefined}
      className={`group relative flex min-h-11 items-center rounded-[11px] text-[14px] font-semibold transition-all duration-200 ${
        collapsed ? "justify-center px-2" : "px-4"
      } ${
        active
          ? "bg-gradient-to-r from-indigo-600/35 to-violet-500/15 text-white shadow-[inset_3px_0_0_#818cf8]"
          : "text-[#a8b1c4] hover:translate-x-[3px] hover:bg-gradient-to-r hover:from-[rgba(79,70,229,0.28)] hover:to-[rgba(99,102,241,0.12)] hover:text-white"
      }`}
    >
      <span className={`flex h-5 w-5 shrink-0 items-center justify-center ${collapsed ? "mr-0" : "mr-3"} ${active ? "text-[#a5b4fc]" : "text-[#94a3b8] group-hover:text-[#a5b4fc]"}`}>
        <SidebarIcon name={icon} />
      </span>
      {!collapsed && label}
    </Link>
  );
}

function SidebarIcon({ name }: { name: IconName }) {
  const common = "h-[18px] w-[18px]";

  if (name === "dashboard") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common} aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    );
  }

  if (name === "employees") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common} aria-hidden="true">
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 20c.5-3.2 2.4-5 5.5-5s5 1.8 5.5 5" />
        <path d="M15.5 5.5a3 3 0 0 1 0 5.8" />
        <path d="M16 15.5c2.6.2 4.2 1.7 4.5 4.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common} aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M8 4v16M3 9h18" />
      <path d="M12 13h5M12 16h3" />
    </svg>
  );
}

export default Sidebar;
