export interface TrailerOption {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  incompatibleWith?: string[];
  requiredWith?: string[];
}

export interface TrailerSpecifications {
  length: string;
  width: string;
  height: string;
  weight: string;
  axles: string;
}

export interface TrailerModel {
  id: string;
  name: string;
  description: string;
  category: string; // Added category field
  basePrice: number;
  specifications: TrailerSpecifications;
  standardFeatures: string[];
  availableOptions: TrailerOption[];
  images: string[];
}

export const TRAILER_CATEGORIES = [
  "Cargo",
  "Car Hauler",
  "Equipment",
  "Dump",
  "Utility",
  "Landscape",
  "Gooseneck",
  "Flatbed",
  "Enclosed"
] as const;

export const PARTS_CATEGORIES = [
  "Fenders",
  "Axles & Grease Caps",
  "12V Electrical",
  "Couplers Chains and Jacks",
  "Diamond Plate /Skin / Roof",
  "Doors Windows and Vents",
  "Tire, Wheel Combo, Lug Nuts",
  "Snow Trailer Parts & Accessories",
  "Fasteners, Silicone, Wood, Insulation, and Seals",
  "Components",
  "Trims, Extrusions, and Tubing",
  "Locks & Keys"
] as const;

export type TrailerCategory = typeof TRAILER_CATEGORIES[number];
export type PartsCategory = typeof PARTS_CATEGORIES[number];
