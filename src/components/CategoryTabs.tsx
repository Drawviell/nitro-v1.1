import { Button } from "@/components/ui/button";

    interface CategoryTabsProps {
      categories: string[];
      selectedCategory: string;
      onSelectCategory: (category: string) => void;
    }

    export function CategoryTabs({ categories, selectedCategory, onSelectCategory }: CategoryTabsProps) {
      return (
        <div className="flex space-x-2 mb-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      );
    }
