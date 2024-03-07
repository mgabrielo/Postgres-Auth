import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./components/home/HomePage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import LandingPage from "./components/user/LandingPage";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <Toaster />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/landing-page" element={<LandingPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
