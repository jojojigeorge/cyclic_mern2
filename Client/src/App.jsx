import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { PageNotFound } from "./pages/PageNotFound";
import Login from "./pages/Authentication/Login";
import Registration from "./pages/Authentication/Registration";
import { Dashboard } from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { CreateCategory } from "./pages/admin/CreateCategory";
import { CreateProduct } from "./pages/admin/CreateProduct";
import { Users } from "./pages/admin/Users";
import UserDashboard from "./pages/user/UserDashboard";
import AllProducts from "./pages/admin/AllProducts";
import ViewProduct from "./pages/admin/ViewProduct";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Profile from "./pages/user/Profile";

function App() {
      
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:slug" element={<ProductDetails/>}/>
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<CartPage />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />

      {/* user private route ===>dashboard/user */}
      <Route path="/dashboard" element={<PrivateRoute/>}>
        <Route path="user" element={<UserDashboard/>}/>
        <Route path="user/userprofile" element={<Profile/>}/>
      </Route>

      {/* dashboard/admin */}
      <Route path="/dashboard" element={<PrivateRoute/>}>
        <Route path="admin" element={<AdminDashboard/>}/>
        <Route path="admin/createcategory" element={<CreateCategory/>}/>
        <Route path="admin/createproduct" element={<CreateProduct/>}/>
        <Route path="admin/view-allproducts" element={<AllProducts/>}/>
        <Route path="admin/view-product/:slug" element={<ViewProduct/>}/>
        <Route path="admin/users" element={<Users/>}/>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
