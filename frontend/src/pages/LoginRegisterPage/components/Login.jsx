import { Button, Stack, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../../context";

const Login = () => {
  const { login } = useContext(AppContext);
  const [input, setInput] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const { email, password } = input;
    login({ email, password });
  };
  return (
    <Stack rowGap={2}>
      <TextField
        label={"Email"}
        variant={"outlined"}
        type={"email"}
        name={"email"}
        value={input.email}
        onChange={handleChange}
      />
      <TextField
        label={"Password"}
        variant={"outlined"}
        type={"password"}
        name={"password"}
        value={input.password}
        onChange={handleChange}
      />
      <Button variant={"contained"} onClick={handleSubmit}>
        Login
      </Button>
    </Stack>
  );
};

export default Login;
