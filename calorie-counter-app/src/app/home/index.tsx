import * as S from "./style";
import * as Grid from "@/components/Grid/style";
import { Button } from "@/components/Button/style";
import { SearchInput } from "@/components/SearchInput/style";
import { FormEvent, useEffect, useState } from "react";
import { NoContent } from "../../components/NoContent";
import { useGlobalDispatch, useGlobalState } from "@/hooks/GlobalState";
import {
  fetchCondimentFacts,
  fetchFoodCondiments,
  fetchFoods,
} from "@/services/Foods/fetchFoods";
import { GlobalStateActions } from "@/hooks/GlobalState/types";
import { CardTable } from "@/components/CardTable";
import { FilterState, FoodType, MealElement } from "@/typings/filterFood";
import { CalorieCounter } from "@/components/CalorieCounter";

export default function Home() {
  const { foods, foodsNeedings, foodsNeedingsCondiments } = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const [selectedFood, setSelectedFood] = useState<MealElement>();
  const [noSearchedData, setNoSearchedData] = useState(false);
  const [filteredData, setFilteredData] = useState<FilterState>({
    foodItems: [],
    condimentsFacts: [],
  });
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
        globalDispatch({
          type: GlobalStateActions.SET_FOOD_NEEDINGS,
          payload: await fetchFoodCondiments(),
        });
        const condimentsFacts = await fetchCondimentFacts();
        globalDispatch({
          type: GlobalStateActions.SET_FOOD_NEEDINGS_CONDIMENTS,
          payload: condimentsFacts,
        });
        setFilteredData({
          foodItems: foodSet,
          condimentsFacts: condimentsFacts,
        });

        setLoading(false);
      }
    }
    initData();
  }, []);

  const search = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const elements = new FormData(evt.currentTarget);
    const formObject: Record<string, string> = {};
    elements.forEach((value, key) => {
      formObject[key] = value as string;
    });
    if (formObject.searchValue === "") {
      setNoSearchedData(true);
    } else {
      setNoSearchedData(false);

      setLoading(true);

      const filteredFoods = foods.filter((food) =>
        food.Display_Name.includes(formObject.searchValue)
      );
      const filteredCondiments = foodsNeedingsCondiments.filter((food) =>
        food.display_name.includes(formObject.searchValue)
      );

      setFilteredData({
        foodItems: filteredFoods,
        condimentsFacts: filteredCondiments,
      });

      setLoading(false);
    }
  };

  const resetForm = () => {
    setNoSearchedData(false);
    setFilteredData({
      foodItems: foods,
      condimentsFacts: foodsNeedingsCondiments,
    });
  };

  const handleSelect = (foodId: number, type: FoodType) => {
    const mealElement = {
      id: foodId,
      name: "",
      calories: 0,
      type,
    };
    if (type === FoodType.FoodItem) {
      const food = foods.find((food) => food.Food_Code === foodId);
      mealElement.name = food?.Display_Name || "";
      mealElement.calories = food?.Calories ? Number(food.Calories) : 0;
    } else {
      const food = foodsNeedingsCondiments.find(
        (food) => food.survey_food_code === foodId
      );
      mealElement.name = food?.display_name || "";
      mealElement.calories = food?.condiment_calories
        ? Number(food.condiment_calories)
        : 0;
    }
    setSelectedFood(mealElement);
  };

  return (
    <S.HomeContainer>
      <S.HomeTitle>CALORIE COUNTER APP</S.HomeTitle>
      <S.FormArea onSubmit={search} onReset={resetForm}>
        <Grid.Container templatecolumns="80% 10% 10%">
          <Grid.Item>
            <SearchInput
              name="searchValue"
              placeholder="e.g.: apples or eggs..."
            />
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
      <CalorieCounter
        foodToAdd={selectedFood}
        finish={() => setSelectedFood(undefined)}
      />
      <S.DataContainer>
        {loading && <span>Loading...</span>}
        {!loading && noSearchedData && (
          <NoContent
            title="Busca vazia!"
            description="Você deve digitar o produto a ser pesquisado ou clicar em resetar para listar todos os produtos!"
          />
        )}
        {!loading &&
          !noSearchedData &&
          (!filteredData.foodItems.length &&
          !filteredData.condimentsFacts.length ? (
            <NoContent
              title="Sem dados!"
              description="Não foi possível encontrar o produto para o texto pesquisado!"
            />
          ) : (
            <CardTable
              data={filteredData}
              pageSize={25}
              onSelect={handleSelect}
            />
          ))}
      </S.DataContainer>
    </S.HomeContainer>
  );
}
