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
    import { Search, Plus, Edit, Trash2 } from "lucide-react";
    import { useState } from "react";
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
    import { DealerForm } from "@/components/admin/DealerForm";
    import { useToast } from "@/hooks/use-toast";

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
        lastOrder: "2024-01-01",
        salesVolume: "$250,000"
      },
      {
        id: 2,
        name: "XYZ Motors",
        location: "Phoenix, AZ",
        contactPerson: "Sarah Johnson",
        email: "sarah@xyzmotors.com",
        phone: "(555) 987-6543",
        status: "Active",
        lastOrder: "2024-01-02",
        salesVolume: "$180,000"
      },
    ];

    const DealerManagement = () => {
      const [searchTerm, setSearchTerm] = useState("");
      const [open, setOpen] = useState(false);
      const [selectedDealer, setSelectedDealer] = useState(null);
      const [dealers, setDealers] = useState(mockDealers);
      const { toast } = useToast();

      const filteredDealers = dealers.filter(dealer =>
        dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dealer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dealer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const handleAddDealer = (newDealer: any) => {
        setDealers([...dealers, { ...newDealer, id: Date.now() }]);
        setOpen(false);
        toast({
          title: "New Dealer Added",
          description: `Dealer ${newDealer.name} has been added successfully.`,
        });
      };

      const handleEditDealer = (dealer: any) => {
        setSelectedDealer(dealer);
        setOpen(true);
      };

      const handleUpdateDealer = (updatedDealer: any) => {
        setDealers(dealers.map(dealer =>
          dealer.id === updatedDealer.id ? updatedDealer : dealer
        ));
        setOpen(false);
        setSelectedDealer(null);
        toast({
          title: "Dealer Updated",
          description: `Dealer ${updatedDealer.name} has been updated successfully.`,
        });
      };

      return (
        <Layout userRole="admin" userName="Admin User" companyName="Nitro Trailers">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold tracking-tight">Dealer Management</h1>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-nitro-red hover:bg-nitro-red/90">
                    <Plus className="mr-2 h-4 w-4" /> Add New Dealer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{selectedDealer ? "Edit Dealer" : "Add New Dealer"}</DialogTitle>
                  </DialogHeader>
                  <DealerForm
                    onSubmit={selectedDealer ? handleUpdateDealer : handleAddDealer}
                    initialData={selectedDealer}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Dealer Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search dealers..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
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
                        <TableHead>Last Order</TableHead>
                        <TableHead>Sales Volume</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDealers.map((dealer) => (
                        <TableRow key={dealer.id}>
                          <TableCell className="font-medium">{dealer.name}</TableCell>
                          <TableCell>{dealer.location}</TableCell>
                          <TableCell>{dealer.contactPerson}</TableCell>
                          <TableCell>{dealer.email}</TableCell>
                          <TableCell>{dealer.phone}</TableCell>
                          <TableCell>{dealer.lastOrder}</TableCell>
                          <TableCell>{dealer.salesVolume}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                              {dealer.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => handleEditDealer(dealer)}>
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

    export default DealerManagement;
