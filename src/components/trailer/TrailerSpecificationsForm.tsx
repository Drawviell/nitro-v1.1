import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TrailerSpecifications } from "@/types/trailer";

interface TrailerSpecificationsFormProps {
  specifications: TrailerSpecifications;
  setSpecifications: (specs: TrailerSpecifications) => void;
}

export const TrailerSpecificationsForm = ({
  specifications,
  setSpecifications,
}: TrailerSpecificationsFormProps) => {
  return (
    <div className="space-y-4">
      <Label>Specifications</Label>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="length">Length</Label>
          <Input
            id="length"
            value={specifications.length}
            onChange={(e) =>
              setSpecifications({ ...specifications, length: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="width">Width</Label>
          <Input
            id="width"
            value={specifications.width}
            onChange={(e) =>
              setSpecifications({ ...specifications, width: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            value={specifications.height}
            onChange={(e) =>
              setSpecifications({ ...specifications, height: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="weight">Weight</Label>
          <Input
            id="weight"
            value={specifications.weight}
            onChange={(e) =>
              setSpecifications({ ...specifications, weight: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="axles">Axles</Label>
          <Input
            id="axles"
            value={specifications.axles}
            onChange={(e) =>
              setSpecifications({ ...specifications, axles: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};
