import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Plus, Phone, Mail, Building, MapPin, BarChart2 } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

interface Dealer {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  lastContact: string;
  status: string;
  performance: {
    ytdSales: string;
    lastYearSales: string;
    activeQuotes: number;
    openOrders: number;
  };
  notes: Note[];
  calls: Call[];
}

interface Note {
  id: string;
  date: string;
  content: string;
  author: string;
}

interface Call {
  id: string;
  date: string;
  type: "Inbound" | "Outbound";
  duration: string;
  summary: string;
  followUpDate?: string;
}

const mockDealers: Dealer[] = [
  {
    id: "1",
    name: "ABC Trailers",
    contactPerson: "John Smith",
    phone: "(555) 123-4567",
    email: "john@abctrailers.com",
    address: "123 Main St, Anytown, USA",
    lastContact: "2024-03-15",
    status: "Active",
    performance: {
      ytdSales: "$250,000",
      lastYearSales: "$450,000",
      activeQuotes: 5,
      openOrders: 2
    },
    notes: [
      {
        id: "n1",
        date: "2024-03-15",
        content: "Discussed new trailer models for Q2",
        author: "Sales Rep"
      }
    ],
    calls: [
      {
        id: "c1",
        date: "2024-03-15",
        type: "Outbound",
        duration: "15 mins",
        summary: "Quarterly check-in call, discussed inventory needs",
        followUpDate: "2024-03-30"
      }
    ]
  },
  {
    id: "2",
    name: "XYZ Motors",
    contactPerson: "Jane Doe",
    phone: "(555) 987-6543",
    email: "jane@xyzmotors.com",
    address: "456 Oak Ave, Somewhere, USA",
    lastContact: "2024-03-14",
    status: "Active",
    performance: {
      ytdSales: "$180,000",
      lastYearSales: "$320,000",
      activeQuotes: 3,
      openOrders: 1
    },
    notes: [],
    calls: []
  }
];

export function DealerCRM() {
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [showDealerDetails, setShowDealerDetails] = useState(false);

  const handleViewDetails = (dealer: Dealer) => {
    setSelectedDealer(dealer);
    setShowDealerDetails(true);
  };

  const DealerDetails = ({ dealer }: { dealer: Dealer }) => {
    const [newNote, setNewNote] = useState("");
    const [newCallSummary, setNewCallSummary] = useState("");

    const handleAddNote = () => {
      if (!newNote.trim()) return;
      const note: Note = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        content: newNote,
        author: "Sales Rep"
      };
      dealer.notes.unshift(note);
      setNewNote("");
    };

    const handleLogCall = () => {
      if (!newCallSummary.trim()) return;
      const call: Call = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        type: "Outbound",
        duration: "15 mins",
        summary: newCallSummary
      };
      dealer.calls.unshift(call);
      setNewCallSummary("");
    };

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Dealer Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">YTD Sales</p>
                <p className="text-2xl font-bold">{dealer.performance.ytdSales}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Last Year</p>
                <p className="text-2xl font-bold">{dealer.performance.lastYearSales}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Active Quotes</p>
                <p className="text-2xl font-bold">{dealer.performance.activeQuotes}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Open Orders</p>
                <p className="text-2xl font-bold">{dealer.performance.openOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Log a Call</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="callSummary">Call Summary</Label>
                <Textarea
                  id="callSummary"
                  placeholder="Enter call details..."
                  value={newCallSummary}
                  onChange={(e) => setNewCallSummary(e.target.value)}
                />
              </div>
              <Button onClick={handleLogCall}>Log Call</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Note</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="note">Note</Label>
                <Textarea
                  id="note"
                  placeholder="Enter note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
              </div>
              <Button onClick={handleAddNote}>Add Note</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Calls</h3>
                {dealer.calls.length > 0 ? (
                  <div className="space-y-4">
                    {dealer.calls.map((call) => (
                      <div key={call.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{call.type} Call - {call.duration}</p>
                            <p className="text-sm text-muted-foreground">{call.date}</p>
                          </div>
                          {call.followUpDate && (
                            <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                              Follow-up: {call.followUpDate}
                            </span>
                          )}
                        </div>
                        <p className="mt-2">{call.summary}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No calls logged yet</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Notes</h3>
                {dealer.notes.length > 0 ? (
                  <div className="space-y-4">
                    {dealer.notes.map((note) => (
                      <div key={note.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <p className="text-sm text-muted-foreground">{note.date} - {note.author}</p>
                        </div>
                        <p className="mt-2">{note.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No notes added yet</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dealer CRM</h2>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Dealer
        </Button>
      </div>

      {!showDealerDetails ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Dealer Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search dealers..."
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dealer List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dealer Name</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDealers.map((dealer) => (
                    <TableRow key={dealer.id}>
                      <TableCell className="font-medium">{dealer.name}</TableCell>
                      <TableCell>{dealer.contactPerson}</TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            {dealer.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            {dealer.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {dealer.address}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <BarChart2 className="h-4 w-4 text-muted-foreground" />
                          {dealer.performance.ytdSales}
                        </div>
                      </TableCell>
                      <TableCell>{dealer.lastContact}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          {dealer.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(dealer)}>
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={() => setShowDealerDetails(false)}>
              ← Back to Dealer List
            </Button>
          </div>
          {selectedDealer && <DealerDetails dealer={selectedDealer} />}
        </div>
      )}
    </div>
  );
}
