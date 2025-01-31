import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/Layout";
import { QuoteBuilder } from "@/components/dealer/QuoteBuilder";
import { CurrentStock } from "@/components/dealer/CurrentStock";
import { Resources } from "@/components/dealer/Resources";
import { Parts } from "@/components/dealer/Parts";
import { AccountSettings } from "@/components/dealer/AccountSettings";
import { useState } from "react";

export default function DealerDashboard() {
  const [activeTab, setActiveTab] = useState("quotes");

  return (
    <Layout userRole="dealer" userName="John Smith" companyName="ABC Trailers">
      <div className="space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Dealer Dashboard</h2>
        <Tabs defaultValue={activeTab} className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="quotes">Quote Builder</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="parts">Parts</TabsTrigger>
            <TabsTrigger value="stock">Current Stock</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="quotes">
            <QuoteBuilder />
          </TabsContent>

          <TabsContent value="orders">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Orders</h3>
              <p className="text-muted-foreground">View and manage your orders.</p>
            </div>
          </TabsContent>

          <TabsContent value="parts">
            <Parts />
          </TabsContent>

          <TabsContent value="stock">
            <CurrentStock />
          </TabsContent>

          <TabsContent value="resources">
            <Resources />
          </TabsContent>

          <TabsContent value="account">
            <AccountSettings />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
