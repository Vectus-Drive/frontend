import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import CarList from "./pages/CarList";

import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CarManagement from "./pages/admin/CarManagement";
import UserManagement from "./pages/admin/UserManagement";
import BookingManagement from "./pages/admin/BookingManagement";

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* User Site Routes */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="car" element={<CarList />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path="/admin/" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="admin/cars" element={<CarManagement />} />
          <Route path="admin/users" element={<UserManagement />} />
          <Route path="admin/bookings" element={<BookingManagement />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
