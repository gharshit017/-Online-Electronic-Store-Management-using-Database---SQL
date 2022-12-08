import { Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { ProductsTable, SummaryBox } from "./components";

const CartPage = () => {
  return (
    <Container>
      <Stack rowGap={2} paddingY={4}>
        <Typography align="center" variant={"h4"}>
          Your Cart
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <ProductsTable />
          </Grid>
          <Grid item xs={12} md={4}>
            <SummaryBox />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default CartPage;
