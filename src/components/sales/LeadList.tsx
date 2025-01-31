import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Building, ArrowRight } from "lucide-react";
import { useState } from "react";
import { LeadDetails } from "./LeadDetails";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "new" | "contacted" | "qualified" | "negotiating" | "closed";
  lastContact: string;
  date: string;
  assignedTo: string;
}

// Mock data - replace with actual data fetching
const mockLeads: Lead[] = [
  {
    id: "1",
    name: "John Smith",
    company: "Smith Hauling LLC",
    email: "john@smithhauling.com",
    phone: "(555) 123-4567",
    status: "new",
    lastContact: "2024-03-15",
    date: "2024-03-15",
    assignedTo: "Mike Sales",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    company: "Johnson Transport",
    email: "sarah@johnsontransport.com",
    phone: "(555) 987-6543",
    status: "qualified",
    lastContact: "2024-03-14",
    date: "2024-03-14",
    assignedTo: "Mike Sales",
  },
];

interface LeadListProps {
  status?: Lead["status"];
}

export function LeadList({ status }: LeadListProps) {
  const [leads, setLeads] = useState(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = status ? leads.filter(lead => lead.status === status) : leads;

  const getStatusColor = (status: Lead["status"]) => {
    const colors = {
      new: "bg-green-500",
      contacted: "bg-blue-500",
      qualified: "bg-purple-500",
      negotiating: "bg-orange-500",
      closed: "bg-gray-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const handleStatusChange = (leadId: string, newStatus: Lead["status"]) => {
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Contact</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLeads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  {lead.company}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {lead.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {lead.phone}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(lead.status)}>
                  {lead.status}
                </Badge>
              </TableCell>
              <TableCell>{lead.lastContact}</TableCell>
              <TableCell>{lead.assignedTo}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedLead(lead)}
                >
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedLead && (
        <LeadDetails
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onStatusChange={(newStatus) => {
            handleStatusChange(selectedLead.id, newStatus);
            setSelectedLead(null);
          }}
        />
      )}
    </div>
  );
}
