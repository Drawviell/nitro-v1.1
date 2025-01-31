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
const mockQuoteDetails = {
  id: "Q001",
  dealer: "ABC Trailers",
  model: "Nitro 24ft",
  status: "Pending",
  date: "2024-03-15",
  customerName: "John Doe",
  customerEmail: "john@example.com",
  specifications: {
    length: "24ft",
    width: "8.5ft",
    height: "7ft",
    axles: 2,
    color: "Black",
  },
  options: [
    { name: "Electric Brakes", price: 800 },
    { name: "Side Door", price: 600 },
    { name: "Roof Vent", price: 200 },
  ],
  pricing: {
    basePrice: 15000,
    optionsTotal: 1600,
    subtotal: 16600,
    tax: 1328,
    total: 17928,
  }
};

const quoteStatuses = ["Pending", "Approved", "Rejected"];

export const QuoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStatusChange = (newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Quote ${id} status changed to ${newStatus}`,
    });
  };

  return (
    <Layout userRole="admin" userName="Admin User" companyName="Nitro Trailers">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Quote Details - {id}</h1>
          <Button variant="outline" onClick={() => navigate("/admin/quotes")}>
            Back to Quotes
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
                  <p>{mockQuoteDetails.dealer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p>{mockQuoteDetails.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customer</p>
                  <p>{mockQuoteDetails.customerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{mockQuoteDetails.customerEmail}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Select
                    defaultValue={mockQuoteDetails.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>{mockQuoteDetails.status}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {quoteStatuses.map((status) => (
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
              <CardTitle>Trailer Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(mockQuoteDetails.specifications).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-sm font-medium text-muted-foreground capitalize">{key}</p>
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selected Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockQuoteDetails.options.map((option, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{option.name}</span>
                    <span>${option.price}</span>
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
                  <span>Base Price</span>
                  <span>${mockQuoteDetails.pricing.basePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Options Total</span>
                  <span>${mockQuoteDetails.pricing.optionsTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${mockQuoteDetails.pricing.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${mockQuoteDetails.pricing.tax}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${mockQuoteDetails.pricing.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
