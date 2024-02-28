import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom"; //to redirect pages
import { useAuth } from "../../context/Auth";

const Profile = () => {
  // context
  const [userDetails,setUserDetails]=useAuth()
  const navigate = useNavigate();
  const [userdata, setUserData] = useState({ name: "", email: "", password: "", phone: "", address: "" });
  const inputHandle = (e) => {
    setUserData({ ...userdata, [e.target.name]: e.target.value });
  };
  // // to get user details
  // const getUserDetails =async()=>{
  //   try {
  //     const {data}=await axios.get("api/v1/")
  //   } catch (error) {
  //     console.log("Error while fetching user details ",error)
  //   }
  // }

  // get user details from local storage
  useEffect(()=>{
    const {name,phone,email,address,password}=userDetails.user
    setUserData({...userdata,name:name,email:email,phone:phone,address:address,password:password})
    // console.log(userDetails,"--------------------")
    // console.log(name,phone)
  },[userDetails.user])
  // useEffect(()=>{
  //   console.log(userdata)
  // },[userdata])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const {  phone, address, password, name } = userdata;
      // const {data} = await axios.put("/api/v1/auth/profile/", { name,  password, address, phone });
      const {data} = await axios.put("/api/v1/auth/profile/", { userdata });

      // console.log('updated result',data)
      if (data.success) { 
        setUserDetails({...userDetails,user:data.updateduser})
        let ls = localStorage.getItem("authDetails");
        ls = JSON.parse(ls);
        ls.user = data.updateduser;
        localStorage.setItem("authDetails", JSON.stringify(ls));

        toast.success(data.message);
        // console.log("inside profile after success",userDetails)
        // navigate('/')

      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something is wrong in profile updation");
    }
  };
  return (
    <Layout>
      <div className="container mt-5 mb-5">
        <div className="card container shadow-lg  " style={{ width: "30rem" }}>
          <div className="display-6 text-center mt-5 ">Update User Details </div>
          <hr />
          <div className="card-body ">
            <form>
              <div>
                <label htmlFor="name-reg" className="form-label">
                  Name
                </label>
                <input type="text" className="form-control" value={userdata.name} id="name-reg" name="name" onChange={inputHandle} />
              </div>
              <div>
                <label htmlFor="email-reg" className="form-label disable">
                  Email
                </label>
                <input type="text"  disabled className="form-control"  value={userdata.email} id="email-reg" name="email" onChange={inputHandle} />
              </div>
              <div >
                <label htmlFor="password-reg" className="form-label">
                  Password
                </label>
                <input type="password" placeholder="Enter new password" className="form-control" id="password-reg" name="password"onChange={inputHandle} />
              </div>
              <div>
                <label htmlFor="name-reg" className="form-label">
                  Phone
                </label>
                <input type="text" className="form-control"  value={userdata.phone} id="phone-reg" name="phone" onChange={inputHandle} />
              </div>
              <div>
                <label htmlFor="name-reg" className="form-label">
                  Adress
                </label>
                <input type="text" className="form-control"  value={userdata.address} id="adress-reg" name="address" onChange={inputHandle} />
              </div>
              
              <div className="text-center mt-3">
                <button type="" onClick={handleSubmit} className="btn btn-success">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
