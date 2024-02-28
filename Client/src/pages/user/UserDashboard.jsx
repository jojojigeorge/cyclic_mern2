import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/Auth";
import { UserMenu } from "../../components/Layout/UserMenu";
const UserDashboard = () => {
    const [authDetails] =useAuth()
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h4> User Name : {authDetails?.user?.name}</h4>
              <h4> User Email : {authDetails?.user?.email}</h4>
              <h4> User Contact : {authDetails?.user?.phone}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
