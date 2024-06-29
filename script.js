document.addEventListener('DOMContentLoaded', () => {
    const foodForm = document.getElementById('foodForm');
    const foodList = document.getElementById('foodList');
    const totalCaloriesElement = document.getElementById('totalCalories');
    
    // Load food entries from local storage
    let foodEntries = JSON.parse(localStorage.getItem('foodEntries')) || [];
    displayFoodEntries();

    // Function to add food entry to the list
    const addFoodEntry = (foodName, calories) => {
        const foodItem = {
            foodName,
            calories: parseInt(calories)
        };
        foodEntries.push(foodItem);
        updateLocalStorage();
        displayFoodEntries();
    };

    // Function to display food entries
    const displayFoodEntries = () => {
        foodList.innerHTML = '';
        let totalCalories = 0;
        foodEntries.forEach((entry, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${entry.foodName} - ${entry.calories} calories
                <div>
                    <button onclick="editFoodEntry(${index})">Edit</button>
                    <button onclick="removeFoodEntry(${index})">Remove</button>
                </div>`;
            foodList.appendChild(li);
            totalCalories += entry.calories;
        });
        totalCaloriesElement.textContent = totalCalories;
    };

    // Function to remove a food entry
    window.removeFoodEntry = (index) => {
        foodEntries.splice(index, 1);
        updateLocalStorage();
        displayFoodEntries();
    };

    // Function to edit a food entry
    window.editFoodEntry = (index) => {
        const entry = foodEntries[index];
        document.getElementById('foodName').value = entry.foodName;
        document.getElementById('calories').value = entry.calories;
        removeFoodEntry(index); // Remove the entry and allow user to add it back with changes
    };

    // Function to update local storage
    const updateLocalStorage = () => {
        localStorage.setItem('foodEntries', JSON.stringify(foodEntries));
    };

    // Event listener for form submission
    foodForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const foodName = document.getElementById('foodName').value;
        const calories = document.getElementById('calories').value;
        addFoodEntry(foodName, calories);
        foodForm.reset();
    });
});
