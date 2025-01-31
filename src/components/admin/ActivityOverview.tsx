import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockQuotes = [
  { id: "Q001", dealer: "ABC Trailers", model: "Nitro 24ft", status: "Pending", date: "2024-03-15" },
  { id: "Q002", dealer: "XYZ Motors", model: "Nitro 16ft", status: "Approved", date: "2024-03-14" },
  { id: "Q003", dealer: "123 Trailers", model: "Nitro 20ft", status: "Pending", date: "2024-03-13" },
];

const mockOrders = [
  { id: "O001", dealer: "ABC Trailers", model: "Nitro 24ft", status: "In Production", date: "2024-03-15" },
  { id: "O002", dealer: "XYZ Motors", model: "Nitro 16ft", status: "Shipped", date: "2024-03-14" },
  { id: "O003", dealer: "123 Trailers", model: "Nitro 20ft", status: "Processing", date: "2024-03-13" },
];

const mockWarrantyClaims = [
  { id: "W001", dealer: "ABC Trailers", issue: "Axle Issue", status: "Under Review", date: "2024-03-15" },
  { id: "W002", dealer: "XYZ Motors", issue: "Paint Defect", status: "Approved", date: "2024-03-14" },
  { id: "W003", dealer: "123 Trailers", issue: "Door Latch", status: "Pending", date: "2024-03-13" },
];

const quoteStatuses = ["Pending", "Approved", "Rejected"];
const orderStatuses = ["Processing", "In Production", "Shipped", "Delivered"];
const warrantyStatuses = ["Pending", "Under Review", "Approved", "Rejected"];

export const ActivityOverview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStatusChange = (id: string, newStatus: string, type: 'quote' | 'order' | 'warranty') => {
    toast({
      title: "Status Updated",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} ${id} status changed to ${newStatus}`,
    });
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Active Quotes</CardTitle>
          <Button variant="outline" size="sm" onClick={() => navigate('/admin/quotes')}>
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quote ID</TableHead>
                <TableHead>Dealer</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockQuotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell>{quote.id}</TableCell>
                  <TableCell>{quote.dealer}</TableCell>
                  <TableCell>{quote.model}</TableCell>
                  <TableCell>
                    <Select
                      defaultValue={quote.status}
                      onValueChange={(value) => handleStatusChange(quote.id, value, 'quote')}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue>{quote.status}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {quoteStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{quote.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/admin/quotes/${quote.id}`)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Button variant="outline" size="sm" onClick={() => navigate('/admin/orders')}>
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Dealer</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.dealer}</TableCell>
                  <TableCell>{order.model}</TableCell>
                  <TableCell>
                    <Select
                      defaultValue={order.status}
                      onValueChange={(value) => handleStatusChange(order.id, value, 'order')}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue>{order.status}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {orderStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Warranty Claims</CardTitle>
          <Button variant="outline" size="sm" onClick={() => navigate('/admin/warranty')}>
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim ID</TableHead>
                <TableHead>Dealer</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockWarrantyClaims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell>{claim.id}</TableCell>
                  <TableCell>{claim.dealer}</TableCell>
                  <TableCell>{claim.issue}</TableCell>
                  <TableCell>
                    <Select
                      defaultValue={claim.status}
                      onValueChange={(value) => handleStatusChange(claim.id, value, 'warranty')}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue>{claim.status}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {warrantyStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{claim.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/admin/warranty/${claim.id}`)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityOverview;
