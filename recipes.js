// Recipes Database
const recipesData = [
    {
        id: 1,
        name: "Spaghetti Carbonara",
        category: "Italian",
        type: "Dinner",
        time: 20,
        servings: "4 servings",
        description: "Classic Italian pasta with creamy sauce, bacon, and parmesan cheese.",
        rating: 5,
        reviews: 248,
        icon: "🍝",
        ingredients: ["Spaghetti", "Bacon", "Eggs", "Parmesan Cheese", "Black Pepper", "Salt"],
        difficulty: "Easy"
    },
    {
        id: 2,
        name: "Vegetable Stir Fry",
        category: "Asian",
        type: "Lunch",
        time: 15,
        servings: "2-3 servings",
        description: "Quick and healthy stir-fried vegetables with soy sauce and garlic.",
        rating: 4,
        reviews: 156,
        icon: "🍜",
        ingredients: ["Mixed Vegetables", "Soy Sauce", "Garlic", "Ginger", "Oil", "Salt"],
        difficulty: "Easy"
    },
    {
        id: 3,
        name: "Fluffy Pancakes",
        category: "Breakfast",
        type: "Breakfast",
        time: 25,
        servings: "4 servings",
        description: "Soft and fluffy pancakes perfect for a weekend breakfast with syrup and berries.",
        rating: 5,
        reviews: 312,
        icon: "🥞",
        ingredients: ["Flour", "Eggs", "Milk", "Baking Powder", "Sugar", "Butter"],
        difficulty: "Easy"
    },
    {
        id: 4,
        name: "Chicken Tikka Masala",
        category: "Indian",
        type: "Dinner",
        time: 45,
        servings: "4-5 servings",
        description: "Tender chicken in a rich and creamy tomato-based curry sauce. Serve with rice or naan.",
        rating: 5,
        reviews: 289,
        icon: "🍱",
        ingredients: ["Chicken", "Yogurt", "Tomato Sauce", "Cream", "Spices", "Onion", "Garlic"],
        difficulty: "Medium"
    },
    {
        id: 5,
        name: "Chocolate Lava Cake",
        category: "Dessert",
        type: "Desserts",
        time: 20,
        servings: "2 servings",
        description: "Rich and decadent chocolate cake with a gooey center. Perfect for chocolate lovers.",
        rating: 5,
        reviews: 421,
        icon: "🍰",
        ingredients: ["Dark Chocolate", "Butter", "Eggs", "Sugar", "Flour", "Vanilla Extract"],
        difficulty: "Medium"
    },
    {
        id: 6,
        name: "Caesar Salad",
        category: "Healthy",
        type: "Lunch",
        time: 10,
        servings: "2-3 servings",
        description: "Fresh and crispy salad with homemade Caesar dressing and parmesan shavings.",
        rating: 4,
        reviews: 198,
        icon: "🥗",
        ingredients: ["Lettuce", "Parmesan", "Croutons", "Caesar Dressing", "Lemon"],
        difficulty: "Easy"
    }
];

// DOM Elements
const searchBar = document.querySelector('.search-bar');
const filterButtons = document.querySelectorAll('.filter-btn');
const recipesGrid = document.querySelector('.recipes-grid');
const recipesCards = document.querySelectorAll('.recipe-card');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    addEventListeners();
    setupSubmitButton();
});

// Add Event Listeners
function addEventListeners() {
    // Search functionality
    if (searchBar) {
        searchBar.addEventListener('input', filterRecipes);
    }

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterRecipes();
        });
    });

    // View Recipe buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showRecipeDetail(index);
        });
    });
}

