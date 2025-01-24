const { log } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { v4 : uuidv4 } = require('uuid');

app.use(express.json());

// mongoose.connect("mongodb://localhost:27017/recipesDB").then(()=>{
//     console.log("Connected to MongoDB")
// })

mongoose.connect("mongodb+srv://anndre-18:sherrlyn31@cluster0.5afem.mongodb.net/recipeDB")//returns a promise
.then(()=>{
    console.log("Connected to MongoDB")
})


const recipeSchema = new mongoose.Schema({
    id:{type:String,required:true,unique:true},
    title:{type:String,required:true},
    ingredients:{type:String,required:true},
    description:{type:String,required:true}
});

const Recipe = mongoose.model("Recipe",recipeSchema);


 
app.get("/api/recipes",async(req,res)=>{
    try{
        const recipes=await Recipe.find();
        if(!recipes){
            res.status(404).send({message : "Sorry , No Recipe Found"});
            return;
        }
        res.status(200).json(recipes);
        console.log(recipes)
    }catch(error){
        res.status(500).json({message:"Internal Sever Error"})
    }
});


app.post("/api/recipes" ,async(req,res)=>{
    const{title,ingredients,description} = req.body;
    try{
        if(!title||!ingredients||!description){
            res.status(400).json({message:"Please fill all the required fields"})
            return
        }
        const newRecipe=new Recipe({
            id:uuidv4(),
            title:title,
            ingredients,
            description
        })
        const savedRecipe = await newRecipe.save()
        res.status(201).json(savedRecipe);

    }
    catch(error){
        res.status(500).json({message:"Internal server error"})
        console.error(error);
    }
});

app.delete("/api/recipes/:id",async (req, res) => {
        const { id } = req.params;
        try {
            const deleteRecipe = await Recipe.findOneAndDelete({ id: id });
            if(!deleteRecipe){
                res.status(404).json({message : "Recipe not found"})
                return
            }
            console.log(deleteRecipe)
            res.status(200).json({message:"Recipe Deleted Success "})
            
        }catch(error){
            res.status(500).json({message:"Internal Error"})
        }
    
    })

app.put("/api/recipes/:id", async (req,res)=>{
    const { id }=req.params;
    const { title, ingredients, description } = req.body;
    try{
        if(!title||!ingredients||!description){
            res.status(404).json({message:"Provide all the required fields"})
            return
        }
        const updatedRecipe = await Recipe.findOneAndUpdate(
            { id: id}, 
            { title, ingredients, description }, 
            { new: true }
        );
        if(!updatedRecipe){
             res.status(404).json({message:"Recipe not found"})
             return
        }
        console.log(updatedRecipe)
        res.status(200).json({message:"Recipe update success"})
    }catch(error){
        console.error(error)
        res.status(500).json({message:"Intenl Server Error"})
        
    }
})



app.listen(3000,()=>{
    console.log("Server is running");
});
