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