// Filter Recipes
function filterRecipes() {
    const searchTerm = searchBar.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').textContent.trim();
    
    const cards = document.querySelectorAll('.recipe-card');
    let visibleCount = 0;

    cards.forEach((card, index) => {
        const recipe = recipesData[index];
        const matchesSearch = recipe.name.toLowerCase().includes(searchTerm) ||
                            recipe.description.toLowerCase().includes(searchTerm) ||
                            recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm));
        
        const matchesFilter = activeFilter === 'All' || 
                            recipe.type === activeFilter;

        if (matchesSearch && matchesFilter) {
            card.style.display = 'flex';
            card.style.animation = 'slideIn 0.3s ease';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Show no results message
    if (visibleCount === 0) {
        showNoResults();
    } else {
        removeNoResults();
    }
}

// Show No Results Message
function showNoResults() {
    const existingMsg = document.querySelector('.no-results');
    if (existingMsg) return;

    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; color: #7f8c8d;">
            <p style="font-size: 1.2rem; margin-bottom: 10px;">😔 No recipes found</p>
            <p>Try adjusting your search or filters</p>
        </div>
    `;
    recipesGrid.parentElement.insertBefore(noResults, recipesGrid);
}

// Remove No Results Message
function removeNoResults() {
    const existingMsg = document.querySelector('.no-results');
    if (existingMsg) existingMsg.remove();
}

// Show Recipe Detail Modal
function showRecipeDetail(index) {
    const recipe = recipesData[index];
    
    const modal = document.createElement('div');
    modal.className = 'recipe-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-header">
                <span class="modal-icon">${recipe.icon}</span>
                <h2>${recipe.name}</h2>
                <p class="modal-category">${recipe.category} • ${recipe.type}</p>
            </div>
            
            <div class="modal-body">
                <div class="modal-section">
                    <h3>📋 Recipe Info</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Time</span>
                            <span class="info-value">${recipe.time} mins</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Servings</span>
                            <span class="info-value">${recipe.servings}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Difficulty</span>
                            <span class="info-value">${recipe.difficulty}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Rating</span>
                            <span class="info-value">${getStars(recipe.rating)}</span>
                        </div>
                    </div>
                </div>

                <div class="modal-section">
                    <h3>📝 Description</h3>
                    <p>${recipe.description}</p>
                </div>

                <div class="modal-section">
                    <h3>🛒 Ingredients</h3>
                    <ul class="ingredients-list">
                        ${recipe.ingredients.map(ing => `<li>✓ ${ing}</li>`).join('')}
                    </ul>
                </div>

                <div class="modal-section">
                    <h3>⭐ Reviews</h3>
                    <p>${getStars(recipe.rating)} (${recipe.reviews} reviews)</p>
                </div>
            </div>

            <div class="modal-footer">
                <button class="print-btn">🖨️ Print Recipe</button>
                <button class="save-btn">❤️ Save Recipe</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.animation = 'fadeIn 0.3s ease';

    // Close modal
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    });

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }
    });

    // Print functionality
    modal.querySelector('.print-btn').addEventListener('click', () => {
        printRecipe(recipe);
    });

    // Save functionality
    modal.querySelector('.save-btn').addEventListener('click', function() {
        saveRecipe(recipe);
        this.style.color = '#e74c3c';
        this.textContent = '❤️ Saved!';
        setTimeout(() => {
            this.style.color = '';
            this.textContent = '❤️ Save Recipe';
        }, 2000);
    });
}

// Get Stars HTML
function getStars(rating) {
    return '⭐'.repeat(rating) + (rating < 5 ? '☆'.repeat(5 - rating) : '');
}

// Print Recipe
function printRecipe(recipe) {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${recipe.name}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                h1 { color: #2ea984; }
                h3 { color: #2ea984; margin-top: 20px; }
                ul { line-height: 1.8; }
                .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
            </style>
        </head>
        <body>
            <h1>${recipe.name}</h1>
            <p><strong>Category:</strong> ${recipe.category} • ${recipe.type}</p>
            <p><strong>Rating:</strong> ${getStars(recipe.rating)}</p>
            
            <h3>Recipe Information</h3>
            <p><strong>Cooking Time:</strong> ${recipe.time} minutes</p>
            <p><strong>Servings:</strong> ${recipe.servings}</p>
            <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
            
            <h3>Description</h3>
            <p>${recipe.description}</p>
            
            <h3>Ingredients</h3>
            <ul>
                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
            
            <p style="margin-top: 40px; text-align: center; color: #7f8c8d;">
                Printed from Culinary Recipes • ${new Date().toLocaleDateString()}
            </p>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Save Recipe
function saveRecipe(recipe) {
    let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    
    const isAlreadySaved = savedRecipes.some(r => r.id === recipe.id);
    if (!isAlreadySaved) {
        savedRecipes.push(recipe);
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
        showNotification(`${recipe.name} saved to your collection!`);
    } else {
        showNotification('Already saved!');
    }
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #2ea984;
        color: white;
        padding: 15px 25px;
        border-radius: 6px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Setup Submit Button
function setupSubmitButton() {
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function() {
            showSubmitRecipeForm();
        });
    }
}

// Show Submit Recipe Form
function showSubmitRecipeForm() {
    const modal = document.createElement('div');
    modal.className = 'recipe-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>Share Your Recipe</h2>
            <form class="recipe-form">
                <div class="form-group">
                    <label>Recipe Name *</label>
                    <input type="text" required placeholder="Enter recipe name">
                </div>
                <div class="form-group">
                    <label>Category *</label>
                    <input type="text" required placeholder="e.g., Italian, Asian, Indian">
                </div>
                <div class="form-group">
                    <label>Cooking Time (minutes) *</label>
                    <input type="number" required min="1" placeholder="20">
                </div>
                <div class="form-group">
                    <label>Description *</label>
                    <textarea required placeholder="Describe your recipe" rows="4"></textarea>
                </div>
                <div class="form-group">
                    <label>Ingredients (comma separated) *</label>
                    <textarea required placeholder="Flour, Eggs, Milk..." rows="3"></textarea>
                </div>
                <button type="submit" class="form-submit">✓ Submit Recipe</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.animation = 'fadeIn 0.3s ease';

    // Close modal
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    });

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }
    });

    // Form submission
    const form = modal.querySelector('.recipe-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        showNotification('✓ Thank you! Your recipe has been submitted. We\'ll review it soon!');
        setTimeout(() => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }, 1500);
    });
}

// Add CSS Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(300px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(300px);
        }
    }

    .recipe-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
    }

    .modal-content {
        background-color: white;
        border-radius: 12px;
        padding: 40px;
        max-width: 600px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .modal-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 2rem;
        color: #7f8c8d;
        cursor: pointer;
        transition: color 0.3s ease;
    }

    .modal-close:hover {
        color: #2c3e50;
    }

    .modal-header {
        text-align: center;
        margin-bottom: 30px;
    }

    .modal-icon {
        font-size: 4rem;
        display: block;
        margin-bottom: 15px;
    }

    .modal-header h2 {
        color: #2ea984;
        margin-bottom: 8px;
    }

    .modal-category {
        color: #7f8c8d;
        font-size: 0.95rem;
    }

    .modal-section {
        margin-bottom: 30px;
    }

    .modal-section h3 {
        color: #2ea984;
        margin-bottom: 15px;
        font-size: 1.1rem;
    }

    .info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
    }

    .info-item {
        background-color: #f9f7f4;
        padding: 15px;
        border-radius: 6px;
    }

    .info-label {
        display: block;
        color: #7f8c8d;
        font-size: 0.85rem;
        margin-bottom: 5px;
    }

    .info-value {
        display: block;
        color: #2c3e50;
        font-weight: 600;
    }

    .ingredients-list {
        list-style: none;
        padding: 0;
    }

    .ingredients-list li {
        padding: 10px 0;
        border-bottom: 1px solid #e8e8e8;
        color: #2c3e50;
    }

    .ingredients-list li:last-child {
        border-bottom: none;
    }

    .modal-footer {
        display: flex;
        gap: 15px;
        margin-top: 30px;
    }

    .print-btn,
    .save-btn {
        flex: 1;
        padding: 12px 20px;
        border: 2px solid #2ea984;
        background-color: white;
        color: #2ea984;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .print-btn:hover,
    .save-btn:hover {
        background-color: #2ea984;
        color: white;
    }

    .recipe-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    .form-group label {
        color: #2c3e50;
        font-weight: 600;
        margin-bottom: 8px;
    }

    .form-group input,
    .form-group textarea {
        padding: 12px;
        border: 2px solid #e8e8e8;
        border-radius: 6px;
        font-family: inherit;
        font-size: 0.95rem;
        transition: border-color 0.3s ease;
    }

    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #2ea984;
    }

    .form-submit {
        padding: 12px 20px;
        background-color: #2ea984;
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1rem;
    }

    .form-submit:hover {
        background-color: #219876;
    }

    .form-submit:active {
        transform: scale(0.98);
    }

    @media (max-width: 480px) {
        .modal-content {
            padding: 25px;
        }

        .info-grid {
            grid-template-columns: 1fr;
        }

        .modal-footer {
            flex-direction: column;
        }
    }
`;
document.head.appendChild(style);
