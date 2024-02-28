import React from 'react'

const Card = ({pdetails}) => {
    console.log(pdetails)
  return (
    <div className="card col-md-3 p-2 " style={{ width: "16rem" }}>
        <div className="my-auto ">
          {/* <a className="removeTextdecoration" href="/">
            {" "}   
          </a> */}
          <img className="card-img-top " style={{ objectFit: "cover" }} src={`http://localhost:8081/api/v1/product/getproduct-photo/${pdetails._id}`} height="120px" alt="" />
          <div className=" mt-1 myblackcolor ">
            <h6 className="text-center">{pdetails.name}</h6>

            <h6 className="text-center">{pdetails.price}/-</h6>
          </div>

          <div className="row m-1">
            <button type="" className="btn btn-info text-white" >
              Add to cart
            </button>
          </div>
        </div>
      </div>
  )
}

export default Card