import { useState, useEffect } from "react";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { Button } from "@/components/ui/button";
    import { DialogClose } from "@/components/ui/dialog";
    import { useToast } from "@/hooks/use-toast";

    interface DealerFormProps {
      onSubmit?: (data: any) => void;
      initialData?: any;
    }

    export function DealerForm({ onSubmit, initialData }: DealerFormProps) {
      const [formData, setFormData] = useState({
        name: "",
        location: "",
        contactPerson: "",
        email: "",
        phone: "",
      });
      const { toast } = useToast();

      useEffect(() => {
        if (initialData) {
          setFormData(initialData);
        }
      }, [initialData]);

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
          onSubmit(formData);
        }
        toast({
          title: "Dealer Information Saved",
          description: "Dealer information has been saved successfully.",
        });
      };

      return (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Dealer Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-nitro-red hover:bg-red-700">
              Save Dealer
            </Button>
          </div>
        </form>
      );
    }
