const express = require('express');
const Recipe = require('../models/Recipe');

const router = express.Router();

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new recipe
router.post('/', async (req, res) => {
  const { title, ingredients, instructions, cookingTime } = req.body;
  try {
    const recipe = new Recipe({ title, ingredients, instructions, cookingTime });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      res.status(409).json({ message: 'Recipe already exists' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// PUT update a recipe by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, instructions, cookingTime } = req.body;
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      id, { title, ingredients, instructions, cookingTime }, { new: true }
    );
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a recipe by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findByIdAndDelete(id);
    if (recipe) {
      res.json({ message: 'Recipe deleted' });
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
