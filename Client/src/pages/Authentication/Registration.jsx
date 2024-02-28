import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from "react-router-dom"//to redirect pages

const Registration = () => {
  const navigate=useNavigate()
    const [userdata,setUserData]=useState({name:'',email:'',password:'',phone:'',address:'',question:''})
    const inputHandle=e=>{
        setUserData({...userdata,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
          const{email,phone,address,password,name,question}=userdata
          const res=await axios.post('/api/v1/auth/register/',{name,email,password,address,phone,question})
          if(res.data.success){
            toast.success(res.data.message)
            navigate('/login')
          }else{
            toast.error(res.data.error)
          }
        } catch (error) {
          console.log(error)
          toast.error("Something is wrong in registration")
        }
    }
  return (
    <Layout>
      <div className="container mt-5 mb-5">
        <div className="card container shadow-lg  " style={{ width: "30rem" }}>
          <div className="display-5 text-center mt-5 ">Sign Up </div>
          <hr />
          <div className="card-body ">
            <form >
              <div >
                <label htmlFor="name-reg" className="form-label">
                  Name
                </label>
                <input type="text" className="form-control" id="name-reg" name="name" onChange={inputHandle}/>
              </div>
              <div >
                <label htmlFor="email-reg" className="form-label">
                  Email
                </label>
                <input type="text" className="form-control" id="email-reg" name="email" onChange={inputHandle}/>
              </div>
              <div >
                <label htmlFor="password-reg" className="form-label">
                  Password
                </label>
                <input type="password" className="form-control" id="password-reg" name="password"onChange={inputHandle} />
              </div>
              <div >
                <label htmlFor="name-reg" className="form-label">
                  Phone
                </label>
                <input type="text" className="form-control" id="phone-reg" name="phone"onChange={inputHandle} />
              </div>
              <div >
                <label htmlFor="name-reg" className="form-label">
                  Adress
                </label>
                <input type="text" className="form-control" id="adress-reg" name="address"onChange={inputHandle} />
              </div>
              <div >
                <label htmlFor="name-reg" className="form-label">
                  Question[for password recovery]
                </label>
                <input type="text" className="form-control" id="question-reg" name="question"onChange={inputHandle} />
              </div>
              <div className="text-center mt-3">
                <button type=""onClick={handleSubmit} className="btn btn-success">
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

export default Registration;
