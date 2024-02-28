import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/Auth";
import { AdminMenu } from "../../components/Layout/AdminMenu";
const AdminDashboard = () => {
    const [authDetails] =useAuth()
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3> Admin Name : {authDetails?.user?.name}</h3>
              <h3> Admin Email : {authDetails?.user?.email}</h3>
              <h3> Admin Contact : {authDetails?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
