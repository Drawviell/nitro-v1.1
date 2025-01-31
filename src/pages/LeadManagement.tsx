import { Layout } from "@/components/Layout";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
    } from "@/components/ui/table";
    import { Badge } from "@/components/ui/badge";

    // Mock data for leads - replace with actual data fetching later
    const mockLeads = [
      {
        id: "L001",
        name: "Potential Customer 1",
        company: "ABC Company",
        status: "new",
        date: "2024-03-15",
        assignedTo: "Sales Rep 1",
      },
      {
        id: "L002",
        name: "Interested Buyer 2",
        company: "XYZ Corp",
        status: "contacted",
        date: "2024-03-14",
        assignedTo: "Sales Rep 2",
      },
    ];

    export default function LeadManagement() {
      return (
        <Layout userRole="sales" userName="Sales User" companyName="Nitro Trailers">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Lead Management</h1>

            <Card>
              <CardHeader>
                <CardTitle>Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Lead ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Assigned To</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockLeads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">{lead.id}</TableCell>
                          <TableCell>{lead.name}</TableCell>
                          <TableCell>{lead.company}</TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={
                                lead.status === "new"
                                  ? "bg-green-500"
                                  : lead.status === "contacted"
                                  ? "bg-blue-500"
                                  : lead.status === "qualified"
                                  ? "bg-purple-500"
                                  : lead.status === "negotiating"
                                  ? "bg-orange-500"
                                  : "bg-gray-500"
                              }
                            >
                              {lead.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{lead.date}</TableCell>
                          <TableCell>{lead.assignedTo}</TableCell>
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
    }
