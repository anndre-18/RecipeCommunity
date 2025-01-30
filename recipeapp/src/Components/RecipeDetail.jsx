import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './recipe-detail.css';

const RecipeDetail = () => {
  const { id } = useParams(); // Get recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setError("Failed to load recipe details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <p>Loading recipe details...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className="recipe-detail">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Ingredients:</strong></p>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p><strong>Instructions:</strong></p>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetail;