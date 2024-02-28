import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import AdminDashboard from "./AdminDashboard";
import toast from "react-hot-toast";
import axios from "axios";
import {  Modal } from 'antd';
import { CategoryForm } from "../../components/Form/CategoryForm";


export const CreateCategory = () => {
  const [allcat, setAllCat] = useState([]);  
  const [name,setName]=useState('') 
  const [rename,setReName]=useState('') 
  const [updateId,setUpdateId]=useState('')
  const [modelVisible,setModelVisible]=useState(false)

  // create new category  
  const handleSubmit=async(e)=>{      
    e.preventDefault()
    try {
      const {data}=await axios.post("/api/v1/category/create-category",{category:name})
      if(data.success){
        toast.success(`${name} is created`)
        setName('')
        getAllCategory()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Error in create new category")
    }

  }

  // update category  name
  const handleUpdateCategory=async(e)=>{      
    e.preventDefault()
    try {
      const {data}=await axios.put(`/api/v1/category/update-category/${updateId}`,{category:rename})
      if(data.success){
        toast.success(`${rename} is updateted`)
        setModelVisible(false)
        getAllCategory()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Error in create new category")
    }

  }

  // get all category form backend
  const getAllCategory = async () => {  
    try {
      const {data} = await axios.get("/api/v1/category/all-category");
      if(data.success){
        setAllCat(data.allcategory)
      }
    } catch (error) {     
      console.log(error);
      toast.error("something wrong in fetching all category");
    }
  };

  //call at loading the page
  useEffect(() => { 
    getAllCategory(); 
  }, []);

  // delete category
  const handleDelete=async(cid)=>{
    try {
      const {data}= await axios.delete(`/api/v1/category/delete-category/${cid}`)
      if(data.success){
        toast.success(data.message)
        getAllCategory()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Error in delete category")
    }
  }

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3 text-center ">
              <h3>Create Category </h3>
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <br />
            <div className=" w-75  card w-75 p-3">
              <table className="table">
                <thead>
                  <tr className="text-center">
                    <th scope="col">Category Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allcat.map((c) => (
                    <tr key={c._id}>
                      <td>{c.category} </td>
                      <td className="text-center">
                        <button className="btn btn-outline-primary ms-2 me-0" onClick={()=>{setModelVisible(true);setReName(c.category);setUpdateId(c._id) }}>
                          Edit
                        </button>
                        <button className="btn btn-outline-danger ms-2 me-0" onClick={() => handleDelete(c._id)}>
                          Delete
                        </button>
                      </td>
                    </tr> 
                  ))}
                </tbody>
              </table>
            </div>
            <Modal title={"Update Category Name"} footer={null} onCancel={() => setModelVisible(false)} open={modelVisible}>
              <CategoryForm handleSubmit={handleUpdateCategory} value={rename} setValue={setReName} />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );  
};
