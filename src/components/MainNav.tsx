import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const navItems = {
  dealer: [
    { title: "Quote Builder", href: "/quote-builder" },
    { title: "Orders", href: "/orders" },
    { title: "Parts Ordering", href: "/parts" },
    { title: "Warranty Claims", href: "/warranty" },
    { title: "Current Stock", href: "/stock" },
    { title: "Resources", href: "/resources" },
    { title: "Account", href: "/account" },
  ],
  sales: [
    { title: "Dashboard", href: "/sales" },
    { title: "Dealer CRM", href: "/dealer-crm" },
    { title: "Lead Management", href: "/lead-management" },
    { title: "Territory Map", href: "/territory-map" },
    { title: "Quotes", href: "/quotes" },
    { title: "Orders", href: "/orders" },
    { title: "Analytics", href: "/analytics" },
  ],
  admin: [
    { title: "Dealers Management", href: "/dealer-management" },
    { title: "Sales Team", href: "/sales-team" },
    { title: "Parts Catalog", href: "/parts-catalog" },
    { title: "Trailer Models", href: "/trailer-models" },
    { title: "Warranty Claims", href: "/warranty" },
    { title: "Resources", href: "/resources" },
    { title: "Territory Map", href: "/admin/territory-map" },
  ],
};

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  userRole?: "dealer" | "sales" | "admin";
}

export function MainNav({ className, userRole = "dealer", ...props }: MainNavProps) {
  const location = useLocation();
  const items = navItems[userRole];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            location.pathname === item.href
              ? "text-nitro-red"
              : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
