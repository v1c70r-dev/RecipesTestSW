import type { NextPage } from "next";
import {RecipesLayout} from '../components/layout'
import { RecipesList } from "../components/list-recipes";
import { FullScreenLoading } from "../components/ui";
import { useRecipes } from '../hooks'

const HomePage: NextPage = () => {
  const { recipeAPI, isLoading } = useRecipes(
    '/recipe'
  );

  return (
    <RecipesLayout title="Recipes" pageDescription="Recipes">
      {isLoading ? (
          <FullScreenLoading />
        ) : (
          <RecipesList recipes={recipeAPI.body}/>
      )}
    </RecipesLayout>
  );
};

export default HomePage;