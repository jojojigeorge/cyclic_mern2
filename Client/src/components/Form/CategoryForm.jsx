import React from 'react'

export const CategoryForm = ({handleSubmit,value,setValue}) => {
  return (      
    <div className='text-center'>
        <br />  
        <form className='' onSubmit={handleSubmit}>
            <input type="text" required placeholder='Enter new category name' value={value} onChange={e=>setValue(e.target.value)}/>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        </form> 

    </div>
  )
}
