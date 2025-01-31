import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  userRole?: "dealer" | "sales" | "admin";
  userName?: string;
  companyName?: string;
}

export function Header({ userRole = "dealer", userName = "User", companyName = "ABC Trailers" }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="border-b">
      <div className="flex h-40 items-center px-4">
        <img
          src="/lovable-uploads/1e4ee4b3-9fe0-4281-b57a-6da49eb06b09.png"
          alt="Nitro Trailer Logo"
          className="h-36 mr-6"
        />
        <div className="ml-auto flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            {userName} - {companyName}
          </div>
          <Button
            variant="destructive"
            onClick={() => navigate("/login")}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
