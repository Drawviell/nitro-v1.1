import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, FileText, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for initial development
const mockQuotes = [
  {
    id: "Q-2024-001",
    dealerName: "ABC Trailers",
    customerName: "John Smith",
    trailerModel: "Nitro 24' Enclosed",
    totalPrice: 24500,
    status: "pending",
    submittedDate: "2024-03-15",
  },
  {
    id: "Q-2024-002",
    dealerName: "XYZ Motors",
    customerName: "Sarah Johnson",
    trailerModel: "Nitro 16' Open",
    totalPrice: 12800,
    status: "approved",
    submittedDate: "2024-03-14",
  },
];

const QuotesPortal = () => {
  const { toast } = useToast();

  const handleApproveQuote = (quoteId: string) => {
    toast({
      title: "Quote Approved",
      description: `Quote ${quoteId} has been approved.`,
    });
  };

  const handleRejectQuote = (quoteId: string) => {
    toast({
      title: "Quote Rejected",
      description: `Quote ${quoteId} has been rejected.`,
    });
  };

  const handleViewDetails = (quoteId: string) => {
    toast({
      title: "Opening Quote Details",
      description: `Viewing details for quote ${quoteId}`,
    });
  };

  return (
    <Layout userRole="sales" userName="Sales User" companyName="Nitro Trailers">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Quotes Portal</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dealer Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search quotes..." className="pl-8" />
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quote ID</TableHead>
                    <TableHead>Dealer</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Trailer Model</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockQuotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell className="font-medium">{quote.id}</TableCell>
                      <TableCell>{quote.dealerName}</TableCell>
                      <TableCell>{quote.customerName}</TableCell>
                      <TableCell>{quote.trailerModel}</TableCell>
                      <TableCell>${quote.totalPrice.toLocaleString()}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            quote.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{quote.submittedDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewDetails(quote.id)}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleApproveQuote(quote.id)}
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRejectQuote(quote.id)}
                          >
                            <XCircle className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default QuotesPortal;
