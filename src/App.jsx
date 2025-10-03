import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import DesktopPage from './pages/desktop/DesktopPage';

import MobilePage from './pages/mobile/MobilePage';
import useDeviceType from './utils/useDeviceType';

import { DealerSignup } from "./pages/desktop/Dealer_Signup/DealerSignup";
import { DealerOTP } from "./pages/desktop/Dealer_Signup/DealerOTP";
import { DealerSetpassword } from "./pages/desktop/Dealer_Signup/DealerSetpassword";
import { DealerLogin } from "./pages/desktop/Dealer_Signin/DealerLogin";
import { DealerAddproduct } from "./pages/desktop/Dealer_Admin_Page/DealerAddproduct";

import { MDealerSignup } from "./pages/mobile/Dealer_Signup/MDealerSignup";
import { MDealerOTP } from "./pages/mobile/Dealer_Signup/MDealerOTP";
import { MDealerSetpassword } from "./pages/mobile/Dealer_Signup/MDealerSetpassword";
import { MDealerLogin } from "./pages/mobile/Dealer_Signin/MDealerLogin";
import MDealerAddproduct from "./pages/mobile/Dealer_Admin_Page/DealerAddproduct";
import ShoppingCart from "./pages/desktop/Customer/Cart/ShoppingCart";
import ProductDetail from "./pages/desktop/Customer/Product Detail page/ProductDetail";
import CheckoutPage from "./pages/desktop/Customer/Check out/CheckoutPage";
import OrderPlacedPage from "./pages/desktop/Customer/Order Place/OrderPlacedPage";

import { Home } from "./pages/desktop/Home/Home";
import ScrollToTop from "./pages/component/ScrollToTop";


function App() {
  const deviceType = useDeviceType();

  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        {deviceType === "mobile" ? (
          <>
            <Route path="/" element={<MobilePage />} />
            <Route path="/dealer-signup" element={<MDealerSignup />} />
            <Route path="/dealer-signup-otp" element={<MDealerOTP />} />
            <Route path="/dealer-signup-setpassword" element={<MDealerSetpassword />} />
            <Route path="/dealer-signin" element={<MDealerLogin />} />

            <Route path="/dealer-admin-page" element={<MDealerAddproduct />} />
            
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            <Route path="/product-cart-checkout" element={<CheckoutPage />} />
            <Route path="/product-order-placed" element={<OrderPlacedPage/>} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/dealer-signup" element={<DealerSignup />} />
            <Route path="/dealer-signup-otp" element={<DealerOTP />} />
            <Route path="/dealer-signup-setpassword" element={<DealerSetpassword />} />
            <Route path="/customer-signin" element={<DealerLogin />} />

            <Route path="/dealer-admin-page" element={<DealerAddproduct />} />

            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            <Route path="/product-cart-checkout" element={<CheckoutPage />} />
            <Route path="/product-order-placed" element={<OrderPlacedPage/>} />
          </>
        )}

        {/* fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App
