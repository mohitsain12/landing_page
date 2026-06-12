function toggleMenu(category) {
    category.classList.toggle("active");
}

const recipes = {
    pizza: {
        name: "Pizza",
        ingredients: "Dough, Cheese, Tomato Sauce",
        instructions: "Bake at 220°C for 15 minutes."
    },

    pasta: {
        name: "Pasta",
        ingredients: "Pasta, Sauce, Vegetables",
        instructions: "Boil pasta and mix with sauce."
    },

    risotto: {
        name: "Risotto",
        ingredients: "Rice, Broth, Cheese",
        instructions: "Cook rice slowly with broth."
    },

    biryani: {
        name: "Biryani",
        ingredients: "Rice, Meat (Chicken/Lamb), Spices, Yogurt, Onions",
        instructions: "Layer cooked rice with marinated meat. Cook on low heat for 45 minutes with lid on."
    },

    butterChicken: {
        name: "Butter Chicken",
        ingredients: "Chicken, Butter, Cream, Tomato Sauce, Spices",
        instructions: "Marinate chicken in yogurt and spices. Cook in butter and cream sauce for 30 minutes."
    },

    samosa: {
        name: "Samosa",
        ingredients: "Pastry Sheet, Potatoes, Peas, Spices, Oil",
        instructions: "Fill pastry with spiced potato mixture and deep fry until golden brown."
    },

    tacos: {
        name: "Tacos",
        ingredients: "Tortillas, Ground Meat, Lettuce, Tomato, Cheese, Salsa",
        instructions: "Brown meat with spices, fill tortillas with meat and toppings."
    },

    enchiladas: {
        name: "Enchiladas",
        ingredients: "Tortillas, Chicken, Cheese, Red Sauce, Sour Cream",
        instructions: "Fill tortillas with chicken, roll, cover with sauce. Bake at 180°C for 25 minutes."
    },

    guacamole: {
        name: "Guacamole",
        ingredients: "Avocados, Lime, Cilantro, Onion, Tomato, Salt",
        instructions: "Mash avocados with lime juice. Mix in diced vegetables. Season to taste."
    },

    friedRice: {
        name: "Fried Rice",
        ingredients: "Cooked Rice, Eggs, Vegetables, Soy Sauce, Garlic, Oil",
        instructions: "Stir-fry vegetables and garlic, add rice and eggs. Season with soy sauce."
    },

    dumplings: {
        name: "Dumplings",
        ingredients: "Dumpling Wrapper, Ground Pork, Cabbage, Green Onions, Soy Sauce",
        instructions: "Fill wrappers with filling, fold and either steam or pan-fry for 8-10 minutes."
    },

    kungPaoChicken: {
        name: "Kung Pao Chicken",
        ingredients: "Chicken, Peanuts, Dried Chilies, Soy Sauce, Vinegar, Garlic",
        instructions: "Stir-fry chicken until cooked. Add sauce and peanuts. Cook for 5 minutes."
    }
};

function showRecipe(event, recipeId) {

    event.stopPropagation();

    document.getElementById("recipe-container").innerHTML = `
        <h2>${recipes[recipeId].name}</h2>
        <h3>Ingredients</h3>
        <p>${recipes[recipeId].ingredients}</p>

        <h3>Instructions</h3>
        <p>${recipes[recipeId].instructions}</p>
    `;
}