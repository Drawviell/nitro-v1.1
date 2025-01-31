import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Building, ArrowRight } from "lucide-react";
import { useState } from "react";
import { LeadDetails } from "./LeadDetails";

interface Lead {
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "new" | "contacted" | "qualified" | "negotiating";
  date: string;
}

interface LeadCardProps {
  lead: Lead;
  onStatusChange?: (status: Lead["status"]) => void;
}

export function LeadCard({ lead, onStatusChange }: LeadCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const statusColors = {
    new: "bg-green-500",
    contacted: "bg-blue-500",
    qualified: "bg-purple-500",
    negotiating: "bg-orange-500",
  };

  const handleStatusChange = (newStatus: Lead["status"]) => {
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-bold">{lead.name}</CardTitle>
          <Badge className={statusColors[lead.status]}>{lead.status}</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Building className="h-4 w-4" />
              <span>{lead.company}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{lead.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{lead.phone}</span>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-muted-foreground">Added {lead.date}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-600 hover:text-blue-800"
                onClick={() => setShowDetails(true)}
              >
                View Details <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showDetails && (
        <LeadDetails
          lead={lead}
          onClose={() => setShowDetails(false)}
          onStatusChange={handleStatusChange}
        />
      )}
    </>
  );
}
