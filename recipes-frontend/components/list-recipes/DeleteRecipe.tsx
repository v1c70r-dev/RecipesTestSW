import { AppBar, Box, Button, Dialog, Grid, Icon, IconButton, Slide, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import React, {FC} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { dialogProps, IRecipe } from '../../interfaces';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { RecipeDialog } from './RecipeDialog';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  recipe: IRecipe
}

//The id string, allows each action, knows which coupon is affected
export const DeleteRecipe:FC<Props>= ({recipe}) => {

    //dialog succesfull delete
    const [openSucDelete, setOpenSucDelete] = React.useState(false);
    const [openFailDialog, setOpenFailDialog] = React.useState(false);
    
    //dialog delete form
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const methods = useForm({
      mode:'onChange',
      defaultValues:{
        id: recipe._id,
        title: '',
      }
    })
  
    const {
      getFieldState,
      handleSubmit,
      register,
      formState: { errors, isValid },
    } = methods;

    const onSubmit = async (data: any) => {
        console.log('data',data);
        const response = await fetch(
        `http://localhost:9000/api/recipe/${data.id}`,
        {
          method: "DELETE",
          body: JSON.stringify(data.id),
        }
      );
    
      console.log('response', response)
      if (!response.ok) {
        alert("There was an error deleting the recipe");
      } else {
        const r = await response.json();
        if (r["statusCode"] != 200) {
          //alert("There was an error deleting the coupon");
          setOpen(false); //Close the delete form dialog
          setOpenFailDialog(true); //Open the delete fail dialog
        } else {
          //alert("Delete successful");
          setOpen(false); //Close the delete form dialog
          setOpenSucDelete(true); //Open the delete successful dialog
        }
      }
    };

    var successDialog:dialogProps = {title:'Borrado exitoso!', msg:'La receta a sido removida', returnLink:'/' ,success:true};
    var failureDialog:dialogProps = {title:'Error!', msg:'No se ha podido borrar la receta', returnLink:'/' , success:false};

    return (
    <Grid container sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>      
        
        <Button size="small" onClick={handleClickOpen}>Borrar</Button>
        
        <Grid item xs={12}>
        {/* Delete 1 element form dialog */}
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          fullWidth={true}
          maxWidth={'xs'}
        >
          <AppBar sx={{ position: 'relative', backgroundColor: 'primary.main'}}>
            <Toolbar sx={{ position: 'relative', backgroundColor: 'primary.main'}}>
              <Grid item xs={9} sx={{display:'flex', justifyContent:'left', alignItems:'center' }}>
                <Typography variant="h6">
                  Borrar Receta
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{display:'flex', justifyContent:'end', alignItems:'center' }}>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                  >
                    <CloseIcon />
                </IconButton>
              </Grid>
            </Toolbar>
          </AppBar>

          <Grid item xs={12} sx={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', padding:'5px' }}>
            <Typography>¿ Realmente deseas borrar la receta: {recipe.title}?</Typography>
            <IconButton color='secondary' size="large" >
              <WarningAmberIcon sx={{fontSize:'150px'}}/>
            </IconButton>
          </Grid>

          <Grid item xs={12} sx={{display:'flex', textAlign:'justify', alignItems:'center', flexDirection:'column', padding:'0 20px 0 20px' }}>
            <Typography>Si estás realmente seguro, escribe el titulo de la receta para activar el botón de borrado </Typography>
          </Grid>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} sx={{padding:'20px'}}>
              <TextField  fullWidth id="name" label={recipe.title} variant="filled"  error={getFieldState('title').invalid}
                {...register('title',{
                  validate:{
                    equalTo: v => v === recipe.title
                  },
                  required: true
                })}/>    
            </Grid>

            <Grid item xs={12} sx={{display:'flex', justifyContent:'center', alignItems:'center', padding:'5px 20px 5px 20px'}}>
              <Button
                fullWidth
                color="error"
                className="circular-btn"
                disabled={!isValid}
                type="submit"
              >
                <Typography variant="button">Borrar</Typography>
              </Button>
            </Grid>
          </form>
        </Dialog>
        
        {/* Successful create recipe size Dialog*/}
        {openSucDelete?(
          <RecipeDialog dp={successDialog}/>
        ):(<></>)}  
        
        {/* Fail create recipe size Dialog*/}
        {openFailDialog?(
          <RecipeDialog dp={failureDialog}/>
        ):(<></>)} 

      </Grid>
    </Grid>
  )
}
