import { Header } from "./Header";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  userRole?: "dealer" | "sales" | "admin";
  userName?: string;
  companyName?: string;
}

const SalesNavItems = [
  { name: "Dashboard", path: "/sales" },
  { name: "Dealer CRM", path: "/dealer-crm" },
  { name: "Lead Management", path: "/lead-management" },
  { name: "Territory Map", path: "/territory-map" },
  { name: "Quotes", path: "/quotes" },
  { name: "Orders", path: "/orders" },
  { name: "Analytics", path: "/analytics" },
];

const AdminNavItems = [
  { name: "Dashboard", path: "/admin" },
  { name: "Dealer Management", path: "/dealer-management" },
  { name: "Sales Team", path: "/sales-team" },
  { name: "Parts Catalog", path: "/parts-catalog" },
  { name: "Trailer Models", path: "/trailer-models" },
  { name: "Resources", path: "/resources" },
  { name: "Territory Map", path: "/admin/territory-map" },
];

const DealerNavItems = [
  { name: "Dashboard", path: "/dealer" },
  { name: "Quote Builder", path: "/dealer/quotes" },
  { name: "Orders", path: "/dealer/orders" },
  { name: "Parts", path: "/dealer/parts" },
  { name: "Resources", path: "/dealer/resources" },
  { name: "Account", path: "/dealer/account" },
];

export function Layout({ children, userRole, userName, companyName }: LayoutProps) {
  const location = useLocation();
  const navItems = userRole === "admin" ? AdminNavItems : userRole === "sales" ? SalesNavItems : DealerNavItems;
  const bgColor = userRole === "admin" ? "bg-nitro-red" : "bg-blue-600";
  const hoverBgColor = userRole === "admin" ? "hover:bg-nitro-red/90" : "hover:bg-blue-700";

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} userName={userName} companyName={companyName} />
      <div className="border-b bg-white">
        <nav className="container mx-auto flex space-x-4 py-2 overflow-x-auto">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={location.pathname === item.path ? "default" : "ghost"}
                className={cn(
                  "px-4 whitespace-nowrap",
                  location.pathname === item.path && `${bgColor} ${hoverBgColor}`
                )}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
      <main className="container mx-auto py-6">
        {children}
      </main>
    </div>
  );
}
