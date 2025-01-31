import { Layout } from "@/components/Layout";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Input } from "@/components/ui/input";
    import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
    } from "@/components/ui/table";
    import { Search } from "lucide-react";

    // Mock data for dealers - replace with actual data fetching later
    const mockDealers = [
      {
        id: "1",
        name: "ABC Trailers",
        location: "Los Angeles, CA",
        contactPerson: "John Smith",
        email: "john@abctrailers.com",
        phone: "(555) 123-4567",
        lastContact: "2024-03-15",
        status: "Active",
        ytdSales: 250000,
      },
      {
        id: "2",
        name: "XYZ Motors",
        location: "Phoenix, AZ",
        contactPerson: "Sarah Johnson",
        email: "sarah@xyzmotors.com",
        phone: "(555) 987-6543",
        lastContact: "2024-03-14",
        status: "Active",
        ytdSales: 180000,
      },
    ];

    export function DealerCRMPage() {
      return (
        <Layout userRole="sales" userName="Sales User" companyName="Nitro Trailers">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dealer CRM</h1>

            <Card>
              <CardHeader>
                <CardTitle>Assigned Dealers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search dealers..." className="pl-8" />
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Dealer Name</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Contact Person</TableHead>
                          <TableHead>Contact Info</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>YTD Sales</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockDealers.map((dealer) => (
                          <TableRow key={dealer.id}>
                            <TableCell className="font-medium">{dealer.name}</TableCell>
                            <TableCell>{dealer.location}</TableCell>
                            <TableCell>{dealer.contactPerson}</TableCell>
                            <TableCell>
                              {dealer.email}
                              <br />
                              {dealer.phone}
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                                {dealer.status}
                              </span>
                            </TableCell>
                            <TableCell>${dealer.ytdSales.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Layout>
      );
    }
