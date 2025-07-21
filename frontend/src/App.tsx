// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartPage, HomePage, LoginPage, RegistrationPage } from "./pages";
import { NavBar } from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthenticationProvider } from "./context/auth/AuthenticationProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <AuthenticationProvider>
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
    </AuthenticationProvider>
  );
}

export default App;
