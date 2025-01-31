import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
    import { Button } from "@/components/ui/button";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Plus, ExternalLink } from "lucide-react";
    import { useState } from "react";

    const manufacturers = [
      {
        name: "Dexter Axle",
        logo: "/lovable-uploads/9d7a4b00-5e97-45f6-a2b8-87e3a31fbd35.png",
        warrantyUrl: "https://www.dextergroup.com/contact/warranty-claims",
        description: "For Dexter axle-related warranty claims"
      },
      {
        name: "Americana Tire and Wheel",
        logo: "/lovable-uploads/0d5b95a7-1a0c-4c3b-8809-d5528f2eafb4.png",
        warrantyUrl: "https://americanatire.com/warranty/",
        description: "For tire and wheel warranty claims"
      },
      {
        name: "Lippert Components",
        logo: "/lovable-uploads/337205cb-8e78-4407-b4d4-dfb85826fedd.png",
        warrantyUrl: "https://support.lci1.com/warranty-claim",
        description: "For Lippert components warranty claims"
      }
    ];

    interface WarrantyClaimDialogProps {
      open?: boolean;
      onOpenChange?: (open: boolean) => void;
    }

    export function WarrantyClaimDialog({ open, onOpenChange }: WarrantyClaimDialogProps) {
      return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Start New Warranty Claim</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Nitro Trailers Warranty Claim</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Submit a warranty claim directly to Nitro Trailers
                    </p>
                    <Button asChild variant="default" className="w-full">
                      <a href="/dealer/warranty/new">Start Nitro Warranty Claim</a>
                    </Button>
                  </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-3">
                  {manufacturers.map((manufacturer) => (
                    <Card key={manufacturer.name}>
                      <CardHeader>
                        <div className="h-16 flex items-center justify-center mb-2">
                          <img 
                            src={manufacturer.logo} 
                            alt={`${manufacturer.name} logo`}
                            className="max-h-full object-contain"
                          />
                        </div>
                        <CardTitle className="text-lg">{manufacturer.name}</CardTitle>
                        <CardDescription>{manufacturer.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow flex items-end">
                        <Button variant="outline" className="w-full" asChild>
                          <a 
                            href={manufacturer.warrantyUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center"
                          >
                            Go to Warranty Process
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    }
