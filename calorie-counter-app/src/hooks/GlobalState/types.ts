import { MealElement } from "@/typings/filterFood";
import { FoodCondimentFacts } from "@/typings/foodCondimentFacts";
import { FoodItem } from "@/typings/foodItem";

export interface GlobalStateType {
  foodMenu: Array<MealElement>;
  foods: Array<FoodItem>;
  foodsNeedings: Array<FoodNeedingCondiments>;
  foodsNeedingsCondiments: Array<FoodCondimentFacts>;
}

export enum GlobalStateActions {
  SET_FOODS,
  SET_FOOD_NEEDINGS,
  SET_FOOD_NEEDINGS_CONDIMENTS,
  ADD_FOOD_TO_MENU,
}

type GlobalActionPayloadTypes =
  | Array<FoodItem>
  | Array<FoodNeedingCondiments>
  | Array<FoodCondimentFacts>
  | Array<MealElement>;

export type GlobalActionType = {
  type: GlobalStateActions;
  payload: GlobalActionPayloadTypes;
};
