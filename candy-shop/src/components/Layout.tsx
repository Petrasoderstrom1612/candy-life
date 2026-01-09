import CartProvider from "../context/CartProvider";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ShoppingCart from "./ShoppingCart";

const Layout = () => {
  return (
    <>
    <CartProvider>
      <Header />
      <ShoppingCart />
      <main className="bg-light">
      <Outlet />
      </main>
    </CartProvider>
    <Footer />
    </>
  );
};


export default Layout;
