import useSWR, { SWRConfiguration } from "swr";
import { IGetRecipes } from "../interfaces/recipesInterface";

const noData = {
  statusCode: 500,
  success: false,
  body: [],
};

export const useRecipes = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IGetRecipes>(
    `http://localhost:9000/api${url}`,
    config
  );
    
  return {
    recipeAPI: data || noData,
    isLoading: !error && !data,
    isError: error,
  };
};
