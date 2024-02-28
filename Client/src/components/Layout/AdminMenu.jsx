import React from "react";
import { NavLink } from "react-router-dom";

export const AdminMenu = () => {
  return (
    <div>
      <ul className="list-group">
        <NavLink to="/" className=" list-group-item list-group-item-action " >
          Admin Panel 
        </NavLink>
        <NavLink to="/dashboard/admin/createcategory" className=" list-group-item list-group-item-action">Create Category</NavLink>
        <NavLink to="/dashboard/admin/createproduct" className="list-group-item list-group-item-action">Create Product</NavLink>
        <NavLink to="/dashboard/admin/view-allproducts" className="list-group-item list-group-item-action">View Products</NavLink>
        <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
        {/* <NavLink to="/dashboard/admin/view-product" className="list-group-item list-group-item-action">single product</NavLink> */}
      </ul>
    </div>
  );
};
