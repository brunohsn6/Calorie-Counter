import { FoodCondimentFacts } from "@/typings/foodCondimentFacts";
import { FoodItem } from "@/typings/foodItem";

export interface GlobalStateType {
  foods: Array<FoodItem>;
  foodsNeedings: Array<FoodNeedingCondiments>;
  foodsNeedingsCondiments: Array<FoodCondimentFacts>;
}

export enum GlobalStateActions {
  SET_FOODS,
  SET_FOOD_NEEDINGS,
  SET_FOOD_NEEDINGS_CONDIMENTS,
}

type GlobalActionPayloadTypes =
  | Array<FoodItem>
  | Array<FoodNeedingCondiments>
  | Array<FoodCondimentFacts>;

export type GlobalActionType = {
  type: GlobalStateActions;
  payload: GlobalActionPayloadTypes;
};
