import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const AddRecipe = () => {
    const [recipedata,setRecipedata]=useState({})
    const navigate=useNavigate()
    const handleOnChange=(e)=>{
        let val=(e.target.name === "ingredients") ? e.target.value.split(","):e.target.value
        setRecipedata(pre=>({...pre,[e.target.name]:val}))
    }

    const handleOnSubmit=async(e)=>{
        e.preventDefault();
        console.log(recipedata)
        await axios.post('http://localhost:3000/api/recipes')
        .then(()=>navigate("/"))
    }
    
  return (
    <>
    <div className="recipe-content">
    <form action="" className="form" onSubmit={handleOnSubmit}>
        {/* Title Input  */}
        <div className="form-input" >
            <label htmlFor="title">Title</label>
            <input 
                type="text" 
                className="input"
                id='title-i' 
                name="title" 
                placeholder="Enter the recipe title" 
                required 
                onChange={handleOnChange}
            />
        </div>

        {/* Ingredients Input */}
        <div className="form-input">
            <label htmlFor="ingredients">Ingredients</label>
            <textarea 
                id="ingredients-i" 
                className="input"
                name="ingredients" 
                placeholder="List the ingredients, separated by commas" 
                required
                onChange={handleOnChange}
            ></textarea>
        </div>

        {/* Instructions Input */}
        <div className="form-input">
            <label htmlFor="instructions">Instructions</label>
            <textarea 
                id="instruction-i" 
                name="instruction"
                className="input" 
                placeholder="Describe the preparation steps" 
                required
                onChange={handleOnChange}
            ></textarea>
        </div>
        <div className="form-input">
            <label htmlFor="image">Recipe Image</label>
            <input 
                type="file" 
                className='input'
                id='image-i'
                name='file'
                required
             />

        </div>

         {/* Submit Button  */}
        <div className="form-input">
            <button type="submit" className="submit-button">
                Submit Recipe
            </button>
        </div>
    </form>
</div>

        

      
    </>
  )
}

export default AddRecipe
