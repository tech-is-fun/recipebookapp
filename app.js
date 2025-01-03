function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.onclick = () => showRecipeDetail(recipe.id);
    
    card.innerHTML = `
        <h2>${recipe.title}</h2>
        <div class="recipe-info">
            <p>${recipe.category}</p>
            <p>Prep: ${recipe.prepTime} | Cook: ${recipe.cookTime}</p>
        </div>
    `;
    
    return card;
}

function showRecipeList() {
    document.getElementById('recipe-list').classList.remove('hidden');
    document.getElementById('recipe-detail').classList.add('hidden');
}

function showRecipeDetail(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    const recipeContent = document.getElementById('recipe-content');
    
    recipeContent.innerHTML = `
        <h1>${recipe.title}</h1>
        <div class="recipe-metadata">
            <p><strong>Category:</strong> ${recipe.category}</p>
            <p><strong>Yield:</strong> ${recipe.yield}</p>
            <p><strong>Prep Time:</strong> ${recipe.prepTime}</p>
            <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
        </div>
        
        <h2>Ingredients</h2>
        <ul class="ingredients-list">
            ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        
        <h2>Directions</h2>
        <ol class="directions-list">
            ${recipe.directions.map(step => `<li>${step}</li>`).join('')}
        </ol>
    `;
    
    document.getElementById('recipe-list').classList.add('hidden');
    document.getElementById('recipe-detail').classList.remove('hidden');
}

// Initialize the app
function initializeApp() {
    const recipeList = document.getElementById('recipe-list');
    recipes.forEach(recipe => {
        recipeList.appendChild(createRecipeCard(recipe));
    });
}

// Start the app when the page loads
window.onload = initializeApp;