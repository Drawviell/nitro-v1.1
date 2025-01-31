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
const mockWarrantyDetails = {
  id: "W001",
  dealer: "ABC Trailers",
  customerName: "John Doe",
  customerEmail: "john@example.com",
  trailerModel: "Nitro 24ft",
  serialNumber: "NT24-2024-001",
  purchaseDate: "2023-09-15",
  claimDate: "2024-03-15",
  status: "Under Review",
  issue: {
    category: "Axle Issue",
    description: "Customer reported unusual noise from the right axle during towing.",
    photos: ["photo1.jpg", "photo2.jpg"],
  },
  timeline: [
    { date: "2024-03-15", status: "Claim Submitted" },
    { date: "2024-03-16", status: "Documentation Received" },
    { date: "2024-03-18", status: "Under Review" },
  ],
  estimatedCost: 450
};

const warrantyStatuses = ["Pending", "Under Review", "Approved", "Rejected"];

const WarrantyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStatusChange = (newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Warranty claim ${id} status changed to ${newStatus}`,
    });
  };

  return (
    <Layout userRole="admin" userName="Admin User" companyName="Nitro Trailers">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Warranty Claim Details - {id}</h1>
          <Button variant="outline" onClick={() => navigate("/admin/warranty")}>
            Back to Warranty Claims
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
                  <p>{mockWarrantyDetails.dealer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Claim Date</p>
                  <p>{mockWarrantyDetails.claimDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customer</p>
                  <p>{mockWarrantyDetails.customerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{mockWarrantyDetails.customerEmail}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Select
                    defaultValue={mockWarrantyDetails.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>{mockWarrantyDetails.status}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {warrantyStatuses.map((status) => (
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
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Model</p>
                  <p>{mockWarrantyDetails.trailerModel}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Serial Number</p>
                  <p>{mockWarrantyDetails.serialNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Purchase Date</p>
                  <p>{mockWarrantyDetails.purchaseDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estimated Cost</p>
                  <p>${mockWarrantyDetails.estimatedCost}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Issue Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <p>{mockWarrantyDetails.issue.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                  <p>{mockWarrantyDetails.issue.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Photos</p>
                  <div className="flex gap-2 mt-2">
                    {mockWarrantyDetails.issue.photos.map((photo, index) => (
                      <div key={index} className="bg-muted p-2 rounded">
                        Photo {index + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Claim Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockWarrantyDetails.timeline.map((event, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{event.status}</span>
                    <span className="text-muted-foreground">{event.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default WarrantyDetails;
