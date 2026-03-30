/* ─── Legend Motors PS — Type Definitions ─── */

export interface CarSpecs {
  engine: string;
  horsepower: number;
  torque: string;
  fuelEconomy: string;
  drivetrain: string;
  seating: number;
  cargo: string;
  dimensions: string;
  weight: string;
}

export interface Car {
  id: string;
  slug: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number; // for showing discounts
  mileage: number;
  bodyType: "Sedan" | "SUV" | "Truck" | "Hatchback" | "Coupe" | "Van" | "Convertible";
  fuel: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  transmission: "Automatic" | "Manual";
  color: string;
  condition: "New" | "Used" | "Certified Pre-Owned";
  photos: string[];
  description: string;
  specs: CarSpecs;
  features: string[];
  certified: boolean;
  warranty: string;
  addedDate: string; // ISO date string
}

export interface LeadFormData {
  fullName: string;
  phone: string;
  email: string;
  message: string;
  carInterest?: string;
  preferredContact: "phone" | "email" | "whatsapp";
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
  car: string;
  date: string;
}

export interface FilterState {
  search: string;
  priceMin: number;
  priceMax: number;
  makes: string[];
  models: string[];
  yearMin: number;
  yearMax: number;
  mileageMax: number;
  bodyTypes: string[];
  fuelTypes: string[];
  transmissions: string[];
  conditions: string[];
  colors: string[];
  sortBy: "price-asc" | "price-desc" | "year-desc" | "mileage-asc" | "newest";
}
