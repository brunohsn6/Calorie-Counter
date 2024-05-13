import { FoodItem } from "@/typings/foodItem";
import foodsJson from "../../../../calorie-counter-api/exported/foodDisplay.json";
import foodCondimentsJson from "../../../../calorie-counter-api/exported/foodsNeedingCondiments.json";
import foodCondimentsFactsJson from "../../../../calorie-counter-api/exported/luCondimentFoodTable.json";
import { FoodCondimentFacts } from "@/typings/foodCondimentFacts";
export const fetchFoods = async () => {
  // TODO: fetch api
  const foods = foodsJson as Array<FoodItem>;
  return foods;
};

export const fetchFoodCondiments = async () => {
  // TODO: fetch api
  const foodCondiments = foodCondimentsJson as Array<FoodNeedingCondiments>;
  return foodCondiments;
};

export const fetchCondimentFacts = async () => {
  // TODO: fetch api
  const foodCondimentsFacts =
    foodCondimentsFactsJson as Array<FoodCondimentFacts>;
  return foodCondimentsFacts;
};
