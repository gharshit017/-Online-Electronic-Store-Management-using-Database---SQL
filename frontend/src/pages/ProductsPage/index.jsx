import { Button, Container, Grid, Stack } from "@mui/material";
import { NavLink } from "../../components";
import { FilterBox, ProductsTable } from "./components";

const ProductsPage = () => {
  return (
    <Container>
      <Stack paddingY={4} rowGap={4}>
        <Grid container spacing={4}>
          <Grid item md={3} xs={12}>
            <FilterBox />
          </Grid>
          <Grid item md={9} xs={12}>
            <ProductsTable />
          </Grid>
        </Grid>
        <NavLink to={"/cart"} style={{ alignSelf: "flex-end" }}>
          <Button variant={"contained"} size={"large"}>
            Go to Cart
          </Button>
        </NavLink>
      </Stack>
    </Container>
  );
};

export default ProductsPage;
