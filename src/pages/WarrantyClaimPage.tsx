import { Layout } from "@/components/Layout";
    import { WarrantyClaimForm } from "@/components/dealer/WarrantyClaimForm";

    function WarrantyClaimPage() {
      return (
        <Layout userRole="dealer" userName="Dealer User" companyName="Nitro Trailers">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">New Warranty Claim</h1>
            <WarrantyClaimForm />
          </div>
        </Layout>
      );
    }

    export { WarrantyClaimPage as default };
