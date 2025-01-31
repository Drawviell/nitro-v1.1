import { Layout } from "@/components/Layout";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Button } from "@/components/ui/button";
    import { useNavigate } from "react-router-dom";
    import { ActivityOverview } from "@/components/admin/ActivityOverview";
    import {
      Users,
      UserPlus,
      MapPin,
      FileText,
      Truck,
      Package,
      Upload,
      Settings,
    } from "lucide-react";

    const dealerMetrics = [
      { title: "Total Dealers", value: "245", icon: Users, description: "Active dealers across all territories" },
      { title: "New Dealers", value: "12", icon: UserPlus, description: "Added this month" },
      { title: "Territories", value: "35", icon: MapPin, description: "Active dealer territories" },
      { title: "Pending Approvals", value: "8", icon: FileText, description: "Dealer applications pending review" },
    ];

    const AdminDashboard = () => {
      const navigate = useNavigate();

      return (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {dealerMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button 
              variant="outline" 
              className="h-24 flex-col space-y-2"
              onClick={() => navigate('/trailer-models')}
            >
              <Truck className="h-6 w-6" />
              <span>Manage Trailer Models</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex-col space-y-2"
              onClick={() => navigate('/parts-catalog')}
            >
              <Package className="h-6 w-6" />
              <span>Update Parts Catalog</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex-col space-y-2"
              onClick={() => navigate('/resources')}
            >
              <Upload className="h-6 w-6" />
              <span>Upload Resources</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex-col space-y-2"
              onClick={() => navigate('/admin')}
            >
              <Settings className="h-6 w-6" />
              <span>System Settings</span>
            </Button>
          </div>

          <ActivityOverview />
        </div>
      );
    };

    const Index = () => {
      const navigate = useNavigate();
      return (
        <Layout userRole="admin" userName="Admin User" companyName="Nitro Trailers">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <Button onClick={() => navigate("/sales")}>
                Go to Sales Dashboard
              </Button>
            </div>
            <AdminDashboard />
          </div>
        </Layout>
      );
    };

    export default Index;
