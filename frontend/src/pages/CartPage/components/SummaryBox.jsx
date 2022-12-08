import {
  Alert,
  Button,
  Divider,
  Paper,
  Slide,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../../context";
import axios from "axios";

const SummaryBox = () => {
  const { cart, customer, setCart } = useContext(AppContext);
  const [response, setResponse] = useState({
    errorMessage: "",
    successMessage: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  let totalProducts = 0,
    totalAmount = 0;
  const cartArr = Object.keys(cart);
  for (let i = 0; i < cartArr.length; i++) {
    totalProducts += cart[cartArr[i]].quantity;
    totalAmount += cart[cartArr[i]].quantity * cart[cartArr[i]].price;
  }

  const handleOrder = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/order/create`,
        {
          customerId: customer.id,
          totalAmount,
          cart,
        }
      );

      setResponse((prev) => ({ ...prev, successMessage: data.message }));
      setOpenSnackbar(true);
      setCart({});
    } catch (err) {
      setResponse((prev) => ({ ...prev, errorMessage: err }));
      setOpenSnackbar(true);
      console.log(err);
    }
  };

  return (
    <Paper sx={{ flex: 1 }}>
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
      <Stack p={2} rowGap={2}>
        <Typography variant="h5" align="center">
          Summary
        </Typography>
        <Divider />
        <Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography fontWeight={"bold"}>Total Products:</Typography>
            <Typography>{totalProducts}</Typography>
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography fontWeight={"bold"}>Total Amount:</Typography>
            <Typography>₹{totalAmount}</Typography>
          </Stack>
        </Stack>
        <Button
          variant={"contained"}
          size={"large"}
          onClick={handleOrder}
          disabled={customer === null}
        >
          Order
        </Button>
      </Stack>
    </Paper>
  );
};

export default SummaryBox;
