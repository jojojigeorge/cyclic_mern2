import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'

const Authcontext=createContext()
const AuthProvider = ({children}) => {
  const [authDetails,setAuthDetails]=useState({user:"",token:""})
  // console.log('Token =>context/auth.jsx',authDetails.token)
  // default axios
  // axios.defaults.headers.common['Authorization']=authDetails?.token
  axios.defaults.baseURL = 'http://localhost:8081'
  axios.defaults.headers.common["Authorization"] = authDetails.token;
    useEffect(()=>{
      const data=localStorage.getItem('authDetails')
      if(data){
        const parseData=JSON.parse(data)
        setAuthDetails({
          ...authDetails,
          user:parseData.user,
          token:parseData.token
        })
      }
    },[])
  return (
    <Authcontext.Provider value={[authDetails,setAuthDetails]}>
        {children}
    </Authcontext.Provider>
  )
}
// custom hook
const useAuth=()=>useContext(Authcontext)
// export const theme=()=>{return(useContext(TestStateContext))}
export {useAuth,AuthProvider}
