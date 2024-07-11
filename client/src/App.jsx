import { useState } from "react";
import { UserData } from "./context/UserContext";
import Login from "./pages/auth/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Loading from "./components/loading/Loading";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";

function App() {
  const [count, setCount] = useState(0);
  const { user, isAuth, loading } = UserData();
  console.log(user);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
