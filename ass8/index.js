
var recipes = [
    {
        id: 1,
        title: "Beef Tacos",
        description: "Flavorful Mexican tacos with seasoned ground beef",
        rating: 4.6,
        reviews: 278,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
        prepTime: "15 min",
        cookTime: "20 min",
        servings: "4 people",
        tags: [
            {name: "Easy", color: "success"},
            {name: "American", color: "primary"}
        ],
        ingredients: [
            "500g ground beef",
            "8 taco shells",
            "1 onion, diced",
            "2 tablespoons taco seasoning",
            "Shredded lettuce",
            "Diced tomatoes",
            "Shredded cheddar cheese",
            "Sour cream",
            "Salsa"
        ],
        instructions: [
            "Cook ground beef in a large skillet over medium heat",
            "Add diced onion and cook until softened",
            "Stir in taco seasoning and water, simmer 5 min",
            "Warm taco shells in oven for 3-4 min",
            "Fill shells with beef mixture and toppings"
        ],
        nutrition: [
            { name: "Calories", value: "380 kcal", icon: "fa-fire-flame-curved" },
            { name: "Protein", value: "24g", icon: "fa-dumbbell" },
            { name: "Carbohydrates", value: "28g", icon: "fa-wheat-awn" },
            { name: "Fat", value: "20g", icon: "fa-droplet" },
            { name: "Fiber", value: "3g", icon: "fa-seedling" },
            { name: "Sodium", value: "890mg", icon: "fa-cube" }
        ],
        tips: [
            "Toast shells for extra crunch",
            "Add avocado for creaminess",
            "Serve with lime wedges for freshness"
        ]
    },
    {
        id: 2,
        title: "Teriyaki Chicken Bowl",
        description: "Sweet and savory chicken over rice with vegetables",
        rating: 4.7,
        reviews: 367,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        prepTime: "15 min",
        cookTime: "20 min",
        servings: "2 people",
        tags: [
            {name: "Easy", color: "success"},
            {name: "Asian", color: "primary"}
        ],
        ingredients: [
            "2 chicken breasts, sliced",
            "3 tbsp teriyaki sauce",
            "1 cup cooked rice",
            "1 cup mixed vegetables",
            "2 green onions, chopped",
            "1 tbsp sesame oil"
        ],
        instructions: [
            "Cook rice according to package instructions",
            "Heat sesame oil in pan and cook chicken for 5-6 min",
            "Add teriyaki sauce and simmer for 3 min",
            "Steam vegetables until tender",
            "Serve chicken over rice with vegetables and garnish with green onions"
        ],
        nutrition: [
            { name: "Calories", value: "540 kcal", icon: "fa-fire-flame-curved" },
            { name: "Protein", value: "42g", icon: "fa-dumbbell" },
            { name: "Carbohydrates", value: "58g", icon: "fa-wheat-awn" },
            { name: "Fat", value: "14g", icon: "fa-droplet" },
            { name: "Fiber", value: "4g", icon: "fa-seedling" },
            { name: "Sodium", value: "1240mg", icon: "fa-cube" }
        ],
        tips: [
            "Marinate chicken for 30 min for better flavor",
            "Don't overcook the vegetables to keep them crisp",
            "Add sesame seeds on top for extra crunch"
        ]
    },
    {
        id: 3,
        title: "Spaghetti Carbonara",
        description: "Classic Italian pasta with eggs, cheese and bacon",
        rating: 4.9,
        reviews: 512,
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3",
        prepTime: "10 min",
        cookTime: "15 min",
        servings: "3 people",
        tags: [
            {name: "Medium", color: "warning"},
            {name: "Italian", color: "danger"}
        ],
        ingredients: [
            "400g spaghetti",
            "200g pancetta or bacon",
            "3 large eggs",
            "1 cup parmesan cheese",
            "Black pepper to taste",
            "2 cloves garlic, minced"
        ],
        instructions: [
            "Boil pasta in salted water until al dente",
            "Fry pancetta until crispy, add garlic",
            "Whisk eggs with parmesan and lots of black pepper",
            "Drain pasta and mix with hot pancetta",
            "Remove from heat and quickly stir in egg mixture"
        ],
        nutrition: [
            { name: "Calories", value: "650 kcal", icon: "fa-fire-flame-curved" },
            { name: "Protein", value: "28g", icon: "fa-dumbbell" },
            { name: "Carbohydrates", value: "72g", icon: "fa-wheat-awn" },
            { name: "Fat", value: "26g", icon: "fa-droplet" },
            { name: "Fiber", value: "3g", icon: "fa-seedling" },
            { name: "Sodium", value: "980mg", icon: "fa-cube" }
        ],
        tips: [
            "Use room temperature eggs so they don't scramble",
            "Authentic carbonara has NO cream",
            "Save 1 cup pasta water to adjust sauce consistency"
        ]
    },
    {
        id: 4,
        title: "Chicken Caesar Salad",
        description: "Fresh romaine lettuce with grilled chicken and homemade dressing",
        rating: 4.6,
        reviews: 289,
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddf93",
        prepTime: "12 min",
        cookTime: "8 min",
        servings: "2 people",
        tags: [
            {name: "Easy", color: "success"},
            {name: "Healthy", color: "info"}
        ],
        ingredients: [
            "2 chicken breasts",
            "1 large romaine lettuce",
            "1/2 cup croutons",
            "1/4 cup parmesan cheese",
            "Caesar dressing",
            "1 lemon, juiced"
        ],
        instructions: [
            "Season and grill chicken breasts for 6-8 min per side",
            "Chop romaine lettuce into bite-sized pieces",
            "Slice grilled chicken into strips",
            "Toss lettuce with dressing in large bowl",
            "Top with chicken, croutons and parmesan"
        ],
        nutrition: [
            { name: "Calories", value: "420 kcal", icon: "fa-fire-flame-curved" },
            { name: "Protein", value: "38g", icon: "fa-dumbbell" },
            { name: "Carbohydrates", value: "18g", icon: "fa-wheat-awn" },
            { name: "Fat", value: "22g", icon: "fa-droplet" },
            { name: "Fiber", value: "5g", icon: "fa-seedling" },
            { name: "Sodium", value: "780mg", icon: "fa-cube" }
        ],
        tips: [
            "Let chicken rest 5 min before slicing",
            "Make your own croutons for better flavor",
            "Add anchovies to dressing for authentic taste"
        ]
    }
];

