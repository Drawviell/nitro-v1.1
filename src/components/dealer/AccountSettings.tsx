import { useState } from "react";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { Button } from "@/components/ui/button";
    import { useToast } from "@/components/ui/use-toast";
    import { Upload } from "lucide-react";

    interface DealerSettings {
      companyName: string;
      address: string;
      phone: string;
      email: string;
      salesTaxRate: number;
      markupPercentage: number;
      logo?: string;
    }

    export function AccountSettings() {
      const { toast } = useToast();
      const [settings, setSettings] = useState<DealerSettings>({
        companyName: "ABC Trailers",
        address: "123 Dealer St",
        phone: "(555) 555-5555",
        email: "contact@abctrailers.com",
        salesTaxRate: 8.25,
        markupPercentage: 15,
      });

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({
          ...prev,
          [name]: value,
        }));
      };

      const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSettings(prev => ({
              ...prev,
              logo: reader.result as string,
            }));
          };
          reader.readAsDataURL(file);
        }
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically save to backend
        toast({
          title: "Settings Updated",
          description: "Your account settings have been saved successfully.",
        });
      };

      return (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={settings.companyName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={settings.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={settings.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={settings.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quote Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="salesTaxRate">Sales Tax Rate (%)</Label>
                  <Input
                    id="salesTaxRate"
                    name="salesTaxRate"
                    type="number"
                    step="0.01"
                    value={settings.salesTaxRate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="markupPercentage">Markup Percentage (%)</Label>
                  <Input
                    id="markupPercentage"
                    name="markupPercentage"
                    type="number"
                    step="0.1"
                    value={settings.markupPercentage}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Company Logo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {settings.logo && (
                  <img
                    src={settings.logo}
                    alt="Company Logo"
                    className="h-32 object-contain"
                  />
                )}
                <div className="grid gap-2">
                  <Label htmlFor="logo">Upload Logo</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("logo")?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Choose Logo
                    </Button>
                    {settings.logo && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => setSettings(prev => ({ ...prev, logo: undefined }))}
                      >
                        Remove Logo
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="w-full sm:w-auto">
              Save Changes
            </Button>
          </div>
        </form>
      );
    }
