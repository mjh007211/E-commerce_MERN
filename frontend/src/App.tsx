// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, RegistrationPage } from "./pages";
import { NavBar } from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthenticationProvider } from "./context/auth/AuthenticationProvider";

function App() {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthenticationProvider>
  );
}

export default App;
