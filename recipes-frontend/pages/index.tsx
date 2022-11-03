import type { NextPage } from "next";
import {RecipesLayout} from '../components/layout'
import { RecipesList } from "../components/list-recipes";
import { FullScreenLoading } from "../components/ui";
import { useRecipes } from '../hooks'


const { recipeAPI, isLoading } = useRecipes(
  '/recipe'
);

////////delete this//////////
/*
const isLoading = false;
const recipeAPI = {
"statusCode": 200,
  "success": true,
  "body": [
      {
          "_id": "6363511d40271b6291badae9",
          "title": "Pan con manteca y algo más!",
          "steps": [
              "Corte el pan y deje expuesta la superficie de cada trozo",
              "Agruegue manjar"
          ],
          "ingredients": [
              {
                  "name": "pan",
                  "quantity": "1 unidad",
                  "_id": "6363511d40271b6291badaea"
              },
              {
                  "name": "manjar",
                  "quantity": "100 gr",
                  "_id": "6363511d40271b6291badaeb"
              }
          ],
          "img": "some url",
          "__v": 0
      },
      {
          "_id": "636363f76cea8fb7671f316f",
          "title": "Pan con lechuga y algo más!",
          "steps": [
              "Corte el pan y deje expuesta la superficie de cada trozo",
              "Agruegue manjar"
          ],
          "ingredients": [
              {
                  "name": "pan",
                  "quantity": "1 unidad",
                  "_id": "636363f76cea8fb7671f3170"
              },
              {
                  "name": "manjar",
                  "quantity": "100 gr",
                  "_id": "636363f76cea8fb7671f3171"
              }
          ],
          "img": "some url",
          "__v": 0
      }
  ]
}
*/
//////////////

const HomePage: NextPage = () => {
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