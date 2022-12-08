import { Box, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { AppContext } from "../../context";
import { Login, Register } from "./components";
import { Navigate } from "react-router-dom";

const LoginRegisterPage = () => {
  const { customer } = useContext(AppContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (customer) {
    return <Navigate to="/products" />;
  }
  return (
    <Container>
      <Stack height={"100vh"} justifyContent={"center"} alignItems={"center"}>
        <Box sx={{ width: "40%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
            >
              <Tab label="Login" {...a11yProps(0)} />
              <Tab label="Register" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Login />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Register />
          </TabPanel>
        </Box>
      </Stack>
    </Container>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default LoginRegisterPage;