var currentRecipe = 0;


function displayRecipe() {
    var recipe = recipes[currentRecipe];

    document.getElementById("rating-text").innerText = recipe.rating + " (" + recipe.reviews + " reviews)";
    document.getElementById("recipe-img").src = recipe.image;
    document.getElementById("prep-time").innerText = recipe.prepTime;
    document.getElementById("cook-time").innerText = recipe.cookTime;
    document.getElementById("servings").innerText = recipe.servings;
    document.getElementById("recipe-title").innerText = recipe.title;
    document.getElementById("recipe-desc").innerText = recipe.description;


    var tagsHtml = "";
    for (var i = 0; i < recipe.tags.length; i++) {
        tagsHtml += '<span class="badge bg-' + recipe.tags[i].color + '-subtle text-' + recipe.tags[i].color + ' rounded-pill me-2 px-3 py-2">' + recipe.tags[i].name + '</span>';
    }
    document.getElementById("tags-container").innerHTML = tagsHtml;

    showTab("ingredients", document.querySelector(".custom-tabs.nav-link.active"));
}


function showTab(tabName, button) {
    var recipe = recipes[currentRecipe];

    var allButtons = document.querySelectorAll(".custom-tabs.nav-link");
    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove("active");
        allButtons[i].classList.add("text-secondary");
    }

    button.classList.add("active");
    button.classList.remove("text-secondary");

    var content = document.getElementById("tab-content");
    var html = "";

    if (tabName == "ingredients") {
        html = '<div class="ingredients-list">';
        for (var i = 0; i < recipe.ingredients.length; i++) {
            html += '<div class="ingredient-item">';
            html += '<div class="number-badge">' + (i + 1) + '</div>';
            html += '<span>' + recipe.ingredients[i] + '</span>';
            html += '</div>';
        }
        html += '</div>';
    }
    else if (tabName == "instructions") {
        html = "<ol class='ps-3 lh-lg'>";
        for (var i = 0; i < recipe.instructions.length; i++) {
            html += "<li class='mb-2'>" + recipe.instructions[i] + "</li>";
        }
        html += "</ol>";
    }
    else if (tabName == "nutrition") {
        for (var i = 0; i < recipe.nutrition.length; i++) {
            html += '<div class="nutrition-item">';
            html += '<div class="nutrition-left"><i class="fa-solid ' + recipe.nutrition[i].icon + '"></i>' + recipe.nutrition[i].name + '</div>';
            html += '<div class="nutrition-value">' + recipe.nutrition[i].value + '</div>';
            html += '</div>';
        }
    }
    else if (tabName == "tips") {
        html = "<ul class='ps-3 lh-lg'>";
        for (var i = 0; i < recipe.tips.length; i++) {
            html += "<li class='mb-2'>" + recipe.tips[i] + "</li>";
        }
        html += "</ul>";
    }

    content.innerHTML = html;
}
function tryAnotherRecipe() {
    currentRecipe = currentRecipe + 1;
    if (currentRecipe >= recipes.length) {
        currentRecipe = 0;
    }
    displayRecipe();
}


displayRecipe();