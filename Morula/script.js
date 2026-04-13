document.addEventListener("DOMContentLoaded", function() {
    var recipeLink = document.querySelector('a[href="recipes.html"]');
    var aboutLink = document.querySelector('a[href="about.html"]');

    recipeLink.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "recipes.html";
    });

    aboutLink.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "about.html";
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const recipeForm = document.getElementById("recipe-form");
    
    recipeForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const recipeName = document.getElementById("recipeName").value;
        const recipeImage = document.getElementById("recipeImage").files[7];
        const recipeDescription = document.getElementById("recipeDescription").value;
        
        saveRecipe(recipeName, recipeImage, recipeDescription);
    });
    
    function saveRecipe(name, image, description) {
        // In a real application, you would send this data to a server to save it.
        // For simplicity, we'll just log the data to the console.
        console.log("Recipe Name:", name);
        console.log("Recipe Image:", image);
        console.log("Recipe Description:", description);
        
        // Reset the form
        recipeForm.reset();
    }
});

 //window.onload = function() {
    //    alert("Welcome to our recipe website!");
    //};

    /**menu nav bar*/
function toggleMenu() {
    var x = document.getElementById("popupMenu");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  
  function closeMenu() {
    var x = document.getElementById("popupMenu");
    x.style.display = "none";
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    var recipesIcon = document.getElementById('recipesIcon');
    var addRecipesIcon = document.getElementById('addRecipesIcon');

    recipesIcon.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "recipes.html";
    });

    addRecipesIcon.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "add_recipe.html";
    });
});

document.getElementById("recipeForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    var formData = new FormData(this);

    // Send a POST request to the server
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "submit_recipe.php", true); // Change "submit_recipe.php" to your server endpoint
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert("Recipe submitted successfully!");
                // Clear the form after successful submission
                document.getElementById("recipeForm").reset();
            } else {
                alert("Error submitting recipe. Please try again.");
            }
        }
    };
    xhr.send(formData);
});

// Initialize Facebook SDK
window.fbAsyncInit = function() {
    FB.init({
        appId      : 'your-facebook-app-id',
        cookie     : true,
        xfbml      : true,
        version    : 'v13.0'
    });
};

// Load Facebook SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Function to handle Facebook login
function facebookLogin() {
    FB.login(function(response) {
        if (response.authResponse) {
            console.log('Logged in with Facebook');
            // Redirect or perform further actions
        } else {
            console.log('Facebook login failed');
        }
    }, {scope: 'email'});
}

// Function to handle Gmail login
function gmailLogin() {
    // Implement Gmail login logic
}

// Attach event listeners to the buttons
document.getElementById('facebookLogin').addEventListener('click', facebookLogin);
document.getElementById('gmailLogin').addEventListener('click', gmailLogin);
// script.js
const subscribeBtn = document.getElementById('subscribeBtn');
const premiumContent = document.getElementById('premiumContent');

subscribeBtn.addEventListener('click', () => {
    premiumContent.classList.toggle('hidden');
});
