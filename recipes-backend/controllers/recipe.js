const util = require("../common/responses")
const Recipe = require("../models/recipe")
const service = require("../services/mongo")

async function createRecipe(req, res, next) {
    const recipe = new Recipe({
        title: req.body.title,
        steps: req.body.steps,
        ingredients: req.body.ingredients,
        img: req.body.img
    })

    try {
        let response = await service.create(recipe)
        res.status(201).json(util.successResponse(201, response))
    } catch (error) {
        res.status(500).json(util.failureResponse(500, error))
    }
}


async function listRecipe(req, res, next) {
    try {
        let response = await service.list(Recipe)
        res.status(200).json(util.successResponse(200, response))
    } catch (error) {
        res.status(500).json(util.failureResponse(500, error))
    }
}

async function getRecipe(req, res, next) {
    try {
        let response = await service.get(Recipe, req.params.id)
        res.status(200).json(util.successResponse(200, response))
    } catch (error) {
        res.status(500).json(util.failureResponse(500, error))
    }
}

async function dropRecipe(req, res, next) {
    try {
        let response = await service.drop(Recipe, req.params.id)
        res.status(200).json(util.successResponse(200, response))
    } catch (error) {
        res.status(500).json(util.failureResponse(500, error))
    }
}

async function updateRecipe(req, res, next) {
    let response
    try {
        const recipe = await Recipe.findOne({ _id: req.params.id })

        recipe.title = req.body.title,
        recipe.steps = req.body.steps,
        recipe.ingredients = req.body.ingredients,
        recipe.img = req.body.img

        let recipeResponse = await recipe.save()
        response = util.successResponse(200, recipeResponse)

    } catch (error) {
        response = util.failureResponse(500, error)
    }
    res.status(response.statusCode).json(response)
}

module.exports = {
    createRecipe,
    updateRecipe,
    listRecipe,
    getRecipe,
    dropRecipe
}