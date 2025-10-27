import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate
} from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import CarList from "./pages/CarList";
import CarDetails from "./pages/CarDetails";
import ContactUs from "./pages/ContactUs";
import UserProfile from "./pages/UserProfile";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

import AdminDashboard from "./pages/admin/AdminDashboard";
import CarManagement from "./pages/admin/CarManagement";
import UserManagement from "./pages/admin/UserManagement";
import EmployeeManagement from "./pages/admin/EmployeeManagement";
import BookingManagement from "./pages/admin/BookingManagement";
import TransactionManagement from "./pages/admin/TransactionManagement";
import ReviewManagement from "./pages/admin/ReviewManagement";
import Transaction from "./pages/Transaction";
import NotFoundPage from "./pages/NotFoundPage ";
import EmployeeProfile from "./pages/EmployeeProfile";
import Preloader from "./components/Preloader";
import { useAuth } from "./hooks/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  // useEffect(() => {
  //   const timer = setTimeout(() => setLoading(false), 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="car" element={<CarList />} />
        <Route path="car-details/:id" element={<CarDetails />} />
        <Route path="contact-us" element={<ContactUs />} />


        <Route path="login" element={!isAuthenticated ? <Login /> : <Navigate to="/admin" />} />
        <Route path="register" element={!isAuthenticated ? <SignUp /> : <Navigate to="/admin" />}  />

        <Route path="NotFoundPage" element={<NotFoundPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="transaction" element={<Transaction />} />
          <Route path="user" element={<UserProfile />} />
          <Route path="employee-profile" element={<EmployeeProfile />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/cars" element={<CarManagement />} />
          <Route path="admin/users" element={<UserManagement />} />
          <Route path="admin/employee" element={<EmployeeManagement />} />
          <Route path="admin/bookings" element={<BookingManagement />} />
          <Route path="admin/transaction" element={<TransactionManagement />} />
          <Route path="admin/review" element={<ReviewManagement />} />
        </Route>
      </Route>
    )
  );

  if (loading) {
    return <Preloader />;
  }

  return <RouterProvider router={router} />;
}

export default App;
