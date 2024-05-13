import { useGlobalDispatch, useGlobalState } from "@/hooks/GlobalState";
import { MealElement } from "@/typings/filterFood";
import * as Grid from "@/components/Grid/style";
import { SearchInput } from "../SearchInput/style";
import { Button } from "../Button/style";
import * as CalorieCounterStyle from "./style";
import { GlobalStateActions } from "@/hooks/GlobalState/types";
import { useState } from "react";
import { randomKey } from "@/utils/randomKey";

interface CalorieCounterProps {
  foodToAdd?: MealElement;
  finish: () => void;
}

export const CalorieCounter = ({ foodToAdd, finish }: CalorieCounterProps) => {
  const { foodMenu } = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const getTotal = () => {
    return Math.round(
      foodMenu.reduce(
        (acc, curr) => (acc += (curr.amount || 0) * curr.calories || 0),
        0
      )
    );
  };

  const addFood = () => {
    if (foodToAdd && !!foodToAdd.amount) {
      globalDispatch({
        type: GlobalStateActions.ADD_FOOD_TO_MENU,
        payload: [...foodMenu, foodToAdd],
      });
      finish();
    }
  };

  const removeItem = (id: number) => {
    const elementIndex = foodMenu.findIndex((food) => food.id === id);
    const elementsCopy = [...foodMenu];
    elementsCopy.splice(elementIndex, 1);
    globalDispatch({
      type: GlobalStateActions.ADD_FOOD_TO_MENU,
      payload: elementsCopy,
    });
    if (elementsCopy.length === 0) {
      setShowDetails(false);
    }
  };

  return (
    <CalorieCounterStyle.Container>
      {!!foodToAdd && (
        <Grid.Container templatecolumns="repeat(5, 1fr)">
          <Grid.Item>
            <SearchInput value={foodToAdd.name} readOnly disabled></SearchInput>
          </Grid.Item>
          <Grid.Item>
            <SearchInput
              value={`${Math.round(foodToAdd.calories)} calorias`}
              readOnly
              disabled
            ></SearchInput>
          </Grid.Item>
          <Grid.Item>
            <SearchInput
              placeholder="digite a quantidade..."
              value={foodToAdd.amount}
              onChange={(evt) => {
                foodToAdd.amount = Number(evt.target.value);
              }}
            ></SearchInput>
          </Grid.Item>
          <Grid.Item>
            <Button fullsize onClick={() => addFood()}>
              Adicionar
            </Button>
          </Grid.Item>
          <Grid.Item>
            <Button fullsize onClick={() => finish()}>
              Cancelar
            </Button>
          </Grid.Item>
        </Grid.Container>
      )}
      {foodMenu.length > 0 && !foodToAdd && !showDetails && (
        <>
          <CalorieCounterStyle.Total>
            Total de calorias: {getTotal()} calorias
          </CalorieCounterStyle.Total>
          <Button onClick={() => setShowDetails(true)}>
            Ver detalhes da refeição
          </Button>
        </>
      )}
      {showDetails && !foodToAdd && (
        <>
          <CalorieCounterStyle.ResumeContainer>
            {foodMenu.map((food) => (
              <Grid.Container key={randomKey()} style={{ marginBottom: "1em" }}>
                <Grid.Item>
                  <Grid.Container templatecolumns="repeat(5, 1fr)">
                    <Grid.Item>
                      <SearchInput
                        disabled
                        readOnly
                        value={food.name}
                      ></SearchInput>
                    </Grid.Item>
                    <Grid.Item>
                      <SearchInput
                        disabled
                        readOnly
                        value={`${Math.round(food.calories)} calorias`}
                      ></SearchInput>
                    </Grid.Item>
                    <Grid.Item>
                      <SearchInput
                        disabled
                        readOnly
                        value={`${food.amount} unidade(s)`}
                      ></SearchInput>
                    </Grid.Item>
                    <Grid.Item>
                      <SearchInput
                        disabled
                        readOnly
                        value={`${Math.round(
                          (food.amount || 0) * food.calories
                        )} calorias totais`}
                      ></SearchInput>
                    </Grid.Item>
                    <Grid.Item>
                      <Button fullsize onClick={() => removeItem(food.id)}>
                        Remover
                      </Button>
                    </Grid.Item>
                  </Grid.Container>
                </Grid.Item>
              </Grid.Container>
            ))}
            <Button onClick={() => setShowDetails(false)}>Fechar</Button>
          </CalorieCounterStyle.ResumeContainer>
        </>
      )}
    </CalorieCounterStyle.Container>
  );
};
