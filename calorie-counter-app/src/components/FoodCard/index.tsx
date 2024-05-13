import { FoodItem } from "@/typings/foodItem";
import * as FoodStyle from "./style";
import { FoodCondimentFacts } from "@/typings/foodCondimentFacts";
interface FoodCardProps {
  foodId: number;
  foodTitle: string;
  foodDescription: string;
  onSelect: (foodId: number) => void;
}
export const FoodCard = ({
  foodId,
  foodTitle,
  foodDescription,
  onSelect,
}: FoodCardProps): JSX.Element | undefined => {
  if (!!foodId)
    return (
      <FoodStyle.Container onClick={() => onSelect(foodId)}>
        <FoodStyle.Title>{foodTitle}</FoodStyle.Title>
        <FoodStyle.Description>{foodDescription}</FoodStyle.Description>
      </FoodStyle.Container>
    );
};
