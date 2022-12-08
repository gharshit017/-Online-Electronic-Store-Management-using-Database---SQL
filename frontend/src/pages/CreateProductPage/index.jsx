import {
  Alert,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { AppContext } from "../../context";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";

const CreateProductPage = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: 0,
    description: "",
  });

  const [response, setResponse] = useState({
    errorMessage: "",
    successMessage: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { categories, addProduct, customer } = useContext(AppContext);

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { name, category, price, description } = product;
    const data = await addProduct({
      name,
      categoryId: category.id,
      price,
      description,
    });

    setResponse((prev) => ({ ...prev, successMessage: data.message }));
    setOpenSnackbar(true);

    setProduct({
      name: "",
      category: "",
      price: 0,
      description: "",
    });
  };

  if (!customer || customer.role !== "admin") {
    return <Navigate to={"/"} />;
  }

  return (
    <Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={(e, reason) =>
          reason !== "clickaway" && setOpenSnackbar(false)
        }
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
      >
        <Alert
          onClose={(e, reason) =>
            reason !== "clickaway" && setOpenSnackbar(false)
          }
          severity={response.errorMessage ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {response.errorMessage
            ? response.errorMessage
            : response.successMessage}
        </Alert>
      </Snackbar>
      <Stack paddingY={4} rowGap={3} alignItems={"center"}>
        <TextField
          name={"name"}
          value={product.name}
          variant={"standard"}
          label={"Product Name"}
          onChange={handleChange}
          sx={{ minWidth: 300 }}
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Category
          </InputLabel>
          <Select
            name={"category"}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={product.category}
            onChange={handleChange}
            label="Age"
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          name={"price"}
          value={product.price}
          onChange={handleChange}
          variant={"standard"}
          label={"Price"}
          type={"number"}
          sx={{ minWidth: 300 }}
        />

        <TextField
          name={"description"}
          value={product.description}
          onChange={handleChange}
          label={"Description"}
          multiline
          minRows={4}
          sx={{ minWidth: 600 }}
        />

        <Button size="large" variant="contained" onClick={handleSubmit}>
          Add Product
        </Button>
      </Stack>
    </Container>
  );
};

export default CreateProductPage;
