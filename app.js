// Authentication functions
function showLoginModal() {
    document.getElementById('loginModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('loginModal').classList.add('hidden');
    document.getElementById('passwordInput').value = '';
}

function checkPassword() {
    const password = document.getElementById('passwordInput').value;
    if (password === ADMIN_PASSWORD) {
        isAuthenticated = true;
        updateAuthUI();
        closeModal();
    } else {
        alert('Incorrect password');
    }
}

function logout() {
    isAuthenticated = false;
    updateAuthUI();
}

function updateAuthUI() {
    document.getElementById('loginBtn').classList.toggle('hidden', isAuthenticated);
    document.getElementById('logoutBtn').classList.toggle('hidden', !isAuthenticated);
    document.getElementById('addRecipeBtn').classList.toggle('hidden', !isAuthenticated);
    document.querySelectorAll('.recipe-actions').forEach(el => {
        el.style.display = isAuthenticated ? 'block' : 'none';
    });
}

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
    
    const actionButtons = isAuthenticated ? `
        <div class="recipe-actions">
            <button class="action-button" onclick="event.stopPropagation(); editRecipe(${recipe.id})">Edit</button>
            <button class="action-button" onclick="event.stopPropagation(); deleteRecipe(${recipe.id})">Delete</button>
        </div>
    ` : '';
    
    card.innerHTML = `
        ${actionButtons}
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

// Recipe CRUD operations
function showRecipeModal(recipe = null) {
    const modal = document.getElementById('recipeModal');
    const form = document.getElementById('recipeForm');
    const title = document.getElementById('recipeModalTitle');
    
    title.textContent = recipe ? 'Edit Recipe' : 'Add New Recipe';
    
    if (recipe) {
        document.getElementById('recipeTitle').value = recipe.title;
        document.getElementById('recipeCategory').value = recipe.category;
        document.getElementById('recipeYield').value = recipe.yield;
        document.getElementById('recipePrepTime').value = recipe.prepTime;
        document.getElementById('recipeCookTime').value = recipe.cookTime;
        document.getElementById('recipeIngredients').value = recipe.ingredients.join('\n');
        document.getElementById('recipeDirections').value = recipe.directions.join('\n');
        form.dataset.editId = recipe.id;
    } else {
        form.reset();
        delete form.dataset.editId;
    }
    
    modal.classList.remove('hidden');
}

function closeRecipeModal() {
    document.getElementById('recipeModal').classList.add('hidden');
    document.getElementById('recipeForm').reset();
}

function saveRecipe(event) {
    event.preventDefault();
    
    const form = event.target;
    const recipeData = {
        title: document.getElementById('recipeTitle').value,
        category: document.getElementById('recipeCategory').value,
        yield: document.getElementById('recipeYield').value,
        prepTime: document.getElementById('recipePrepTime').value,
        cookTime: document.getElementById('recipeCookTime').value,
        ingredients: document.getElementById('recipeIngredients').value.split('\n').filter(i => i.trim()),
        directions: document.getElementById('recipeDirections').value.split('\n').filter(d => d.trim())
    };
    
    if (form.dataset.editId) {
        // Edit existing recipe
        recipeData.id = parseInt(form.dataset.editId);
        const index = recipes.findIndex(r => r.id === recipeData.id);
        recipes[index] = recipeData;
    } else {
        // Add new recipe
        recipeData.id = Math.max(...recipes.map(r => r.id), 0) + 1;
        recipes.push(recipeData);
    }
    
    saveRecipes();
    closeRecipeModal();
    showRecipesByCategory(recipeData.category);
}

function editRecipe(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    showRecipeModal(recipe);
}

function deleteRecipe(recipeId) {
    if (confirm('Are you sure you want to delete this recipe?')) {
        const index = recipes.findIndex(r => r.id === recipeId);
        const category = recipes[index].category;
        recipes.splice(index, 1);
        saveRecipes();
        showRecipesByCategory(category);
    }
}

// Initialize the app
function initializeApp() {
    // Set up event listeners
    document.getElementById('loginBtn').onclick = showLoginModal;
    document.getElementById('logoutBtn').onclick = logout;
    document.getElementById('addRecipeBtn').onclick = () => showRecipeModal();
    document.getElementById('recipeForm').onsubmit = saveRecipe;
    
    // Display categories
    const categoriesList = document.getElementById('categories-list');
    categories.forEach(category => {
        categoriesList.appendChild(createCategoryCard(category));
    });
    
    // Update UI based on authentication state
    updateAuthUI();
}

// Start the app when the page loads
window.onload = initializeApp;