import React, { createContext, useContext, useState } from 'react'

const SearchContext=createContext()
const SearchProvider = ({children}) => {
  const [authDetails,setAuthDetails]=useState({keyword:"",result:[]})
  return (
    <SearchContext.Provider value={[authDetails,setAuthDetails]}>
        {children}
    </SearchContext.Provider>
  )
}
// custom hook
const useSearch=()=>useContext(SearchContext)
export {useSearch,SearchProvider}
