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
import { MHome } from "./pages/mobile/Customer/Home/MHome";
import { CustomerLogin } from "./pages/desktop/Customer/Customer_Signin/CustomerLogin";
import { CustomerSignup } from "./pages/desktop/Customer/Customer_Signup/CustomerSignup";
import { CustomerOTP } from "./pages/desktop/Customer/Customer_Signup/CustomerOTP";
import { CustomerSetpassword } from "./pages/desktop/Customer/Customer_Signup/CustomerSetpassword";
import { MCustomerLogin } from "./pages/mobile/Customer/Customer_Signin/MCustomerLogin";
import { MCustomerSignup } from "./pages/mobile/Customer/Customer_Signup/MCustomerSignup";
import { MCustomerOTP } from "./pages/mobile/Customer/Customer_Signup/MCustomerOTP";
import { MCustomerSetpassword } from "./pages/mobile/Customer/Customer_Signup/MCustomerSetpassword";
import { ChatbotMain } from "./pages/component/Chatbot/ChatbotMain";
import Orders from "./pages/desktop/Customer/My Orders/Orders";
import { MainHome } from "./pages/desktop/Home/MainHome";
import { CategoryList } from "./pages/desktop/Home/CategoryList";
import ChatbotProductDetail from "./pages/desktop/Customer/Product Detail page/ChatbotProductDetail";
import { MCategoryList } from "./pages/mobile/Customer/Home/MCategoryList";


function App() {
  const deviceType = useDeviceType();

  return (
    <Router>
      <ScrollToTop />
      <ChatbotMain />
      <Routes>
        {deviceType === "mobile" ? (
          <>
            <Route path="/" element={<MHome />} />
            <Route path="/home" element={<MainHome />} />
            <Route path="/product-detail/category/:name" element={<MCategoryList />} />
            <Route path="/dealer-signup" element={<MDealerSignup />} />
            <Route path="/dealer-signup-otp" element={<MDealerOTP />} />
            <Route path="/dealer-signup-setpassword" element={<MDealerSetpassword />} />
            <Route path="/dealer-signin" element={<MDealerLogin />} />

            <Route path="/dealer-admin-page" element={<MDealerAddproduct />} />

            <Route path="/customer-signin" element={<MCustomerLogin />} />
            <Route path="/customer-signup" element={<MCustomerSignup />} />
            <Route path="/customer-signup-otp" element={<MCustomerOTP />} />
            <Route path="/customer-signup-setpassword" element={<MCustomerSetpassword />} />

            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/product-detail/:name" element={<ProductDetail />} />
            <Route path="/product-detail/bot/:id" element={<ChatbotProductDetail />} />
            <Route path="/product-checkout/:id" element={<CheckoutPage />} />
            <Route path="/product-order-placed" element={<OrderPlacedPage />} />
            <Route path="/product-orders" element={<Orders />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<MainHome />} />
            {/* <Route path="/product-detail/category/:id" element={<CategoryList />} /> */}
            <Route path="/product-detail/category/:name" element={<CategoryList />} />
            <Route path="/dealer-signup" element={<DealerSignup />} />
            <Route path="/dealer-signup-otp" element={<DealerOTP />} />
            <Route path="/dealer-signup-setpassword" element={<DealerSetpassword />} />
            <Route path="/dealer-signin" element={<DealerLogin />} />

            <Route path="/dealer-admin-page" element={<DealerAddproduct />} />

            <Route path="/customer-signin" element={<CustomerLogin />} />
            <Route path="/customer-signup" element={<CustomerSignup />} />
            <Route path="/customer-signup-otp" element={<CustomerOTP />} />
            <Route path="/customer-signup-setpassword" element={<CustomerSetpassword />} />

            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/product-detail/:name" element={<ProductDetail />} />
            <Route path="/product-detail/bot/:id" element={<ChatbotProductDetail />} />
            <Route path="/product-checkout/:id" element={<CheckoutPage />} />
            <Route path="/product-order-placed" element={<OrderPlacedPage />} />
            <Route path="/product-orders" element={<Orders />} />
          </>
        )}

        {/* fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App
