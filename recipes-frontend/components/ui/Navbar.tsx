import React from "react";
import {
  AppBar,
  Button,
  Grid,
  Toolbar,
} from "@mui/material";
import Image from "next/image";

export const Navbar = () => {

  return (
    <Grid container xs={12}>
      <AppBar position="static">
        <Toolbar>
          
          <Grid item xs={10}>
            <Image
              src="/logos/recipes-logo.png"
              width={90}
              height={90}
              layout="fixed"
              alt="logo"
            />
          </Grid>

           <Grid item xs={2} >
            <Button color="inherit">Create recipe</Button>
           </Grid>

        </Toolbar>
      </AppBar>
    </Grid>
  );
};
