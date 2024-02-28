import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/Auth";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react"
import axios from "axios";

const CartPage = () => {
  const [clientToken,setClientToken]=useState('')
  const [instance,setInstance]=useState('')
  const [loading,setLoading]=useState('')


  const navigate = useNavigate();
  const [authDetails, setAuthDetails] = useAuth();
  const [cartDetails, setCartDetails] = useCart();


  // get token for payment
  const getToken=async()=>{
    try {
      const {data}=await axios.get("/api/v1/product/braintree/token")
      setClientToken(data?.clientToken)
    } catch (error) {
      console.log(error)  
    }
  }
  const handlePayment=()=>{}
useEffect(()=>{
  getToken()
},[authDetails?.token])
  // calculate total cart price
  const totalPrice = () => {
    let total = 0;
    cartDetails.map((p) => (total = total + p.price));
    return total;
  };

  // remove cart item
  const removeCartItem = (pid) => {
    try {
      const mycart = [...cartDetails];
      const index = mycart.findIndex((item) => item._id === pid);
      mycart.splice(index, 1);
      setCartDetails(mycart);
      localStorage.setItem("cart", JSON.stringify(mycart));
    } catch (error) {
      console.log("error in delete cart item", error);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">{`Hello ${authDetails?.token && authDetails?.user?.name}`}</h1>
            <h4 className="text-center">{cartDetails?.length ? `You Have ${cartDetails.length} items in your cart ${authDetails?.token ? "" : "please login to checkout"}` : " Your Cart Is Empty"}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 card p-4">
            {cartDetails?.map((p) => (
              <div key={p._id} className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img src={`http://localhost:8081/api/v1/product/getproduct-photo/${p._id}`} className="card-img-top" alt={p.name} width="100px" height={"100px"} />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : {p.price}</p>
                  <button className="btn btn-danger" onClick={() => removeCartItem(p._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-6 text-center  card p-3 ">
            <div className="mt-5">
              <h4>Cart Summary</h4>
              <p>Total | Checkout | Payment</p>
              <h4>Total : ₹ {totalPrice()} </h4>
            </div>
            {authDetails?.token ? (
              <div className="row ">
                <div className="row  container ">
                 <div>
                 <p className="col m-3 card p-3">
                    Current Address <br />
                    Name :{authDetails.user.name} <br />  
                    Address :{authDetails.user.address} <br />
                    Phone :{authDetails.user.phone} <br />
                  </p>
                 </div>
                 
                </div>
                <button
                  className="btn btn-primary col m-4"
                  onClick={() => {
                    navigate("/dashboard/user/userprofile");
                  }}
                >
                  Update Address
                </button>
                <button className="btn btn-success  col m-4">Checkout</button>
                
              </div>
            ) : (
              <>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => {
                    navigate("/login", { state: "/cart" });
                  }}
                >
                  Please login to checkout
                </button>
              </>
            )}
            <div>
            <DropIn
            options={{
              authorization:clientToken,
              paypal:{
                folw:'vault'
              } 
            }}
            onInstance={instance=>setInstance(instance)}
          />
          <button className="btn btn-primary" onClick={handlePayment}>MakePayment</button>
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
