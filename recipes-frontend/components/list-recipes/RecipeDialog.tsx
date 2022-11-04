import React, {FC} from 'react'
import { AppBar, Box, Button, Dialog, Grid, IconButton, Slide, Toolbar, Typography } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { dialogProps } from '../../interfaces/dialogProps';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
    ) {
      return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    dp:dialogProps
}

export const RecipeDialog:FC<Props> = ({dp}) => {
    
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
      setOpen(false)
    }

    return (
        <Box>
        {dp.success?(
        <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth={'xs'}
        >
                <AppBar sx={{ position: 'relative', backgroundColor: 'primary.main'}}>
                <Toolbar sx={{ position: 'relative', backgroundColor: 'primary.main'}}>
                  
                  <Grid item xs={9} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Typography variant="h6">
                      {dp.title}
                    </Typography>
                  </Grid>
      
                  <Grid item xs={12} sx={{display:'flex', justifyContent:'end', alignItems:'center'}}>
                    <IconButton
                      edge="end"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                      href={dp.returnLink}
                      >
                        <CloseIcon />
                    </IconButton>
                  </Grid>
                </Toolbar>
              </AppBar>
      
              <Grid item xs={12} sx={{display:'flex', justifyContent:'center', alignItems:'center' }}>
                <IconButton color='success' size="large" >
                  <TaskAltIcon sx={{fontSize:'150px'}}/>
                </IconButton>
              </Grid>
              <Grid item xs={12} sx={{display:'flex', justifyContent:'center', alignItems:'center' }}>
                <Typography variant='body1'>{dp.msg}</Typography>
              </Grid>
              <Grid item xs={12} sx={{display:'flex', justifyContent:'center', alignItems:'center', padding:'5px'}}>
                <Button variant="contained" 
                  color='secondary' 
                  sx={{color:'white', width:'100%'}} 
                  onClick={handleClose}
                  href={dp.returnLink}
                  >
                    Accept
                  </Button>
              </Grid>
            </Dialog>

            ):(
            <Dialog
            open={open} //openFailDialog
            onClose={handleClose} //handleCloseFailDialog
            TransitionComponent={Transition}
            fullWidth={true}
            maxWidth={'xs'}
          >
            <AppBar sx={{ position: 'relative', backgroundColor: 'error.main'}}>
              <Toolbar sx={{ position: 'relative', backgroundColor: 'error.main'}}>
                
                <Grid item xs={9} sx={{display:'flex', justifyContent:'left', alignItems:'center'}}>
                  <Typography variant="h6">
                    {dp.title}
                  </Typography>
                </Grid>
  
                <Grid item xs={12} sx={{display:'flex', justifyContent:'end', alignItems:'center'}}>
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    href={dp.returnLink}
                    >
                      <CloseIcon />
                  </IconButton>
                </Grid>
              </Toolbar>
            </AppBar>
  
            <Grid item xs={12} sx={{display:'flex', justifyContent:'center', alignItems:'center' }}>
              <IconButton color='error' size="large" >
                <ErrorOutlineIcon sx={{fontSize:'150px'}}/>
              </IconButton>
            </Grid>
            <Grid item xs={12} sx={{display:'flex', justifyContent:'center', alignItems:'center' }}>
              <Typography variant='body1'>{dp.msg}</Typography>
            </Grid>
            <Grid item xs={12} sx={{display:'flex', justifyContent:'center', alignItems:'center', padding:'5px'}}>
              <Button variant="contained" 
                color='secondary' 
                sx={{color:'white', width:'100%'}} 
                onClick={handleClose}
                href={dp.returnLink}
                >
                  Accept
                </Button>
            </Grid>
          </Dialog>               
            )}
    </Box>
        
  )
}
