import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const AddRecipe = () => {
    const [recipedata, setRecipedata] = useState({
        title: '',
        ingredients: '',
        instruction: '',
        image: null,
        time: '', // Add time field
    });
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value, files } = e.target;

        setRecipedata((prev) => ({
            ...prev,
            [name]: name === "image" ? files[0] : value,
        }));
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("title", recipedata.title);
        formData.append("ingredients", JSON.stringify(recipedata.ingredients.split(','))); // Store as an array
        formData.append("instruction", recipedata.instruction);
        formData.append("time", recipedata.time); // Add time to the formData
        if (recipedata.image) {
            formData.append("image", recipedata.image);
        }

        try {
            const token = localStorage.getItem("token"); // Ensure user is authenticated
            const response = await axios.post('http://localhost:3000/api/recipes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, // Include token if required
                },
            });

            console.log("Recipe uploaded successfully:", response.data);
            alert("Recipe added successfully!");

            navigate("/"); // Redirect after success
        } catch (error) {
            console.error("Error uploading recipe:", error.response?.data || error);
            alert("Failed to upload recipe. Please try again.");
        }
    };

    return (
        <div className="recipe-content">
            <form className="form" onSubmit={handleOnSubmit}>
                <div className="form-input">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" required placeholder="Enter recipe title" onChange={handleOnChange} />
                </div>

                <div className="form-input">
                    <label htmlFor="ingredients">Ingredients</label>
                    <textarea name="ingredients" required placeholder="List ingredients, separated by commas" onChange={handleOnChange}></textarea>
                </div>

                <div className="form-input">
                    <label htmlFor="instruction">Instructions</label>
                    <textarea name="instruction" required placeholder="Describe preparation steps" onChange={handleOnChange}></textarea>
                </div>

                <div className="form-input">
                    <label htmlFor="time">Time (in minutes)</label>
                    <input type="number" name="time" required placeholder="Enter preparation time" onChange={handleOnChange} />
                </div>

                <div className="form-input">
                    <label htmlFor="image">Recipe Image</label>
                    <input type="file" name="image" required onChange={handleOnChange} />
                </div>

                <div className="form-input">
                    <button type="submit" className="submit-button">Submit Recipe</button>
                </div>
            </form>
        </div>
    );
};

export default AddRecipe;
