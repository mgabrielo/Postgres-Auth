import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const HomePage = () => {
  return (
    <Grid
      container
      flexDirection={"row"}
      alignItems={"center"}
      sx={{ width: "100%", height: "100vh" }}
    >
      <Grid
        item
        xs={12}
        sx={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3">Welcome to PostgresAuth</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HomePage;
