import { Grid } from '@mui/material';
import React,{FC} from 'react';
import { IRecipe } from '../../interfaces/recipesInterface';
import { CardRecipe } from './CardRecipe';

interface Props {
  recipes:IRecipe[]
}

export const RecipesList:FC<Props> = ({recipes}) => {
  console.log('recipes',recipes)
  return (
    <Grid container sx={{display:'flex', justifyContent:'flex-start', alignContent:'baseline', padding:'20px'}}>
      {recipes.map(recipe => <CardRecipe recipe={recipe} key={recipe._id}/>)}
    </Grid>
  )
}
