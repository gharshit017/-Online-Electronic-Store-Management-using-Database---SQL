import { useContext, useLayoutEffect } from "react";
import { AppContext } from "../../context";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useContext(AppContext);
  useLayoutEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Navigate to={"/"} />;
};

export default Logout;
