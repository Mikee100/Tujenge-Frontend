import { Link, Outlet, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/dashboard/member", label: "Home" },
  { to: "/dashboard/member/contributions", label: "Contributions" },
  { to: "/dashboard/member/loans", label: "Loans" },
  { to: "/dashboard/member/vaults", label: "Vaults" },
  { to: "/dashboard/member/chat", label: "Announcements" },
  { to: "/dashboard/member/payment", label: "Payment" },
  
];

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-100 pt-10">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-green-800">Tujenge</h2>
          <p className="text-sm text-gray-500 mt-2">Member Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-4 py-2 rounded transition ${
                location.pathname === link.to
                  ? "bg-green-100 text-green-800 font-semibold"
                  : "text-gray-700 hover:bg-green-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Tujenge
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex justify-center items-start p-8">
        <div className="w-full max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
} 