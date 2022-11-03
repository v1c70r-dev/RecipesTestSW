const express = require("express");
const router = express.Router();
const recipe = require('../controllers/recipe')

router.get('/recipe',recipe.listRecipe);
//router.get('/recipe/:id',recipe.getRecipe);
router.post('/recipe',recipe.createRecipe);
router.delete('/recipe/:id',recipe.dropRecipe);
router.put('/recipe/:id',recipe.updateRecipe);

module.exports = router;