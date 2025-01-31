  import { useState } from "react";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { Plus } from "lucide-react";
  import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
  import { TrailerModel } from "@/types/trailer";
  import { TrailerModelCard } from "../trailer/TrailerModelCard";
  import { Checkbox } from "@/components/ui/checkbox";
  import { Label } from "@/components/ui/label";
  import { useToast } from "@/hooks/use-toast";

  // Mock data for trailer models - replace with actual data fetching later
  const mockTrailerModels: TrailerModel[] = [
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

  interface QuoteState {
    baseModel: TrailerModel | null;
    selectedOptions: string[];
    totalPrice: number;
  }

  export function QuoteBuilder() {
    const [quotes, setQuotes] = useState<QuoteState[]>([]);
    const [currentQuote, setCurrentQuote] = useState<QuoteState | null>(null);
    const [showModelSelector, setShowModelSelector] = useState(false);
    const { toast } = useToast();

    const startNewQuote = () => {
      setShowModelSelector(true);
    };

    const selectBaseModel = (model: TrailerModel) => {
      setCurrentQuote({
        baseModel: model,
        selectedOptions: [],
        totalPrice: model.basePrice,
      });
      setShowModelSelector(false);
    };

    const toggleOption = (optionId: string) => {
      if (!currentQuote?.baseModel) return;

      setCurrentQuote(prev => {
        if (!prev) return prev;

        const newSelectedOptions = prev.selectedOptions.includes(optionId)
          ? prev.selectedOptions.filter(id => id !== optionId)
          : [...prev.selectedOptions, optionId];

        return {
          ...prev,
          selectedOptions: newSelectedOptions,
          totalPrice: calculateTotalPrice({
            ...prev,
            selectedOptions: newSelectedOptions,
          }),
        };
      });
    };

    const calculateTotalPrice = (quote: QuoteState): number => {
      if (!quote.baseModel) return 0;
      
      const optionsTotal = quote.selectedOptions.reduce((total, optionId) => {
        const option = quote.baseModel?.availableOptions.find(opt => opt.id === optionId);
        return total + (option?.price || 0);
      }, 0);
      
      return quote.baseModel.basePrice + optionsTotal;
    };

    const handleSaveQuote = () => {
      if (currentQuote) {
        setQuotes([...quotes, currentQuote]);
        setCurrentQuote(null);
        toast({
          title: "Quote Saved",
          description: "Your quote has been saved as a draft.",
        });
      }
    };

    const handleSubmitQuote = () => {
      if (currentQuote) {
        setQuotes([...quotes, currentQuote]);
        setCurrentQuote(null);
        toast({
          title: "Quote Submitted",
          description: "Your quote has been submitted for review.",
        });
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Quote Builder</h2>
          <Button onClick={startNewQuote}>
            <Plus className="mr-2 h-4 w-4" />
            New Quote
          </Button>
        </div>

        <Dialog open={showModelSelector} onOpenChange={setShowModelSelector}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Select Base Model</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {mockTrailerModels.map((model) => (
                <div key={model.id} onClick={() => selectBaseModel(model)} className="cursor-pointer">
                  <TrailerModelCard model={model} />
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {currentQuote && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Quote</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Base Model</h3>
                    <p>{currentQuote.baseModel?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Base Price: ${currentQuote.baseModel?.basePrice.toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Total Price</h3>
                    <p className="text-2xl font-bold">
                      ${calculateTotalPrice(currentQuote).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentQuote.baseModel?.availableOptions.map((option) => (
                    <div key={option.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={option.id}
                        checked={currentQuote.selectedOptions.includes(option.id)}
                        onCheckedChange={() => toggleOption(option.id)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor={option.id}>
                          {option.name} - ${option.price.toLocaleString()}
                        </Label>
                        {option.description && (
                          <p className="text-sm text-muted-foreground">
                            {option.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentQuote && (
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={handleSaveQuote}>
              Save as Draft
            </Button>
            <Button onClick={handleSubmitQuote} className="bg-nitro-red hover:bg-red-700">
              Submit Quote
            </Button>
          </div>
        )}

        {!currentQuote && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Quotes</CardTitle>
            </CardHeader>
            <CardContent>
              {quotes.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No recent quotes. Click "New Quote" to start building one.
                </p>
              ) : (
                <div className="space-y-4">
                  {quotes.map((quote, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{quote.baseModel?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${calculateTotalPrice(quote).toLocaleString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
