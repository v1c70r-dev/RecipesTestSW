import { Card, CardMedia, CardContent, Typography, CardActions, Button, ListItem, List, ListItemIcon, Grid } from '@mui/material';
import React, {FC} from 'react'
import { IRecipe } from '../../interfaces/recipesInterface';
import CookieIcon from '@mui/icons-material/Cookie';

interface Props {
    recipe:IRecipe
}

export const CardRecipe:FC<Props> = ({recipe}) => {
  return (
    <Grid item xs={4}>

    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="50%"
        image="/logos/recipe-default.png"
        alt="not recipe img"
        />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.title}
        </Typography>


        <List>
            <Typography variant="body2" color="text.secondary"> Ingredientes: </Typography>
            {recipe.ingredients.map(i => 
                <ListItem> 
                    <ListItemIcon>
                        <CookieIcon />
                    </ListItemIcon>
                    {i.name}, {i.quantity} 
                </ListItem>)}
        </List>

        <List>
            <Typography variant="body2" color="text.secondary"> Pasos: </Typography>
            {recipe.steps.map((s,index) => <ListItem> {index + ') '} {s} </ListItem>)}
        </List>

      </CardContent>
      <CardActions>
        <Button size="small">Editar</Button>
        <Button size="small">Borrar</Button>
      </CardActions>
    </Card>
    </Grid>
  )
}
