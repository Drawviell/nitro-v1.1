import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, Search, Plus, Edit, Trash2 } from "lucide-react";

// Mock data for initial development
const mockDealers = [
  {
    id: 1,
    name: "ABC Trailers",
    location: "Los Angeles, CA",
    contactPerson: "John Smith",
    email: "john@abctrailers.com",
    phone: "(555) 123-4567",
    status: "Active",
  },
  {
    id: 2,
    name: "XYZ Motors",
    location: "Phoenix, AZ",
    contactPerson: "Sarah Johnson",
    email: "sarah@xyzmotors.com",
    phone: "(555) 987-6543",
    status: "Active",
  },
  // Add more mock dealers as needed
];

const DealersPage = () => {
  return (
    <Layout userRole="admin" userName="Admin User" companyName="Nitro Trailers">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Dealer Management</h1>
          <Button className="bg-nitro-red hover:bg-nitro-red/90">
            <Plus className="mr-2 h-4 w-4" /> Add New Dealer
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dealer Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search dealers..." className="pl-8" />
                </div>
              </div>
              <Button variant="outline">Filter</Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dealer Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDealers.map((dealer) => (
                    <TableRow key={dealer.id}>
                      <TableCell className="font-medium">{dealer.name}</TableCell>
                      <TableCell>{dealer.location}</TableCell>
                      <TableCell>{dealer.contactPerson}</TableCell>
                      <TableCell>{dealer.email}</TableCell>
                      <TableCell>{dealer.phone}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                          {dealer.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
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

export default DealersPage;
