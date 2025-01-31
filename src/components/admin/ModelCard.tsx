import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TrailerModel } from "@/types/trailer";

interface ModelCardProps {
  model: TrailerModel;
  onDelete: () => void;
}

export const ModelCard = ({ model, onDelete }: ModelCardProps) => {
  return (
    <Card className="relative">
      <CardHeader className="flex flex-row justify-between items-start">
        <CardTitle>{model.name}</CardTitle>
        <Button 
          variant="destructive" 
          size="sm"
          onClick={onDelete}
        >
          Delete
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {model.images.length > 0 && (
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img
              src={model.images[0]}
              alt={model.name}
              className="object-cover w-full h-full"
            />
            {model.images.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                +{model.images.length - 1} more
              </div>
            )}
          </div>
        )}
        
        <p className="text-sm text-gray-600">{model.description}</p>
        
        <div className="text-lg font-bold">
          Base Price: ${model.basePrice.toLocaleString()}
        </div>
        
        <div className="space-y-2">
          <h4 className="font-semibold">Specifications</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Length: {model.specifications.length}</div>
            <div>Width: {model.specifications.width}</div>
            <div>Height: {model.specifications.height}</div>
            <div>Weight: {model.specifications.weight}</div>
            <div>Axles: {model.specifications.axles}</div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Standard Features</h4>
          <ul className="list-disc pl-6 text-sm space-y-1">
            {model.standardFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        {model.availableOptions.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Available Options</h4>
            <ul className="text-sm space-y-1">
              {model.availableOptions.map((option) => (
                <li key={option.id} className="flex justify-between">
                  <span>{option.name}</span>
                  <span>${option.price.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
