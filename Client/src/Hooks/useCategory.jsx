import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useCategory = () => {
    const[categories,setCategories]=useState([])
    const getAllCategory=async()=>{
        try {
            const {data}=await axios.get("/api/v1/category/all-category")
            setCategories(data.allcategory)
        } catch (error) {
            console.log("error in get all categories in hooks",error)
        }
    }
    useEffect(()=>{
        getAllCategory()
    },[])
  return categories
}

export default useCategory