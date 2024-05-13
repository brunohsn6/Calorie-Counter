import * as S from "./style";
import * as Grid from "@/components/Grid/style";
import { Button } from "@/components/Button/style";
import { SearchInput } from "@/components/SearchInput/style";
import { useEffect, useState } from "react";
import { NoContent } from "../../components/NoContent";
import { useGlobalDispatch, useGlobalState } from "@/hooks/GlobalState";
import {
  fetchCondimentFacts,
  fetchFoodCondiments,
  fetchFoods,
} from "@/services/Foods/fetchFoods";
import { GlobalStateActions } from "@/hooks/GlobalState/types";
import { FoodItem } from "@/typings/foodItem";
import { FoodCard } from "@/components/FoodCard";
export default function Home() {
  const { foods, foodsNeedings, foodsNeedingsCondiments } = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const [filteredData, setFilteredData] = useState<Array<FoodItem>>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function initData() {
      if (
        !foods.length &&
        !foodsNeedings.length &&
        !foodsNeedingsCondiments.length
      ) {
        setLoading(true);
        const foodSet = await fetchFoods();
        globalDispatch({
          type: GlobalStateActions.SET_FOODS,
          payload: foodSet,
        });
        setFilteredData(foodSet);
        globalDispatch({
          type: GlobalStateActions.SET_FOOD_NEEDINGS,
          payload: await fetchFoodCondiments(),
        });
        globalDispatch({
          type: GlobalStateActions.SET_FOOD_NEEDINGS_CONDIMENTS,
          payload: await fetchCondimentFacts(),
        });
        setLoading(false);
      }
    }
    initData();
  }, []);

  return (
    <S.HomeContainer>
      <S.HomeTitle>CALORIE COUNTER APP</S.HomeTitle>
      <S.FormArea>
        <Grid.Container templatecolumns="80% 10% 10%">
          <Grid.Item>
            <SearchInput placeholder="e.g.: apples or eggs..." />
          </Grid.Item>
          <Grid.Item justifySelf="center">
            <Button type="submit" fullsize>
              Pesquisar
            </Button>
          </Grid.Item>
          <Grid.Item justifySelf="center">
            <Button type="reset" fullsize>
              Limpar
            </Button>
          </Grid.Item>
        </Grid.Container>
      </S.FormArea>
      <S.DataContainer>
        {!filteredData.length ? (
          <NoContent
            title="Sem dados!"
            description="Não foi possível encontrar o produto para o texto pesquisado!"
          />
        ) : (
          filteredData.map((food) => (
            <FoodCard key={food.Food_Code} food={food} />
          ))
        )}
      </S.DataContainer>
    </S.HomeContainer>
  );
}
