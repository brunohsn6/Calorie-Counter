import { FoodItem } from "@/typings/foodItem";
import * as S from "./style";
interface FoodCardProps {
  food: FoodItem;
}
export const FoodCard = ({ food }: FoodCardProps) => {
  if (!!food)
    return <S.FoodCardContainer>{food.Display_Name}</S.FoodCardContainer>;
};
