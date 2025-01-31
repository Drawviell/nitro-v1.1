import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Image, Book, Download } from "lucide-react";
import { CategoryFilter } from "./CategoryFilter";
import { useState } from "react";

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

export function Resources() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredResources = selectedCategory
    ? mockResources.filter(resource => resource.category === selectedCategory)
    : mockResources;

  const handleDownload = (resource: Resource) => {
    console.log(`Downloading ${resource.name}`);
    window.open(resource.fileUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader>
              <div className="flex items-center gap-4">
                {getIconForType(resource.type)}
                <div>
                  <CardTitle className="text-lg">{resource.name}</CardTitle>
                  <CardDescription>{resource.category}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Added {new Date(resource.uploadDate).toLocaleDateString()}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleDownload(resource)}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
