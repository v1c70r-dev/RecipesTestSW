import { Card, CardMedia, CardContent, Typography, CardActions, Button, ListItem, List, ListItemIcon, Grid } from '@mui/material';
import React, {FC} from 'react'
import { IRecipe } from '../../interfaces/recipesInterface';
import CookieIcon from '@mui/icons-material/Cookie';
import { useRouter } from 'next/router';
import { DeleteRecipe } from './DeleteRecipe';

interface Props {
    recipe:IRecipe
}

export const CardRecipe:FC<Props> = ({recipe}) => {

  const router = useRouter();
    
  const navigateTo = (url: string) => {
      router.push(url);
  };

  return (
    <Grid item xs={4} sx={{padding:'10px'}}>

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
                <ListItem key={i._id}> 
                    <ListItemIcon>
                        <CookieIcon />
                    </ListItemIcon>
                    {i.name}, {i.quantity} 
                </ListItem>)}
        </List>

        <List>
            <Typography variant="body2" color="text.secondary"> Pasos: </Typography>
            {recipe.steps.map((s,index) => <ListItem key={index}> {index + ') '} {s} </ListItem>)}
        </List>

      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigateTo(`/${recipe._id}`)}>Editar</Button>
        {/* <Button size="small" onClick={() => setDel(true)}>Borrar</Button> */}
        <DeleteRecipe recipe={recipe}/>
      </CardActions>
    </Card>

    </Grid>
  )
}
