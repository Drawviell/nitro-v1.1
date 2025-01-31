import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrailerModel } from "@/types/trailer";

export const TrailerModelCard = ({ model }: { model: TrailerModel }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{model.name}</CardTitle>
          <Badge variant="secondary">{model.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {model.images.length > 0 && (
            <img
              src={model.images[0]}
              alt={model.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
          
          <p className="text-sm text-gray-600">{model.description}</p>
          
          <div className="font-semibold">
            Base Price: ${model.basePrice.toLocaleString()}
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">Specifications:</h4>
            <ul className="text-sm space-y-1">
              <li>Length: {model.specifications.length}</li>
              <li>Width: {model.specifications.width}</li>
              <li>Height: {model.specifications.height}</li>
              <li>Weight: {model.specifications.weight}</li>
              <li>Axles: {model.specifications.axles}</li>
            </ul>
          </div>
          
          {model.availableOptions.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Available Options:</h4>
              <ul className="text-sm space-y-1">
                {model.availableOptions.map((option) => (
                  <li key={option.id}>
                    {option.name} - ${option.price.toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
