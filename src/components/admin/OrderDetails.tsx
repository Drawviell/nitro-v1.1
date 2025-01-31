import { useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Mock data - in a real app, this would come from an API
const mockOrderDetails = {
  id: "O001",
  dealer: "ABC Trailers",
  model: "Nitro 24ft",
  status: "In Production",
  date: "2024-03-15",
  customerName: "John Doe",
  customerEmail: "john@example.com",
  shippingAddress: {
    street: "123 Main St",
    city: "Springfield",
    state: "IL",
    zipCode: "62701"
  },
  specifications: {
    length: "24ft",
    width: "8.5ft",
    height: "7ft",
    axles: 2,
    color: "Black",
  },
  timeline: [
    { date: "2024-03-15", status: "Order Placed" },
    { date: "2024-03-16", status: "Processing" },
    { date: "2024-03-18", status: "In Production" },
  ],
  pricing: {
    subtotal: 16600,
    shipping: 800,
    tax: 1328,
    total: 18728,
  }
};

const orderStatuses = ["Processing", "In Production", "Shipped", "Delivered"];

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStatusChange = (newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Order ${id} status changed to ${newStatus}`,
    });
  };

  return (
    <Layout userRole="admin" userName="Admin User" companyName="Nitro Trailers">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Order Details - {id}</h1>
          <Button variant="outline" onClick={() => navigate("/admin/orders")}>
            Back to Orders
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Dealer</p>
                  <p>{mockOrderDetails.dealer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p>{mockOrderDetails.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customer</p>
                  <p>{mockOrderDetails.customerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{mockOrderDetails.customerEmail}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Select
                    defaultValue={mockOrderDetails.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>{mockOrderDetails.status}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {orderStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>{mockOrderDetails.shippingAddress.street}</p>
                <p>
                  {mockOrderDetails.shippingAddress.city}, {mockOrderDetails.shippingAddress.state} {mockOrderDetails.shippingAddress.zipCode}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrderDetails.timeline.map((event, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{event.status}</span>
                    <span className="text-muted-foreground">{event.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${mockOrderDetails.pricing.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${mockOrderDetails.pricing.shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${mockOrderDetails.pricing.tax}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${mockOrderDetails.pricing.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;
