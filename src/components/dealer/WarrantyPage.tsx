import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Plus } from "lucide-react";
import { WarrantyClaimDialog } from "./WarrantyClaimDialog";
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

export function WarrantyPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Layout userRole="dealer" userName="Dealer User">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Warranty Claims</h1>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Warranty Claim
          </Button>
        </div>

        <WarrantyClaimDialog open={dialogOpen} onOpenChange={setDialogOpen} />

        <Tabs defaultValue="info" className="space-y-4">
          <TabsList>
            <TabsTrigger value="info">Warranty Information</TabsTrigger>
            <TabsTrigger value="manufacturers">Manufacturer Warranties</TabsTrigger>
            <TabsTrigger value="claims">My Claims</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>NITRO TRAILERS 5-YEAR LIMITED WARRANTY STATEMENT</CardTitle>
                <CardDescription>
                  Important information about your warranty coverage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <p className="text-sm text-yellow-700">
                    Please note: Trailers purchased for commercial use are limited to a one-year warranty.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Warranty Claim Inspection and Approval Policy</h3>
                  <p className="text-sm text-gray-600">
                    Filing a warranty claim does not guarantee automatic approval. Each claim is subject to a thorough 
                    inspection and evaluation by the dealer to determine if the issue falls under the coverage of the 
                    Nitro Trailers limited warranty.
                  </p>
                  <p className="text-sm text-gray-600">
                    This includes, but is not limited to, issues arising from:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Neglect</li>
                    <li>Improper installation</li>
                    <li>Improper maintenance</li>
                    <li>Alteration</li>
                    <li>Overloading</li>
                    <li>Abuse</li>
                    <li>Misuse</li>
                    <li>Any other conditions excluded from warranty coverage</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manufacturers">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {manufacturers.map((manufacturer) => (
                <Card key={manufacturer.name} className="flex flex-col">
                  <CardHeader>
                    <div className="h-16 flex items-center justify-center mb-4">
                      <img 
                        src={manufacturer.logo} 
                        alt={`${manufacturer.name} logo`}
                        className="max-h-full object-contain"
                      />
                    </div>
                    <CardTitle className="text-xl">{manufacturer.name}</CardTitle>
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
                        View Warranty Process
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="claims">
            <Card>
              <CardHeader>
                <CardTitle>My Warranty Claims</CardTitle>
                <CardDescription>
                  View and track your warranty claims
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>You haven't submitted any warranty claims yet.</p>
                  <Button variant="outline" className="mt-4" onClick={() => setDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Submit New Claim
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
