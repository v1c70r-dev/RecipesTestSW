//mongoDB schema

const mongoose = require('mongoose');
const ingredientSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        quantity:{
            type: String,
            required: true
        }
    }
);

const recipeSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required: true
        },
        steps:{
            type: [String],
            required: true
        },
        ingredients: {
            type: [ingredientSchema],
            required: true
        },
        img:{
            type:String,
            required: false
        }
    }
);

module.exports = mongoose.model('Recipe',recipeSchema);