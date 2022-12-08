import { FilterListOffOutlined as FilterListOffOutlinedIcon } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Slider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../context";

const FilterBox = () => {
  const {
    categories,
    getAllCategories,
    getAllProducts,
    filters,
    setFilters,
    clearFilters,
  } = useContext(AppContext);

  useEffect(() => {
    if (categories.length === 0) getAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoriesChange = (e) => {
    if (e.target.checked) {
      setFilters((prev) => ({
        ...prev,
        categories: [...prev.categories, e.target.name],
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        categories: prev.categories.filter(
          (category) => category !== e.target.name
        ),
      }));
    }
  };

  if (categories.length === 0) {
    return <Stack flex={1}>Loading Categories...</Stack>;
  }

  return (
    <Stack
      flex={1}
      rowGap={2}
      border={1}
      borderColor={"divider"}
      borderRadius={1}
      padding={2}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h6">Filters</Typography>
        <Tooltip title={"Clear Filters"}>
          <IconButton onClick={clearFilters}>
            <FilterListOffOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Divider />

      <Stack>
        <Typography>Price</Typography>
        <Slider
          getAriaLabel={() => "Price Range"}
          value={filters.price}
          onChange={(e, newValue) =>
            setFilters((prev) => ({ ...prev, price: newValue }))
          }
          min={0}
          max={100000}
          valueLabelDisplay="auto"
        />
      </Stack>

      <Divider />
      <Stack>
        <Typography>Categories</Typography>
        <FormGroup>
          {categories.map((category) => (
            <FormControlLabel
              key={category.id}
              control={
                <Checkbox
                  onChange={handleCategoriesChange}
                  name={category.name}
                  inputProps={{ "aria-label": "controlled" }}
                  checked={filters.categories.includes(category.name)}
                />
              }
              label={category.name}
            />
          ))}
        </FormGroup>
      </Stack>

      <Button onClick={getAllProducts}>Get Products</Button>
    </Stack>
  );
};

export default FilterBox;
