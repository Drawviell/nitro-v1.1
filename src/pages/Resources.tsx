import { Layout } from "@/components/Layout";
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { useToast } from "@/hooks/use-toast";
    import { Upload, FileText, Image, Book, Download } from "lucide-react";
    import { useState } from "react";
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

    interface Resource {
      id: string;
      name: string;
      category: string;
      type: string;
      uploadDate: string;
      fileUrl: string;
    }

    const categories = [
      "Nitro Order Forms",
      "Nitro Option Placement & Base Diagrams",
      "Install Instructions",
      "Printable Brochures",
      "Printable Flyers",
      "Books"
    ];

    const mockResources: Resource[] = [
      {
        id: "1",
        name: "2024 Nitro Order Form",
        category: "Nitro Order Forms",
        type: "pdf",
        uploadDate: "2024-01-15",
        fileUrl: "/documents/order-form-2024.pdf"
      },
      {
        id: "2",
        name: "Trailer Base Diagram",
        category: "Nitro Option Placement & Base Diagrams",
        type: "pdf",
        uploadDate: "2024-01-10",
        fileUrl: "/documents/base-diagram.pdf"
      },
      {
        id: "3",
        name: "Installation Guide",
        category: "Install Instructions",
        type: "pdf",
        uploadDate: "2024-01-05",
        fileUrl: "/documents/install-guide.pdf"
      },
      {
        id: "4",
        name: "Product Brochure 2024",
        category: "Printable Brochures",
        type: "pdf",
        uploadDate: "2024-02-01",
        fileUrl: "/documents/brochure-2024.pdf"
      },
      {
        id: "5",
        name: "Spring Sale Flyer",
        category: "Printable Flyers",
        type: "pdf",
        uploadDate: "2024-02-15",
        fileUrl: "/documents/spring-sale.pdf"
      },
      {
        id: "6",
        name: "Product Manual",
        category: "Books",
        type: "pdf",
        uploadDate: "2024-01-20",
        fileUrl: "/documents/manual.pdf"
      }
    ];

    const getIconForType = (type: string) => {
      switch (type) {
        case 'pdf':
          return <FileText className="h-8 w-8 text-blue-500" />;
        case 'image':
          return <Image className="h-8 w-8 text-green-500" />;
        case 'book':
          return <Book className="h-8 w-8 text-purple-500" />;
        default:
          return <FileText className="h-8 w-8 text-gray-500" />;
      }
    };

    export default function Resources() {
      const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
      const { toast } = useToast();
      const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

      const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
          setSelectedFiles(files);
          toast({
            title: "Files selected",
            description: `${files.length} file(s) ready to upload`,
          });
          // Simulate upload
          setTimeout(() => {
            toast({
              title: "Files Uploaded",
              description: `${files.length} file(s) uploaded successfully`,
            });
          }, 1000);
        }
      };

      const handleDownload = (resource: Resource) => {
        toast({
          title: "Downloading Resource",
          description: `Downloading ${resource.name}`,
        });
        // Simulate download
        setTimeout(() => {
          toast({
            title: "Download Complete",
            description: `${resource.name} downloaded successfully`,
          });
        }, 1000);
      };

      const filteredResources = selectedCategory
        ? mockResources.filter(resource => resource.category === selectedCategory)
        : mockResources;

      return (
        <Layout userRole="admin" userName="Admin User" companyName="Nitro Trailers">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
            </div>

            <Tabs defaultValue={categories[0]} className="space-y-6">
              <TabsList className="bg-muted/50 p-1">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="data-[state=active]:bg-white"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <h3 className="text-2xl font-semibold tracking-tight">{category}</h3>
                        <p className="text-sm text-muted-foreground">
                          Upload and manage resources for {category}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Input
                          type="file"
                          accept=".pdf,image/*"
                          multiple
                          onChange={handleFileUpload}
                          className="max-w-[300px]"
                        />
                        <Button>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Files
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredResources.map((resource) => (
                        <Card key={resource.id} className="p-4 space-y-2">
                          <div className="flex items-center gap-2">
                            {getIconForType(resource.type)}
                            <div>
                              <h4 className="font-medium">{resource.name}</h4>
                              <p className="text-sm text-muted-foreground">Added {resource.uploadDate}</p>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleDownload(resource)}>
                              Download
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </Layout>
      );
    }
