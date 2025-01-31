import { Layout } from "@/components/Layout";
    import MinimalTestComponent from "@/components/MinimalTestComponent";

    export default function TestPage() {
      return (
        <Layout userRole="admin" userName="Admin User" companyName="Nitro Trailers">
          <MinimalTestComponent />
        </Layout>
      );
    }
