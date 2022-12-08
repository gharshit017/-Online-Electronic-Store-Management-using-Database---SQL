import {
  Box,
  Collapse,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../../context";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const CustomerOrdersPage = () => {
  const { getOrdersForCustomer, customer } = useContext(AppContext);
  const [orders, setOrders] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!customer) {
      navigate("/");
      return;
    }
    if (!orders) {
      getOrdersForCustomer()
        .then((res) => setOrders(res))
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!orders) {
    return (
      <Container>
        <Stack paddingY={4}>
          <Typography variant="h5">Loading...</Typography>
        </Stack>
      </Container>
    );
  }

  return (
    <Container>
      <Stack paddingY={4} rowGap={2}>
        <Typography variant="h4" align="center">
          My Orders
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell variant="head">
                  <Typography fontWeight={"bold"}>Order ID</Typography>
                </TableCell>
                <TableCell variant="head" align="center">
                  <Typography fontWeight={"bold"}>Date</Typography>
                </TableCell>
                <TableCell variant="head" align="center">
                  <Typography fontWeight={"bold"}>Amount</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(orders).map((orderId) => (
                <Row key={orderId} order={orders[orderId]} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
};

function Row({ order }) {
  const [open, setOpen] = useState(false);

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
        <TableCell align="left">{order[0].order_id}</TableCell>
        <TableCell align="center">
          {moment(order[0].timestamp_).format("DD-MM-YYYY")}
        </TableCell>
        <TableCell align="center">{`₹${order[0].total_amount}`}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order Items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product ID</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="center">Category</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.map((item) => (
                    <TableRow key={item.order_item_detail_id}>
                      <TableCell component="th" scope="row">
                        {item.product_id}
                      </TableCell>
                      <TableCell>{item.product_name}</TableCell>
                      <TableCell align="center">{item.category_name}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">{`₹${item.price}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default CustomerOrdersPage;
