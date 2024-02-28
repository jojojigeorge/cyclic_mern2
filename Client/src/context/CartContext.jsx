import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext=createContext()
const CartProvider = ({children}) => {
  const [cartDetails,setCartDetails]=useState([])

  useEffect(()=>{
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCartDetails(JSON.parse(existingCartItem));
  },[])
  return (
    <CartContext.Provider value={[cartDetails,setCartDetails]}>
        {children}
    </CartContext.Provider>
  )
}

// custom hook
const useCart=()=>useContext(CartContext)
export {useCart,CartProvider}
