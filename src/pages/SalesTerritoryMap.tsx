import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

// Simulated data with assigned territories
const assignedRegions = {
  Canada: [
    { name: "Ontario", dealers: 2 },
    { name: "Maritimes", dealers: 3 },
  ],
  US: [
    { name: "Maine", dealers: 1 },
    { name: "New Hampshire", dealers: 2 },
    { name: "Massachusetts", dealers: 3 },
    { name: "Connecticut", dealers: 2 },
    { name: "New York", dealers: 4 },
    { name: "Pennsylvania", dealers: 3 },
  ]
};

export default function SalesTerritoryMap() {
  return (
    <Layout userRole="sales" userName="Sales User" companyName="Nitro Trailers">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">My Territory</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Territory List Sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>My Regions</CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search regions..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Canada Regions */}
              <div>
                <h3 className="font-semibold mb-2 text-lg">Canada</h3>
                <div className="space-y-2">
                  {assignedRegions.Canada.map((region) => (
                    <div
                      key={region.name}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer"
                    >
                      <div>
                        <p className="font-medium">{region.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {region.dealers} Dealers
                        </p>
                      </div>
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>

              {/* US Regions */}
              <div>
                <h3 className="font-semibold mb-2 text-lg">United States</h3>
                <div className="space-y-2">
                  {assignedRegions.US.map((region) => (
                    <div
                      key={region.name}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer"
                    >
                      <div>
                        <p className="font-medium">{region.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {region.dealers} Dealers
                        </p>
                      </div>
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map View */}
          <Card className="lg:col-span-3">
            <CardContent className="p-0">
              <div className="relative w-full h-[600px] bg-accent/10 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-lg font-medium">Map Coming Soon</p>
                    <p className="text-sm text-muted-foreground">
                      Google Maps integration will be implemented here
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
