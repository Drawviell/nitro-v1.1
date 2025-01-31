import { Layout } from "@/components/Layout";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Button } from "@/components/ui/button";
    import { Plus } from "lucide-react";

    export default function SalesTeam() {
      return (
        <Layout userRole="admin" userName="Admin User" companyName="Nitro Trailers">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold tracking-tight">Sales Team Management</h1>
              <Button className="bg-nitro-red hover:bg-nitro-red/90">
                <Plus className="mr-2 h-4 w-4" /> Add Salesperson
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Sales Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Coming soon.
                </p>
              </CardContent>
            </Card>
          </div>
        </Layout>
      );
    }
