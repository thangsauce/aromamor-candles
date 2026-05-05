import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";
import { StoreProvider } from "./store/StoreContext";
import { AuthProvider } from "./store/AuthContext";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import ReviewsPage from "./pages/ReviewsPage";
import AboutPage from "./pages/AboutPage";
import CraftsmanshipPage from "./pages/CraftsmanshipPage";
import SustainabilityPage from "./pages/SustainabilityPage";
import FaqPage from "./pages/FaqPage";
import ShippingReturnsPage from "./pages/ShippingReturnsPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import CandleCarePage from "./pages/CandleCarePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import CartDrawer from "./components/CartDrawer";
import SearchDrawer from "./components/SearchDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import Overlay from "./components/Overlay";
import ScrollToTop from "./components/ScrollToTop";
import Toast from "./components/Toast";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import "./styles/globals.css";

function AppRoutes() {
  const location = useLocation();
  const backgroundLocation =
    (location.state as { backgroundLocation?: Location } | null)?.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/craftsmanship" element={<CraftsmanshipPage />} />
        <Route path="/sustainability" element={<SustainabilityPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
        <Route path="/candle-care" element={<CandleCarePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleRoute role="admin">
                <AdminDashboardPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute role="user">
                <UserDashboardPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      )}
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <AuthProvider>
        <StoreProvider>
          <AppRoutes />
          <Overlay />
          <CartDrawer />
          <SearchDrawer />
          <WishlistDrawer />
          <Toast />
        </StoreProvider>
      </AuthProvider>
    </HashRouter>
  );
}
