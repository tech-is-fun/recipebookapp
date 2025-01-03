// Store recipes in localStorage to persist data
let recipes = JSON.parse(localStorage.getItem('recipes')) || [
    {
        id: 1,
        title: "Classic Chocolate Chip Cookies",
        yield: "24 cookies",
        category: "Dessert",
        cookTime: "12 minutes",
        prepTime: "15 minutes",
        ingredients: [
            "2 1/4 cups all-purpose flour",
            "1 tsp baking soda",
            "1 tsp salt",
            "1 cup butter, softened",
            "3/4 cup sugar",
            "3/4 cup packed brown sugar",
            "1 tsp vanilla extract",
            "2 large eggs",
            "2 cups semi-sweet chocolate chips"
        ],
        directions: [
            "Preheat oven to 375°F (190°C)",
            "In a bowl, mix flour, baking soda, and salt",
            "In a large bowl, beat butter and sugars until creamy",
            "Beat in vanilla and eggs to butter mixture",
            "Gradually stir flour mixture into butter mixture",
            "Stir in chocolate chips",
            "Drop rounded tablespoons of dough onto ungreased baking sheets",
            "Bake for 9 to 11 minutes or until golden brown",
            "Let cool on baking sheets for 2 minutes"
        ]
    },
    {
        id: 2,
        title: "Classic Caesar Salad",
        yield: "4 servings",
        category: "Appetizer",
        cookTime: "0 minutes",
        prepTime: "20 minutes",
        ingredients: [
            "2 heads romaine lettuce",
            "1/2 cup Caesar dressing",
            "1/2 cup croutons",
            "1/4 cup grated Parmesan cheese",
            "Fresh ground black pepper"
        ],
        directions: [
            "Wash and chop romaine lettuce",
            "In a large bowl, toss lettuce with Caesar dressing",
            "Add croutons and toss lightly",
            "Sprinkle with Parmesan cheese and fresh ground pepper",
            "Serve immediately"
        ]
    }
];

// Save recipes to localStorage
function saveRecipes() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Initialize recipes in localStorage if not already present
if (!localStorage.getItem('recipes')) {
    saveRecipes();
}

const categories = ["Appetizer", "Main Course", "Dessert", "Beverage"];

// Authentication state
let isAuthenticated = false;
const ADMIN_PASSWORD = "Jamieisc00l";