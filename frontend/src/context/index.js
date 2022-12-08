import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState({});
  const [filters, setFilters] = useState({
    categories: [],
    price: [0, 100000],
    page: 1,
  });

  const navigate = useNavigate();

  const register = async ({ name, email, password }) => {
    try {
      await axios.post("/customer/register", {
        name,
        email,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/customer/login`,
        {
          email,
          password,
        }
      );

      setCustomer(data.customer);

      navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    setCustomer(null);
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/product/all`,
        {
          params: filters,
        }
      );
      setProducts(data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/product/category/all`
      );
      setCategories(data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const clearFilters = () => {
    setFilters((prev) => ({ ...prev, categories: [], price: [1, 100000] }));
  };

  const getOrdersForCustomer = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/customer/orders/${customer?.id}`
      );
      return data.ordersObj;
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = async (product) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/product/create`,
        product
      );

      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  return (
    <AppContext.Provider
      value={{
        customer,
        products,
        categories,
        cart,
        setCart,
        filters,
        setFilters,
        clearFilters,
        register,
        login,
        logout,
        getAllProducts,
        getAllCategories,
        getOrdersForCustomer,
        addProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
