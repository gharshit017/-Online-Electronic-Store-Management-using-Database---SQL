import { Button, Stack, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../../context";

const Register = () => {
  const { register } = useContext(AppContext);
  const [input, setInput] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const { name, email, password } = input;
    register({ name, email, password });
  };
  return (
    <Stack rowGap={2}>
      <TextField
        label={"Name"}
        variant={"outlined"}
        type={"text"}
        name={"name"}
        value={input.name}
        onChange={handleChange}
      />
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
        Register
      </Button>
    </Stack>
  );
};

export default Register;
