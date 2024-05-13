import { FoodCondimentFacts } from "./foodCondimentFacts";
import { FoodItem } from "./foodItem";

export interface FilterState {
  foodItems: Array<FoodItem>;
  condimentsFacts: Array<FoodCondimentFacts>;
}

export enum FoodType {
  "FoodItem",
  "FoodCondiment",
}

export interface MealElement {
  id: number;
  name: string;
  calories: number;
  type: FoodType;
  amount?: number;
}
