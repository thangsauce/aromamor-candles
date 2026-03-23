import { HashRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./store/StoreContext";
import { ThemeProvider } from "./store/ThemeContext";
import ShopPage from "./pages/ShopPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import ReviewsPage from "./pages/ReviewsPage";
import AboutPage from "./pages/AboutPage";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import Overlay from "./components/Overlay";
import Toast from "./components/Toast";
import "./styles/globals.css";

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <StoreProvider>
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <Overlay />
          <CartDrawer />
          <WishlistDrawer />
          <Toast />
        </StoreProvider>
      </HashRouter>
    </ThemeProvider>
  );
}
