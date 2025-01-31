import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download } from "lucide-react";

const orders = [
  {
    id: "ORD-2024-001",
    dealer: "ABC Trailers",
    date: "2024-03-15",
    status: "Processing",
    total: "$45,000",
  },
  {
    id: "ORD-2024-002",
    dealer: "XYZ Motors",
    date: "2024-03-14",
    status: "Completed",
    total: "$32,000",
  },
  {
    id: "ORD-2024-003",
    dealer: "123 Trailer Sales",
    date: "2024-03-13",
    status: "Pending",
    total: "$28,500",
  },
];

export default function Orders() {
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500";
      case "processing":
        return "bg-blue-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleViewOrder = (orderId: string) => {
    toast({
      title: "Viewing Order",
      description: `Opening order details for ${orderId}`,
    });
  };

  const handleDownloadInvoice = (orderId: string) => {
    toast({
      title: "Downloading Invoice",
      description: `Preparing invoice download for ${orderId}`,
    });
  };

  return (
    <Layout userRole="sales" userName="Sales User" companyName="Nitro Trailers">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">Orders Portal</h1>
        
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Dealer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.dealer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewOrder(order.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadInvoice(order.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </Layout>
  );
}
