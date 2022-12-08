import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  LastPage as LastPageIcon,
  FirstPage as FirstPageIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
} from "@mui/icons-material";
import { useState, useContext } from "react";
import { AppContext } from "../../../context";

const ProductsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { cart, products } = useContext(AppContext);

  let cartProducts = [];
  products.forEach((product) => {
    if (product.id in cart) {
      cartProducts.push({ ...product, quantity: cart[product.id].quantity });
    }
  });

  // Avoid a layout jump when reaching the last page with empty rows.
  //   const emptyRows =
  //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (cartProducts.length === 0) {
    return <Stack flex={4}>Cart is Empty!!!</Stack>;
  }

  return (
    <Stack flex={2}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography fontWeight={"bold"}>ID</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={"bold"}>Name</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontWeight={"bold"}>Category</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontWeight={"bold"}>Quantity</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontWeight={"bold"}>Price</Typography>
              </TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {cartProducts.map((product) => (
              <Row key={product.id} product={product} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Stack>
  );
};

function Row({ product }) {
  const [open, setOpen] = useState(false);
  const { cart, setCart } = useContext(AppContext);
  const removeFromCart = (productId) => {
    setCart((prev) => {
      delete prev[productId];
      return { ...prev };
    });
  };

  const decrementPoductQuantityFromCart = (productId, productPrice) => {
    if (cart[productId].quantity === 1) {
      setCart((prev) => {
        delete prev[productId];
        return { ...prev };
      });
    } else {
      setCart((prev) => ({
        ...prev,
        [productId]: {
          quantity: prev[product.id].quantity - 1,
          price: productPrice,
        },
      }));
    }
  };

  const incrementPoductQuantityFromCart = (productId, productPrice) => {
    setCart((prev) => ({
      ...prev,
      [productId]: {
        quantity: prev[product.id].quantity + 1,
        price: productPrice,
      },
    }));
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {product.id}
        </TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell align="center">{product.category}</TableCell>
        <TableCell align="center">
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            size={"small"}
          >
            <Button
              onClick={() =>
                decrementPoductQuantityFromCart(product.id, product.price)
              }
            >
              -
            </Button>
            <Button>{cart[product.id].quantity}</Button>
            <Button
              onClick={() =>
                incrementPoductQuantityFromCart(product.id, product.price)
              }
            >
              +
            </Button>
          </ButtonGroup>
        </TableCell>
        <TableCell align="center">{product.price}</TableCell>
        <TableCell align="center">
          <Button
            variant={"outlined"}
            size={"small"}
            color={"error"}
            onClick={() => removeFromCart(product.id)}
          >
            Remove
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <Typography>{product.description}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function TablePaginationActions({ count, page, rowsPerPage, onPageChange }) {
  const theme = useTheme();
  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        // disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        // disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRightIcon />
        ) : (
          <KeyboardArrowLeftIcon />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        // disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeftIcon />
        ) : (
          <KeyboardArrowRightIcon />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        // disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default ProductsTable;
