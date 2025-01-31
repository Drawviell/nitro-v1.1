import { useState } from "react";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { Button } from "@/components/ui/button";
    import { Textarea } from "@/components/ui/textarea";
    import { DialogClose } from "@/components/ui/dialog";
    import { useToast } from "@/hooks/use-toast";

    interface WarrantyClaimFormProps {
      onSubmit?: (data: any) => void;
    }

    export function WarrantyClaimForm({ onSubmit }: WarrantyClaimFormProps) {
      const [formData, setFormData] = useState({
        issue: "",
        description: "",
        attachments: [] as File[],
      });
      const { toast } = useToast();

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
          onSubmit(formData);
        }
        toast({
          title: "Claim Submitted",
          description: "Your warranty claim has been submitted successfully.",
        });
      };

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setFormData({ ...formData, attachments: Array.from(e.target.files) });
        }
      };

      return (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="issue">Issue</Label>
              <Input
                id="issue"
                value={formData.issue}
                onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="attachments">Attachments</Label>
              <Input
                type="file"
                id="attachments"
                multiple
                accept="image/*,application/pdf"
                onChange={handleFileChange}
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
              Submit Claim
            </Button>
          </div>
        </form>
      );
    }
