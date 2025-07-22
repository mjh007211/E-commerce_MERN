// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartPage, HomePage, LoginPage, RegistrationPage } from "./pages";
import { NavBar } from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthenticationProvider } from "./context/auth/AuthenticationProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CartProvider } from "./context/Cart/CartProvider";

function App() {
  return (
    <AuthenticationProvider>
      <CartProvider>
        <BrowserRouter>
          <NavBar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<CartPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthenticationProvider>
  );
}

export default App;
