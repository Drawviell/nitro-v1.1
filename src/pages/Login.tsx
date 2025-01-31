import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Route to different dashboards based on email
    if (email === "admin@nitro.com") {
      navigate("/admin");
      toast.success("Welcome back, Admin!");
    } else if (email === "sales@nitro.com") {
      navigate("/sales");
      toast.success("Welcome back, Sales Representative!");
    } else if (email === "dealer@nitro.com") {
      navigate("/dealer");
      toast.success("Welcome back, Dealer!");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const quickLogin = (role: "dealer" | "sales" | "admin") => {
    const credentials = {
      dealer: { email: "dealer@nitro.com", password: "dealer123" },
      sales: { email: "sales@nitro.com", password: "sales123" },
      admin: { email: "admin@nitro.com", password: "admin123" },
    };

    setEmail(credentials[role].email);
    setPassword(credentials[role].password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-nitro-gray">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <img
            src="/lovable-uploads/1e4ee4b3-9fe0-4281-b57a-6da49eb06b09.png"
            alt="Nitro Trailer Logo"
            className="mx-auto h-48 mb-8"
          />
          <h2 className="text-2xl font-bold text-gray-900">
            Sign in to Nitro Portal
          </h2>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-nitro-red hover:bg-nitro-red/90">
            Sign in
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Quick access logins
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => quickLogin("dealer")}
            >
              Dealer Login
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => quickLogin("sales")}
            >
              Sales Login
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => quickLogin("admin")}
            >
              Admin Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
