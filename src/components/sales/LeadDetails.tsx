import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Building, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Lead {
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "new" | "contacted" | "qualified" | "negotiating" | "closed";
  date: string;
}

interface LeadDetailsProps {
  lead: Lead;
  onClose: () => void;
  onStatusChange: (status: Lead["status"]) => void;
}

export function LeadDetails({ lead, onClose, onStatusChange }: LeadDetailsProps) {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<{ text: string; date: string }[]>([]);
  const { toast } = useToast();

  const statusColors = {
    new: "bg-green-500",
    contacted: "bg-blue-500",
    qualified: "bg-purple-500",
    negotiating: "bg-orange-500",
    closed: "bg-gray-500",
  };

  const handleAddNote = () => {
    if (note.trim()) {
      const newNote = {
        text: note,
        date: new Date().toISOString(),
      };
      setNotes([newNote, ...notes]);
      setNote("");
      toast({
        title: "Note added",
        description: "Your note has been saved successfully.",
      });
    }
  };

  const handleStatusChange = (newStatus: Lead["status"]) => {
    onStatusChange(newStatus);
    toast({
      title: "Status updated",
      description: `Lead status changed to ${newStatus}`,
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{lead.name}</DialogTitle>
          <div className="flex items-center space-x-2 mt-2">
            <Badge className={statusColors[lead.status]}>{lead.status}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lead Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-gray-500" />
                <span>{lead.company}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{lead.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{lead.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>{lead.date}</span>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Update Status</label>
            <Select onValueChange={handleStatusChange} defaultValue={lead.status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="negotiating">Negotiating</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Add Note</label>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter your note here..."
                className="min-h-[100px]"
              />
              <Button onClick={handleAddNote} className="w-full bg-nitro-red hover:bg-red-700">
                Add Note
              </Button>
            </div>

            {/* Notes List */}
            <div className="space-y-4">
              <h3 className="font-medium">Notes History</h3>
              <div className="space-y-4 max-h-[200px] overflow-y-auto">
                {notes.map((note, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">{note.text}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(note.date).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
