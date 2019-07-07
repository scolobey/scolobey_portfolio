---
title: Introduction to My Recipe API
date: "2019-06-30T23:46:37.121Z"
template: "post"
draft: true
slug: "/posts/introduction-to-my-recipe-api/"
category: "Development"
tags:
  - "Node"
  - "API"
description: "I have a recipe API. It feeds my two mobile apps and my website. Lemme show you around."
---

Recipes are pretty fascinating. That's why I have this recipe API. Behind the simple interfaces I've built, I can play around with recipe data. there's not any data yet, but I'm working on that. So far, I've built the following endpoints that allow you to register and authenticate users, and post and retrieve recipes.

## Recipes
'/recipes', recipes.findAll);
'/', recipes.findAll);

| path | purpose |
| --- | --- |
| /recipes/:recipeTitle | |
| /recipesByUser/:userId | |


// Retrieve a single Recipe with recipeId
'/recipe/:recipeId', recipes.findOne);

// Update a Recipe with recipeId
app.put('/recipe/:recipeId', Auth.verifyRecipeOwner, recipes.update);

// Update a list of Recipes
app.put('/updateRecipes', Auth.verifyRecipeOwner, recipes.updateMany);

// Delete a list of Recipes
app.delete('/deleteRecipes', Auth.verifyBulkDelete, recipes.deleteMany);

// Delete a Recipe with recipeId
app.delete('/recipe/:recipeId', Auth.verifyRecipeOwner, recipes.delete);

# The Tools
Node.js
Express.js 
MongoDB via Mongoose
Chai

# Authentication

Authentication is  
