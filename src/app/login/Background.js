import React from "react";
import Backgroundimage from "../static/images/image1.png";
import "./Background.css";
import Login from "./Login";
import { Container } from "@mui/system";
import logo from '../static/images/ocean.jpeg'
import Grid from "@mui/system/Unstable_Grid/Grid";
import { Card } from "@mui/material";
const Background = () => {
  return (
    <div className="home-containers">
      <Container  >
        
        <Grid container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
          m={0}
          style={{ minHeight: '100vh' }}>
          {/* <Grid item direction="row">
            <img src={logo} width={140} height={140} alt="Logo" />;
          </Grid> */}

          <Grid item>
              <Login />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Background;
