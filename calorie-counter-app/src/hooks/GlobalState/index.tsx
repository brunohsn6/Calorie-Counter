import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { GlobalActionType, GlobalStateActions, GlobalStateType } from "./types";
import { FoodItem } from "@/typings/foodItem";
import { FoodCondimentFacts } from "@/typings/foodCondimentFacts";

const initialState: GlobalStateType = {
  foods: [],
  foodsNeedings: [],
  foodsNeedingsCondiments: [],
};

const GlobalStateContext = createContext<GlobalStateType | undefined>(
  undefined
);
const GlobalDispatchContext = createContext<
  React.Dispatch<GlobalActionType> | undefined
>(undefined);

const globalReducer = (
  state: GlobalStateType,
  action: GlobalActionType
): GlobalStateType => {
  switch (action.type) {
    case GlobalStateActions.SET_FOODS:
      return { ...state, foods: action.payload as Array<FoodItem> };
    case GlobalStateActions.SET_FOOD_NEEDINGS:
      return {
        ...state,
        foodsNeedings: action.payload as Array<FoodNeedingCondiments>,
      };
    case GlobalStateActions.SET_FOOD_NEEDINGS_CONDIMENTS:
      return {
        ...state,
        foodsNeedingsCondiments: action.payload as Array<FoodCondimentFacts>,
      };
    default:
      throw new Error(`Ação desconhecida: ${action.type}`);
  }
};

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): GlobalStateType => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalState deve ser usado dentro de um GlobalProvider"
    );
  }
  return context;
};

export const useGlobalDispatch = (): React.Dispatch<GlobalActionType> => {
  const context = useContext(GlobalDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalDispatch deve ser usado dentro de um GlobalProvider"
    );
  }
  return context;
};
