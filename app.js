// Category functions
function createCategoryCard(category) {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.onclick = () => showRecipesByCategory(category);
    
    const recipeCount = recipes.filter(recipe => recipe.category === category).length;
    
    card.innerHTML = `
        <h2>${category}</h2>
        <p>${recipeCount} recipe${recipeCount !== 1 ? 's' : ''}</p>
    `;
    
    return card;
}

function showCategories() {
    document.getElementById('categories-list').classList.remove('hidden');
    document.getElementById('recipe-list').classList.add('hidden');
    document.getElementById('recipe-detail').classList.add('hidden');
}

function showRecipesByCategory(category) {
    const categoryRecipes = recipes.filter(recipe => recipe.category === category);
    const recipeGridContent = document.getElementById('recipe-grid-content');
    recipeGridContent.innerHTML = '';
    
    categoryRecipes.forEach(recipe => {
        recipeGridContent.appendChild(createRecipeCard(recipe));
    });
    
    document.getElementById('category-title').textContent = category;
    document.getElementById('categories-list').classList.add('hidden');
    document.getElementById('recipe-list').classList.remove('hidden');
    document.getElementById('recipe-detail').classList.add('hidden');
}

// Recipe card functions
function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    
    card.innerHTML = `
        <h2>${recipe.title}</h2>
        <div class="recipe-info">
            <p>Prep: ${recipe.prepTime} | Cook: ${recipe.cookTime}</p>
        </div>
    `;
    
    card.onclick = () => showRecipeDetail(recipe.id);
    return card;
}

function showRecipeList() {
    const currentCategory = document.getElementById('category-title').textContent;
    showRecipesByCategory(currentCategory);
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

// Recipe Modal functions
function showRecipeModal() {
    document.getElementById('recipeModal').classList.remove('hidden');
    document.getElementById('recipeForm').reset();
}

function closeRecipeModal() {
    document.getElementById('recipeModal').classList.add('hidden');
    document.getElementById('recipeForm').reset();
}

function saveRecipe(event) {
    event.preventDefault();
    
    const recipeData = {
        id: Math.max(...recipes.map(r => r.id), 0) + 1,
        title: document.getElementById('recipeTitle').value,
        category: document.getElementById('recipeCategory').value,
        yield: document.getElementById('recipeYield').value,
        prepTime: document.getElementById('recipePrepTime').value,
        cookTime: document.getElementById('recipeCookTime').value,
        ingredients: document.getElementById('recipeIngredients').value.split('\n').filter(i => i.trim()),
        directions: document.getElementById('recipeDirections').value.split('\n').filter(d => d.trim())
    };

    // Display the recipe data in console for copying
    console.log('New Recipe to add to recipes.js:');
    console.log(JSON.stringify(recipeData, null, 2));
    
    alert('Recipe submitted! Please check the browser console (F12) to copy the recipe data.');
    
    closeRecipeModal();
    showRecipesByCategory(recipeData.category);
}

// Initialize the app
function initializeApp() {
    // Set up event listeners
    document.getElementById('addRecipeBtn').onclick = showRecipeModal;
    document.getElementById('recipeForm').onsubmit = saveRecipe;
    
    // Display categories
    const categoriesList = document.getElementById('categories-list');
    categories.forEach(category => {
        categoriesList.appendChild(createCategoryCard(category));
    });
}

// Start the app when the page loads
window.onload = initializeApp;