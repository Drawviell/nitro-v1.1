import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Button } from "@/components/ui/button";
    import { Plus } from "lucide-react";
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
    import { useState } from "react";
    import { WarrantyClaimDialog } from "./WarrantyClaimDialog";

    function WarrantyClaims() {
      const [dialogOpen, setDialogOpen] = useState(false);

      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold tracking-tight">Warranty Claims</h2>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Claim
            </Button>
          </div>

          <WarrantyClaimDialog open={dialogOpen} onOpenChange={setDialogOpen} />

          <Card>
            <CardHeader>
              <CardTitle>Active Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Submit a new warranty claim or track existing claims.
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    export default WarrantyClaims;
