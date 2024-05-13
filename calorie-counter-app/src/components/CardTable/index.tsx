import { useEffect, useState } from "react";
import { FoodItem } from "@/typings/foodItem";
import { FoodCard } from "@/components/FoodCard";
import * as Grid from "@/components/Grid/style";
import { IconButton } from "../Button/style";
import * as CardTableStyle from "./style";
import { ChevronLeft } from "@/assets/ChevronLeft";
import { ChevronRight } from "@/assets/ChevronRight";
import { FoodCondimentFacts } from "@/typings/foodCondimentFacts";
import { FilterState, FoodType } from "@/typings/filterFood";
import { randomKey } from "@/utils/randomKey";
interface CardTableProps {
  data: FilterState;
  pageSize: number;
  onSelect: (foodId: number, type: FoodType) => void;
}
export function CardTable({ data, pageSize, onSelect }: CardTableProps) {
  const [currPage, setCurrPage] = useState(0);
  const elements = [...data.foodItems, ...data.condimentsFacts];
  const lastPage = Math.ceil(elements.length / pageSize);

  useEffect(() => {
    setCurrPage(0);
  }, [data, pageSize]);

  const getPagedElements = () => {
    return elements.slice(currPage * pageSize, currPage * pageSize + pageSize);
  };

  const getInfos = (food: FoodItem | FoodCondimentFacts) => {
    const getFoodItemDescription = (foodItem: FoodItem) => {
      return `${Math.round(
        Number(foodItem.Calories)
      )} calories | Serving size: ${foodItem.Portion_Default} ${
        foodItem.Portion_Display_Name
      }`;
    };
    const getFoodCondimentsDescription = (foodItem: FoodCondimentFacts) => {
      return `${Math.round(
        Number(foodItem.condiment_calories)
      )} calories | Serving size: ${foodItem.condiment_portion_size}`;
    };
    return {
      type: (food as FoodItem).Food_Code
        ? FoodType.FoodItem
        : FoodType.FoodCondiment,
      id:
        (food as FoodItem).Food_Code ||
        (food as FoodCondimentFacts).survey_food_code,
      title:
        (food as FoodItem).Display_Name ||
        (food as FoodCondimentFacts).display_name,
      description: (food as FoodItem).Display_Name
        ? getFoodItemDescription(food as FoodItem)
        : getFoodCondimentsDescription(food as FoodCondimentFacts),
    };
  };

  return (
    <CardTableStyle.Container>
      <CardTableStyle.DataSection>
        <Grid.Container templatecolumns="repeat(4, 1fr)">
          {getPagedElements().map((element) => {
            const info = getInfos(element);
            return (
              <Grid.Item key={randomKey()}>
                <FoodCard
                  foodId={info.id}
                  foodTitle={info.title}
                  foodDescription={info.description}
                  onSelect={(id) => onSelect(id, info.type)}
                />
              </Grid.Item>
            );
          })}
        </Grid.Container>
      </CardTableStyle.DataSection>
      <CardTableStyle.ControlSection>
        <IconButton
          disabled={currPage === 0}
          onClick={() => setCurrPage(currPage - 1)}
        >
          <ChevronLeft />
        </IconButton>

        <IconButton
          onClick={() => setCurrPage(currPage + 1)}
          disabled={currPage === lastPage}
        >
          <ChevronRight />
        </IconButton>
      </CardTableStyle.ControlSection>
    </CardTableStyle.Container>
  );
}
