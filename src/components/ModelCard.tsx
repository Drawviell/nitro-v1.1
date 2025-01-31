import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { TrailerModel } from "@/types/trailer";

    interface ModelCardProps {
      model: TrailerModel;
    }

    export function ModelCard({ model }: ModelCardProps) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>{model.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={model.imageUrl} alt={model.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <p className="text-sm text-gray-600">{model.description}</p>
            <p className="mt-2 font-semibold">Starting at ${model.basePrice.toLocaleString()}</p>
          </CardContent>
        </Card>
      );
    }
