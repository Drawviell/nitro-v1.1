import { useState } from 'react';
    import { CategoryTabs } from '../components/CategoryTabs';
    import { ModelList } from '../components/ModelList';
    import { Button } from '@/components/ui/button';
    import { useNavigate } from 'react-router-dom';
    import { TrailerModel, TrailerOption } from '@/types/trailer';
    import { Checkbox } from '@/components/ui/checkbox';
    import { Label } from '@/components/ui/label';
    import { useToast } from '@/hooks/use-toast';
    import { Layout } from '@/components/Layout';

    const mockModels: TrailerModel[] = [
      {
        id: "1",
        name: "SUMMIT",
        category: "DEEP SNOW",
        basePrice: 13299,
        description: "Effortlessly agile, Summit snowmobiles paired with industry-defining Rotax power deliver dynamic deep-snow performance and instant response in technical winter terrain.",
        imageUrl: "/placeholder.svg",
        specifications: {
          length: "16'",
          width: "7'",
          height: "7'",
          weight: "2800 lbs",
          axles: "2",
        },
        standardFeatures: [
          "LED Lights",
          "Side Door",
          "Rear Ramp Door",
          "Steel Frame",
        ],
        availableOptions: [
          {
            id: "opt1",
            name: "Extra Height",
            description: "Increases interior height by 6 inches",
            price: 500,
            category: "Dimensions",
          },
          {
            id: "opt2",
            name: "Premium Wheels",
            description: "Upgrade to aluminum wheels",
            price: 800,
            category: "Wheels",
          },
        ],
      },
      {
        id: "2",
        name: "FREERIDE",
        category: "DEEP SNOW",
        basePrice: 17399,
        description: "Capable of conquering deep-snow extremes and delivering big air, the Freeride stands out alone in a world where insane climbs and big drops are the norm.",
        imageUrl: "/placeholder.svg",
        specifications: {
          length: "16'",
          width: "7'",
          height: "7'",
          weight: "2800 lbs",
          axles: "2",
        },
        standardFeatures: [
          "LED Lights",
          "Side Door",
          "Rear Ramp Door",
          "Steel Frame",
        ],
        availableOptions: [
          {
            id: "opt3",
            name: "Extra Height",
            description: "Increases interior height by 6 inches",
            price: 500,
            category: "Dimensions",
          },
          {
            id: "opt4",
            name: "Premium Wheels",
            description: "Upgrade to aluminum wheels",
            price: 800,
            category: "Wheels",
          },
        ],
      },
      {
        id: "3",
        name: "TRAIL 1",
        category: "TRAIL",
        basePrice: 10000,
        description: "Trail model 1 description",
        imageUrl: "/placeholder.svg",
        specifications: {
          length: "16'",
          width: "7'",
          height: "7'",
          weight: "2800 lbs",
          axles: "2",
        },
        standardFeatures: [],
        availableOptions: [],
      },
      {
        id: "4",
        name: "TRAIL 2",
        category: "TRAIL",
        basePrice: 11000,
        description: "Trail model 2 description",
        imageUrl: "/placeholder.svg",
        specifications: {
          length: "16'",
          width: "7'",
          height: "7'",
          weight: "2800 lbs",
          axles: "2",
        },
        standardFeatures: [],
        availableOptions: [],
      },
      {
        id: "5",
        name: "TRAIL 3",
        category: "TRAIL",
        basePrice: 12000,
        description: "Trail model 3 description",
        imageUrl: "/placeholder.svg",
        specifications: {
          length: "16'",
          width: "7'",
          height: "7'",
          weight: "2800 lbs",
          axles: "2",
        },
        standardFeatures: [],
        availableOptions: [],
      },
      {
        id: "6",
        name: "TRAIL 4",
        category: "TRAIL",
        basePrice: 13000,
        description: "Trail model 4 description",
        imageUrl: "/placeholder.svg",
        specifications: {
          length: "16'",
          width: "7'",
          height: "7'",
          weight: "2800 lbs",
          axles: "2",
        },
        standardFeatures: [],
        availableOptions: [],
      }
    ];

    const categories = ["ALL MODELS", "DEEP SNOW", "TRAIL", "CROSSOVER", "UTILITY", "MID-SIZED"];

    export default function ModelSelectionPage() {
      const [selectedCategory, setSelectedCategory] = useState("ALL MODELS");
      const navigate = useNavigate();
      const [selectedModel, setSelectedModel] = useState<TrailerModel | null>(null);
      const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
      const { toast } = useToast();

      const filteredModels = selectedCategory === "ALL MODELS"
        ? mockModels
        : mockModels.filter(model => model.category === selectedCategory);

      const calculateTotalPrice = () => {
        if (!selectedModel) return 0;
        const optionsTotal = selectedOptions.reduce((total, optionId) => {
          const option = selectedModel.availableOptions.find(opt => opt.id === optionId);
          return total + (option?.price || 0);
        }, 0);
        return selectedModel.basePrice + optionsTotal;
      };

      const toggleOption = (optionId: string) => {
        setSelectedOptions(prev =>
          prev.includes(optionId)
            ? prev.filter(id => id !== optionId)
            : [...prev, optionId]
        );
      };

      const handleSaveQuote = () => {
        toast({
          title: "Quote Saved",
          description: "Your quote has been saved as a draft.",
        });
      };

      const handleSubmitQuote = () => {
        toast({
          title: "Quote Submitted",
          description: "Your quote has been submitted for review.",
        });
      };

      return (
        <Layout userRole="dealer" userName="Dealer User" companyName="Nitro Trailers">
          <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-3xl font-bold">BUILD YOUR OWN</h1>
                <h2 className="text-xl font-semibold">SELECT A MODEL</h2>
              </div>
              <Button variant="outline" onClick={() => navigate('/dealer')}>
                Back to Dashboard
              </Button>
            </div>
            <CategoryTabs
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <ModelList models={filteredModels} onSelectModel={setSelectedModel} />
            {selectedModel && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold">Selected Model: {selectedModel.name}</h3>
                <div className="space-y-4">
                  {selectedModel.availableOptions.length > 0 && (
                    <div>
                      <h4 className="font-semibold">Available Options</h4>
                      <ul className="text-sm space-y-1">
                        {selectedModel.availableOptions.map((option) => (
                          <li key={option.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={option.id}
                              checked={selectedOptions.includes(option.id)}
                              onCheckedChange={() => toggleOption(option.id)}
                            />
                            <Label htmlFor={option.id}>
                              {option.name} - ${option.price.toLocaleString()}
                            </Label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-4">
                    <h4 className="font-semibold">Total Price:</h4>
                    <p className="text-2xl font-bold">
                      ${calculateTotalPrice().toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-end gap-4 mt-4">
                    <Button variant="outline" onClick={handleSaveQuote}>
                      Save as Draft
                    </Button>
                    <Button onClick={handleSubmitQuote} className="bg-nitro-red hover:bg-red-700">
                      Submit for Review
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Layout>
      );
    }
