import { useState } from "react";
import { UserData } from "./context/UserContext";
import Login from "./pages/auth/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Loading from "./components/loading/Loading";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import Courses from "./pages/courses/Course";
import PaymentSuccess from "./pages/paymentsuccess/PaymentSuccess";
import CourseDescription from "./pages/coursedescription/CourseDescription";
import Course from "./pages/courses/Course";
import CourseStudy from "./pages/coursestudy/CourseStudy";
import Lecture from "./pages/lecture/Lecture";
import "tailwindcss/tailwind.css";
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
            <Route path="/courses" element={<Course />} />
            <Route
              path="/course/:id"
              element={isAuth ? <CourseDescription user={user} /> : <Login />}
            />
            <Route
              path="/payment-success/:id"
              element={isAuth ? <PaymentSuccess user={user} /> : <Login />}
            />
            <Route
              path="/course/study/:id"
              element={isAuth ? <CourseStudy user={user} /> : <Login />}
            />
            <Route
              path="/lectures/:id"
              element={isAuth ? <Lecture user={user} /> : <Login />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
