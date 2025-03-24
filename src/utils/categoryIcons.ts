
import { 
  Home, 
  ShoppingCart, 
  Car, 
  Utensils, 
  HeartPulse, 
  GraduationCap, 
  Smartphone, 
  Plane, 
  PartyPopper, 
  Coffee, 
  Shirt, 
  Dumbbell
} from "lucide-react";

export type ExpenseCategory = 
  | "housing" 
  | "groceries"
  | "transportation"
  | "food"
  | "healthcare"
  | "education"
  | "utilities"
  | "travel"
  | "entertainment"
  | "personal"
  | "clothing"
  | "fitness"
  | "other";

export const CATEGORIES: { 
  value: ExpenseCategory; 
  label: string; 
  icon: any;
  color: string;
}[] = [
  { value: "housing", label: "Housing", icon: Home, color: "#4B9CD3" },
  { value: "groceries", label: "Groceries", icon: ShoppingCart, color: "#F3B562" },
  { value: "transportation", label: "Transportation", icon: Car, color: "#99C24D" },
  { value: "food", label: "Food & Dining", icon: Utensils, color: "#FB6376" },
  { value: "healthcare", label: "Healthcare", icon: HeartPulse, color: "#5BC0EB" },
  { value: "education", label: "Education", icon: GraduationCap, color: "#7F96FF" },
  { value: "utilities", label: "Utilities", icon: Smartphone, color: "#8F3985" },
  { value: "travel", label: "Travel", icon: Plane, color: "#BF4342" },
  { value: "entertainment", label: "Entertainment", icon: PartyPopper, color: "#CE8147" },
  { value: "personal", label: "Personal", icon: Coffee, color: "#7A9E7E" },
  { value: "clothing", label: "Clothing", icon: Shirt, color: "#916953" },
  { value: "fitness", label: "Fitness", icon: Dumbbell, color: "#F45866" },
];

export const getCategoryIcon = (category: ExpenseCategory) => {
  return CATEGORIES.find(c => c.value === category)?.icon || Home;
};

export const getCategoryColor = (category: ExpenseCategory) => {
  return CATEGORIES.find(c => c.value === category)?.color || "#CCCCCC";
};

export const getCategoryLabel = (category: ExpenseCategory) => {
  return CATEGORIES.find(c => c.value === category)?.label || "Other";
};
