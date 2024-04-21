import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedLayout from "../shared/components/layout/container";
import ForgetPassword from "../pages/forgetPassword";
import ResetPassword from "../pages/resetPassword";
import Dashboard from "../pages/dashboard";
import Signin from "../pages/Signin";
import Pharmacies from "../pages/pharmacy";
import Orders from "../pages/orders";
import OrderDetail from "../pages/order-detail";
import Businesses from "../pages/business";
import Members from "../pages/members";
import Products from "../pages/products";
import ProductDetail from "../pages/products/ProductDetail";

function NotFoundRoute({ isLoggedIn, redirectTo }) {
  return isLoggedIn ? (
    <Navigate to={redirectTo} />
  ) : (
    <Navigate to={redirectTo} />
  );
}

function PublicRoute({ isLoggedIn, redirectTo }) {
  return isLoggedIn ? <Navigate to={redirectTo} /> : <Outlet />;
}

const Router = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route exact path="/" element={<Signin />} />

      <Route
        path="/login"
        element={
          <PublicRoute
            isLoggedIn={user?.token && user?.email ? true : false}
            redirectTo={"/pharmacies"}
          />
        }
      >
        <Route path="/login" element={<Signin />} />
      </Route>
      {/*<Route exact path="/login" element={<Signin/>}/>*/}
      <Route exact path="/forgotPassword" element={<ForgetPassword />} />
      <Route
        exact
        path="/resetPassword/:uniqueString"
        element={<ResetPassword />}
      />
      <Route
        element={
          <ProtectedLayout
            isAllowed={user?.token && user?.email ? true : false}
          />
        }
      >
        <Route exact path="/stores" element={<Pharmacies />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/orderDetail" element={<OrderDetail />} />
        <Route exact path="/businesses" element={<Businesses />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/members" element={<Members />} />
        <Route exact path="/productDetail" element={<ProductDetail />} />
      </Route>

      <Route
        path="*"
        element={
          <NotFoundRoute
            isLoggedIn={user?.token && user?.email ? true : false}
            redirectTo={user?.token && user?.email ? "/dashboard" : "/login"}
          />
        }
      ></Route>
    </Routes>
  );
};

export default Router;
