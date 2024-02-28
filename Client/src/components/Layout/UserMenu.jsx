import React from "react";
import { NavLink } from "react-router-dom";

export const UserMenu = () => {
  return (
    <div>
      <ul className="list-group">
        <NavLink to="/" className=" list-group-item list-group-item-action " >
          User Dashboard Panel
        </NavLink>
        <NavLink to="/dashboard/user/order" className=" list-group-item list-group-item-action">Order Details</NavLink>
        <NavLink to="/dashboard/user/userprofile" className="list-group-item list-group-item-action">Profile</NavLink>
        {/* <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink> */}
      </ul>
    </div>
  );
};
