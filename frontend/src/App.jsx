import './App.css'
import SignupPage from './pages/SignupPage'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import CartPage from './pages/CartPage'
import Checkout from './pages/Checkout'
import ProductDetailPage from './pages/ProductDetailPage'
import { Protected } from './features/auth/components/Protected';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrders from './features/user/components/UserOrders';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import { ProtectedAdmin } from './features/auth/components/ProtectedAdmin';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home/></Protected>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/signup",
    element: <SignupPage/>,
  },
  {
    path: "/cart",
    element: <Protected><CartPage/></Protected>
  },
  {
    path: "/checkout",
    element:<Protected><Checkout/></Protected>,
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetailPage/>,
  },
  {
    path: '/order-success/:id',
    element: (
      <Protected>
        <OrderSuccessPage/>{' '}
      </Protected>
    ),
  },
  {
    path: '/orders',
    element: (
      <Protected>
        <UserOrders/>
      </Protected>
    ),
  },
  {
    path: '/profile',
    element: (
      <Protected>
        <UserProfilePage/>{' '}
      </Protected>
    ),
  },
  {
    path: '/logout',
    element: <Protected><Logout/></Protected>,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage/>,
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdmin>
        <AdminHome/>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-detail/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage/>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage/>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage/>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage/>
      </ProtectedAdmin>
    ),
  },
  {
    path: '*',
    element: <PageNotFound/>,
  },
]);

function App() {
  const user = useSelector(state=>state.auth.loggedInUserToken);
  const dispatch=useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch, user]);

  return (
    <h1 className="text-3xl font-bold underline">
      <RouterProvider router={router} />
    </h1>
  )
}

export default App
