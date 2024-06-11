const apiUrl = 'http://localhost:5000/api/recipes';

// Fetch and display recipes
async function fetchRecipes() {
    const response = await fetch(apiUrl);
    const recipes = await response.json();
    const tbody = document.querySelector('#recipes-table tbody');
    tbody.innerHTML = '';
    recipes.forEach(recipe => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${recipe.title}</td>
            <td>${recipe.ingredients.join(', ')}</td>
            <td>${recipe.instructions}</td>
            <td>${recipe.cookingTime}</td>
            <td>
                <button class="update" onclick="updateRecipe('${recipe._id}')">Update</button>
                <button class="delete" onclick="deleteRecipe('${recipe._id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Add new recipe
document.getElementById('new-recipe-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value.split(',');
    const instructions = document.getElementById('instructions').value;
    const cookingTime = document.getElementById('cookingTime').value;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, ingredients, instructions, cookingTime })
    });
    if (response.ok) {
        fetchRecipes();
    } else {
        console.error('Error adding recipe:', await response.json());
    }
});

// Update recipe
async function updateRecipe(id) {
    const title = prompt('New title:');
    const ingredients = prompt('New ingredients (comma separated):').split(',');
    const instructions = prompt('New instructions:');
    const cookingTime = prompt('New cooking time:');

    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, ingredients, instructions, cookingTime })
    });
    if (response.ok) {
        fetchRecipes();
    } else {
        console.error('Error updating recipe:', await response.json());
    }
}

// Delete recipe
async function deleteRecipe(id) {
    if (confirm('Are you sure you want to delete this recipe?')) {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchRecipes();
        } else {
            console.error('Error deleting recipe:', await response.json());
        }
    }
}

// Initial fetch
fetchRecipes();
