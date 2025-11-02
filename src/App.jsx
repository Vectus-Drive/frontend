import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

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
import Services from "./pages/admin/Services";
import ReviewManagement from "./pages/admin/ReviewManagement";
import Transaction from "./pages/Transaction";
import NotFoundPage from "./pages/NotFoundPage ";
import EmployeeProfile from "./pages/EmployeeProfile";
import Preloader from "./components/Preloader";
import { useAuth } from "./hooks/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminLayout from "./layout/AdminLayout";
import RootLayout from "./layout/RootLayout";

function App() {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return <Preloader />;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* 🌍 Public Layout */}
        <Route path="/" element={<RootLayout />}>
          {/* --- Public Pages --- */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="cars" element={<CarList />} />
          <Route path="car-details/:id" element={<CarDetails />} />
          <Route path="contact-us" element={<ContactUs />} />

          {/* --- Auth Pages --- */}
          <Route
            path="login"
            element={
              !isAuthenticated ? (
                <Login />
              ) : user?.role === "customer" ? (
                <Navigate to="/user" />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />

          <Route
            path="register"
            element={
              !isAuthenticated ? <SignUp /> : <Navigate to="/login" />
            }
          />

          {/* --- Protected Routes --- */}
          <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
            {/* Customer Routes */}
            <Route path="user" element={<UserProfile />} />
            <Route path="transaction" element={<Transaction />} />
          </Route>

            {/* Employee/Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={["employee"]} />} >
            <Route path="employee-profile" element={<EmployeeProfile />} />
            <Route path="dashboard" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="car-management" element={<CarManagement />} />
              <Route path="user-management" element={<UserManagement />} />
              <Route path="employee-management" element={<EmployeeManagement />} />
              <Route path="booking-management" element={<BookingManagement />} />
              <Route path="transaction-management" element={<TransactionManagement />} />
              <Route path="review-management" element={<ReviewManagement />} />
              <Route path="service-management" element={<Services />} />
            </Route>
          </Route>

          {/* --- 404 Page --- */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        toastClassName={() =>
          "relative flex p-5 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-[#0f172a] text-white"
        }
      />
    </>
  );
}

export default App;
