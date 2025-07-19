// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, RegistrationPage } from "./pages";
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
        </Routes>
      </BrowserRouter>
    </AuthenticationProvider>
  );
}

export default App;
