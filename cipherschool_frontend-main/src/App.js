import "./App.css";
import CourseDetails from "./pages/CourseDetails";
import CourseMaterials from "./CourseMaterials";
import TopNavbar from "./components/navbar";
import Home from "./pages/home";
import Footer from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Profilepage from "./pages/profilepage";
import Updatepage from "./pages/updatepage";
import UpdatePassword from "./pages/updatepassword";
import ChangePasscode from "./pages/changepasscode";
import SearchUser from "./pages/searchuser";
// import CommunityPage from "./pages/communitypage"; // Removed
import OtherUserProfilepage from "./pages/otheruserprofilepage";
import CoursesPage from "./pages/courses_page";
import ChatPage from "./pages/chat_page";
import TestsPage from "./pages/tests_page";
import CertificatePage from "./pages/certificate_page";
import AdminDashboard from "./pages/admin_dashboard";
import DashboardPage from "./pages/dashboard_page";
import IdePage from "./pages/ide_page";
import ProtectedRoute from "./components/protected_route";
import AdminRoute from "./components/admin_route";

//Below DynamicRouting() component is created ,so that when we refresh the page ,the user data do not get lost ......
//Also we used  DynamicRouting() component ,since App.js is first executed ,so we created a dynamic component to use 'useNavigate' function(as use Navigate function cannot be used in App.js ),
function DynamicRouting() {
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      dispatch({ type: "LOGIN_SUCCESS", payload: userData });
      //navigate("/home");
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      dispatch({ type: "LOGIN_ERROR" });
      // navigate("/home"); // Removing forceful navigation on load/refresh to avoid loops or flashes
    }
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/course/:id" element={<CourseDetails />} />
      <Route path="/materials/:courseName" element={<CourseMaterials />} />
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/home" element={<Home />}></Route>
      <Route
        exact
        path="/updatepage/:id"
        element={
          <ProtectedRoute>
            <Updatepage />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        exact
        path="/otherprofile/:id"
        element={<OtherUserProfilepage />}
      ></Route>
      <Route
        exact
        path="/profilepage/:id"
        element={
          <ProtectedRoute>
            <Profilepage />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        exact
        path="/search"
        element={
          <ProtectedRoute>
            <SearchUser />
          </ProtectedRoute>
        }
      ></Route>
      {/* <Route exact path="/communitypage" element={<CommunityPage />}></Route> */}
      
      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <CoursesPage />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/tests"
        element={
          <ProtectedRoute>
            <TestsPage />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/certificate"
        element={
          <ProtectedRoute>
            <CertificatePage />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        exact
        path="/changepassword/:id"
        element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        } // TO check authority of user for password change
      ></Route>
      <Route
        exact
        path="/changepasscode/:id"
        element={
          <ProtectedRoute>
            <ChangePasscode />
          </ProtectedRoute>
        } // To change the password
      ></Route>
      <Route
        path="/ide"
        element={
          <ProtectedRoute>
            <IdePage />
          </ProtectedRoute>
        }
      ></Route>
      {/* Admin Route */}
      <Route
        path="/admin-dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      ></Route>
    </Routes>
  );
}

function MainLayout() {
  const location = useLocation();
  const showFooter = location.pathname !== "/chat";

  return (
    <div className="main-content" style={{ paddingTop: '90px' }}>
      <DynamicRouting />
      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      {/* adding the navbar  */}

      <Router>
        <TopNavbar />
        <MainLayout />
      </Router>
    </div>
  );
}

export default App;
