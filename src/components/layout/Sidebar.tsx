import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isMenuOpen: boolean;
  onMenuClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

type IconName =
  | "dashboard"
  | "employees"
  | "tenants"
  | "organizations"
  | "users"
  | "roles"
  | "permissions"
  | "data-permissions"
  | "platform-configuration"
  | "features-management"
  | "license-management"
  | "global-settings"
  | "audit-logs";

function Sidebar({
  isMenuOpen,
  onMenuClose,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const location = useLocation();

  const items = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: "dashboard" as const,
      active: location.pathname === "/dashboard" || location.pathname === "/",
    },
    {
      to: "/employees",
      label: "Employees",
      icon: "employees" as const,
      active: location.pathname.startsWith("/employees"),
    },
    {
      to: "/tenants",
      label: "Tenant Management",
      icon: "tenants" as const,
      active: location.pathname.startsWith("/tenants"),
    },
    {
      to: "/organizations",
      label: "Organizations",
      icon: "organizations" as const,
      active: location.pathname.startsWith("/organizations"),
    },
    {
      to: "/users",
      label: "Users Management",
      icon: "users" as const,
      active: location.pathname.startsWith("/users"),
    },
    {
      to: "/roles",
      label: "Roles Management",
      icon: "roles" as const,
      active: location.pathname.startsWith("/roles"),
    },
    {
      to: "/permissions",
      label: "Permissions",
      icon: "permissions" as const,
      active: location.pathname.startsWith("/permissions"),
    },
    {
      to: "/data-permissions",
      label: "Data Permissions",
      icon: "data-permissions" as const,
      active: location.pathname.startsWith("/data-permissions"),
    },
    {
      to: "/platform-configuration",
      label: "Platform Configuration",
      icon: "platform-configuration" as const,
      active: location.pathname.startsWith("/platform-configuration"),
    },
    {
      to: "/features-management",
      label: "Features Management",
      icon: "features-management" as const,
      active: location.pathname.startsWith("/features-management"),
    },
    {
      to: "/license-management",
      label: "License Management",
      icon: "license-management" as const,
      active: location.pathname.startsWith("/license-management"),
    },
    {
      to: "/global-settings",
      label: "Global Settings",
      icon: "global-settings" as const,
      active: location.pathname.startsWith("/global-settings"),
    },
    {
      to: "/audit-logs",
      label: "Audit Logs",
      icon: "audit-logs" as const,
      active: location.pathname.startsWith("/audit-logs"),
    },
  ];

  return (
    <aside
      className={`
        fixed left-0 top-0 z-[110] flex h-screen flex-col
        overflow-y-auto border-r border-white/5
        bg-gradient-to-b from-[#080b12] via-[#002D9E] to-[#061E5C]
        shadow-[8px_0_30px_rgba(15,23,42,0.08)]
        transition-transform duration-400 ease-in-out
        ${isCollapsed ? "w-[78px] min-w-[78px]" : "w-[255px] min-w-[255px] max-[1200px]:w-[225px] max-[1200px]:min-w-[225px]"}
        max-[850px]:fixed max-[850px]:left-0 max-[850px]:right-auto max-[850px]:top-[65px]
        max-[850px]:z-[120] max-[850px]:h-[calc(100vh-65px)]
        max-[850px]:w-[260px] max-[850px]:min-w-[260px]
        max-[850px]:px-[15px]
        ${isMenuOpen ? "max-[850px]:translate-x-0 max-[850px]:visible" : "max-[850px]:-translate-x-full max-[850px]:invisible"}
        max-[400px]:w-[220px] max-[400px]:min-w-[220px]
      `}
    >
      <div
        className={`flex h-[88px] shrink-0 items-center max-[850px]:hidden ${isCollapsed ? "justify-center px-2" : "justify-between px-[15px]"}`}
      >
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

      <nav
        className={`flex flex-col gap-0.5 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.3)] ${isCollapsed ? "px-2" : "px-[6px]"}`}
      >
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
          : "text-[#EDE1E1] hover:translate-x-[3px] hover:bg-gradient-to-r hover:from-[rgba(79,70,229,0.28)] hover:to-[rgba(99,102,241,0.12)] hover:text-white"
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center ${collapsed ? "mr-0" : "mr-3"} ${active ? "text-[#a5b4fc]" : "text-[#94a3b8] group-hover:text-[#a5b4fc]"}`}
      >
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
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={common}
        aria-hidden="true"
      >
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    );
  }

  if (name === "employees") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={common}
        aria-hidden="true"
      >
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 20c.5-3.2 2.4-5 5.5-5s5 1.8 5.5 5" />
        <path d="M15.5 5.5a3 3 0 0 1 0 5.8" />
        <path d="M16 15.5c2.6.2 4.2 1.7 4.5 4.5" />
      </svg>
    );
  }
  if (name === "organizations") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={common}
        aria-hidden="true"
      >
        <rect x="3" y="4" width="7" height="16" rx="1.5" />
        <rect x="14" y="8" width="7" height="12" rx="1.5" />
        <path d="M6 8h1M6 12h1M6 16h1M17 12h1M17 16h1" />
      </svg>
    );
  }

  if (name === "users") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={common}
        aria-hidden="true"
      >
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 20c.5-3.2 2.4-5 5.5-5s5 1.8 5.5 5" />
        <path d="M15.5 5.5a3 3 0 0 1 0 5.8" />
        <path d="M16 15.5c2.6.2 4.2 1.7 4.5 4.5" />
      </svg>
    );
  }

  if (name === "roles") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={common}
        aria-hidden="true"
      >
        <path d="M12 3l7 3v5c0 4.5-2.8 8-7 10-4.2-2-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  }

  if (name === "permissions") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={common}
        aria-hidden="true"
      >
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h5M8 16h8" />
        <path d="M16 12l1.5 1.5L20 11" />
      </svg>
    );
  }

  if (name === "data-permissions") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={common}
        aria-hidden="true"
      >
        <ellipse cx="12" cy="5" rx="7" ry="3" />
        <path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
        <path d="M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7" />
      </svg>
    );
  }

  if (name === "platform-configuration") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={common}
        aria-hidden="true"
      >
        <path d="M12 3v18" />
        <path d="M3 12h18" />
        <path d="M5.5 5.5h13v13h-13z" />
        <path d="M8.5 8.5h7v7h-7z" />
      </svg>
    );
  }

  if (name === "features-management") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={common}
        aria-hidden="true"
      >
        <path d="M12 3l1.4 4.3L18 8.7l-4.6 1.4L12 14.5l-1.4-4.4L6 8.7l4.6-1.4L12 3z" />
        <path d="M18.5 14l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3z" />
      </svg>
    );
  }

  if (name === "license-management") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={common}
        aria-hidden="true"
      >
        <rect x="4" y="3" width="16" height="18" rx="2" />

        <path d="M8 7h8" />
        <path d="M8 11h8" />
        <path d="M8 15h4" />
        <path d="M16 15h.01" />
      </svg>
    );
  }

  if (name === "global-settings") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={common}
        aria-hidden="true"
      >
        <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.72 1.72-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-2.44v-.18a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.72-1.72.06-.06A1.7 1.7 0 0 0 8.4 15a1.7 1.7 0 0 0-1.56-1.03H6v-2.44h.84A1.7 1.7 0 0 0 8.4 10a1.7 1.7 0 0 0-.34-1.88L8 8.06l1.72-1.72.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 12.69 5V4h2.44v1a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.72 1.72-.06.06A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.56 1.03H22v2.44h-1.04A1.7 1.7 0 0 0 19.4 15Z" />
      </svg>
    );
  }

  if (name === "audit-logs") {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={common}
      aria-hidden="true"
    >
      <path d="M8 3h8l4 4v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3z" />
      <path d="M15 3v5h5" />
      <path d="M8 12h8" />
      <path d="M8 16h5" />
      <circle cx="17" cy="17" r="3" />
      <path d="m19.2 19.2 1.3 1.3" />
    </svg>
  );
}

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={common}
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M8 4v16M3 9h18" />
      <path d="M12 13h5M12 16h3" />
    </svg>
  );
}

export default Sidebar;
