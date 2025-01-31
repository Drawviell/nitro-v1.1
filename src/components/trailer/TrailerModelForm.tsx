import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TrailerModel, TrailerOption, TRAILER_CATEGORIES } from "@/types/trailer";
import { DialogClose } from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrailerSpecificationsForm } from "./TrailerSpecificationsForm";

export const TrailerModelForm = ({
  onSubmit,
}: {
  onSubmit: (model: TrailerModel) => void;
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [options, setOptions] = useState<TrailerOption[]>([]);
  const [specifications, setSpecifications] = useState({
    length: "",
    width: "",
    height: "",
    weight: "",
    axles: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newModel: TrailerModel = {
      id: crypto.randomUUID(),
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      basePrice: Number(formData.get("basePrice")),
      specifications,
      standardFeatures: [],
      availableOptions: options,
      images: images.map(file => URL.createObjectURL(file)),
    };

    onSubmit(newModel);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const addOption = () => {
    setOptions([
      ...options,
      {
        id: crypto.randomUUID(),
        name: "",
        description: "",
        price: 0,
        category: "",
      },
    ]);
  };

  const removeOption = (id: string) => {
    setOptions(options.filter((opt) => opt.id !== id));
  };

  const updateOption = (id: string, field: keyof TrailerOption, value: string | number) => {
    setOptions(
      options.map((opt) =>
        opt.id === id ? { ...opt, [field]: value } : opt
      )
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Model Name</Label>
          <Input id="name" name="name" required />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select name="category" required>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {TRAILER_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" required />
        </div>

        <div>
          <Label htmlFor="basePrice">Base Price</Label>
          <Input
            id="basePrice"
            name="basePrice"
            type="number"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <Label>Images</Label>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="mt-1"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  className="w-20 h-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => setImages(images.filter((_, i) => i !== index))}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <TrailerSpecificationsForm 
          specifications={specifications}
          setSpecifications={setSpecifications}
        />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Options & Add-ons</Label>
            <Button type="button" onClick={addOption} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>
          {options.map((option) => (
            <div key={option.id} className="border p-4 rounded-lg space-y-4">
              <div className="flex justify-between">
                <Label>Option Details</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOption(option.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={option.name}
                    onChange={(e) =>
                      updateOption(option.id, "name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input
                    value={option.category}
                    onChange={(e) =>
                      updateOption(option.id, "category", e.target.value)
                    }
                  />
                </div>
                <div className="col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={option.description}
                    onChange={(e) =>
                      updateOption(option.id, "description", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={option.price}
                    onChange={(e) =>
                      updateOption(option.id, "price", Number(e.target.value))
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" className="bg-nitro-red hover:bg-red-700">
          Save Model
        </Button>
      </div>
    </form>
  );
};
