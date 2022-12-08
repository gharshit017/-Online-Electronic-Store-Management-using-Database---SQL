import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginRegisterPage,
  ProductsPage,
  CartPage,
  Logout,
  CustomerOrdersPage,
  CreateProductPage,
} from "./pages";
import { Navbar } from "./components";
import { AppContextProvider } from "./context";

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginRegisterPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/customer/orders" element={<CustomerOrdersPage />} />
          <Route path="/product/add" element={<CreateProductPage />} />
        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
