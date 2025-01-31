import { ModelCard } from "./ModelCard";
    import { TrailerModel } from "@/types/trailer";

    interface ModelListProps {
      models: TrailerModel[];
      onSelectModel?: (model: TrailerModel) => void;
    }

    export function ModelList({ models, onSelectModel }: ModelListProps) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((model) => (
            <div key={model.id} onClick={() => onSelectModel?.(model)} className="cursor-pointer">
              <ModelCard model={model} />
            </div>
          ))}
        </div>
      );
    }
