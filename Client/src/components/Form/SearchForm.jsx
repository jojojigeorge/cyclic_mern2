import React from "react";
import { useSearch } from "../../context/Search";
import axios from 'axios'
import {  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SearchForm = () => {
    const [value,setValue]=useSearch()
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const {data}=await axios.get(`/api/v1/product/search/${value.keyword}`)
            setValue({...value,result:data.searchresult,keyword:''})
            navigate("/")
            if(data.searchresult.length<1)
            toast.error("No search result")
        } catch (error) {
          setValue({...value,result:''})
            toast.error("No search result")
        }
    }
  return (  
    <>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input required className="form-control me-2" type="search" value={value.keyword} onChange={(e) => setValue({ ...value, keyword: e.target.value })} placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchForm;
