import { Layout } from "@/components/Layout";
import OrdersAnalytics from "@/components/orders/OrdersAnalytics";

export default function Analytics() {
  return (
    <Layout userRole="sales" userName="Sales User" companyName="Nitro Trailers">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">Sales Analytics</h1>
        <OrdersAnalytics />
      </div>
    </Layout>
  );
}
