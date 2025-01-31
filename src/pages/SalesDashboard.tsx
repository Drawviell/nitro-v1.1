import { Layout } from "@/components/Layout";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import {
      Users,
      ShoppingCart,
      FileText,
      Truck,
      Map,
      BarChart3,
      Building2,
      Phone,
    } from "lucide-react";
    import { Button } from "@/components/ui/button";
    import { useNavigate } from "react-router-dom";

    const salesMetrics = [
      { title: "Active Dealers", value: "156", icon: Users, description: "Currently managed dealers" },
      { title: "Open Leads", value: "28", icon: Phone, description: "Leads requiring follow-up" },
      { title: "Pending Quotes", value: "12", icon: FileText, description: "Quotes awaiting response" },
      { title: "Active Orders", value: "34", icon: ShoppingCart, description: "Orders in progress" },
    ];

    const SalesDashboard = () => {
      const navigate = useNavigate();

      return (
        <Layout userRole="sales" userName="Sales User" companyName="Nitro Trailers">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold tracking-tight">Sales Dashboard</h1>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/dealer-crm")}
                >
                  View All Dealers
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate("/lead-management")}
                >
                  Manage Leads
                </Button>
                <Button variant="outline" onClick={() => navigate("/admin")}>
                  Back to Admin Dashboard
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {salesMetrics.map((metric, index) => (
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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-24 flex flex-col gap-2"
                      onClick={() => navigate("/dealer-crm")}
                    >
                      <Building2 className="h-6 w-6" />
                      Dealer CRM
                    </Button>
                    <Button
                      variant="outline"
                      className="h-24 flex flex-col gap-2"
                      onClick={() => navigate("/territory-map")}
                    >
                      <Map className="h-6 w-6" />
                      Territory Map
                    </Button>
                    <Button
                      variant="outline"
                      className="h-24 flex flex-col gap-2"
                      onClick={() => navigate("/quotes")}
                    >
                      <FileText className="h-6 w-6" />
                      Create Quote
                    </Button>
                    <Button
                      variant="outline"
                      className="h-24 flex flex-col gap-2"
                      onClick={() => navigate("/orders")}
                    >
                      <Truck className="h-6 w-6" />
                      View Orders
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">New Lead</span>
                      <span className="text-sm">2 hours ago</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Quote Sent</span>
                      <span className="text-sm">5 hours ago</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Order Confirmed</span>
                      <span className="text-sm">Yesterday</span>
                    </div>
                    <Button
                      className="w-full mt-4"
                      variant="outline"
                      onClick={() => navigate("/analytics")}
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Layout>
      );
    };

    export default SalesDashboard;
