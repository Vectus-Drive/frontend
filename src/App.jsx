import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider 
} from 'react-router-dom';

import RootLayout from "./layout/RootLayout";
import Home from './pages/Home';
import About from './pages/About';
import CarList from './pages/CarList';
import AdminLayout from './layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* User site routes */}
        <Route path='/' element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/car' element={<CarList />} />
        </Route>

        {/* Admin dashboard routes */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
