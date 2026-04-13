<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Morula Recipes | Add New Recipe</title>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <style>
        :root {
            --primary-gold: #e1a200;
            --dark-bg: #212529;
            --morula-green: #04AA6D;
        }

        body {
            background-color: #f4f7f6;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Consistent Header Design */
        header {
            background-color: var(--dark-bg);
            color: white;
            padding: 15px 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        .header-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .logo-video {
            height: 50px;
            border-radius: 5px;
        }

        .navbar-custom a {
            color: #ddd;
            padding: 10px 15px;
            text-decoration: none;
            transition: 0.3s;
        }

        .navbar-custom a:hover, .navbar-custom a.active {
            color: var(--primary-gold);
        }

        /* Form Container */
        .form-card {
            background: white;
            border: none;
            border-radius: 12px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.08);
            padding: 40px;
            margin-top: 50px;
            margin-bottom: 50px;
        }

        .form-card h2 {
            color: var(--dark-bg);
            font-weight: 700;
            border-bottom: 3px solid var(--primary-gold);
            display: inline-block;
            margin-bottom: 30px;
        }

        .form-label {
            font-weight: 600;
            color: #555;
            margin-top: 10px;
        }

        .form-control:focus {
            border-color: var(--primary-gold);
            box-shadow: 0 0 0 0.2rem rgba(225, 162, 0, 0.25);
        }

        .btn-submit {
            background-color: var(--morula-green);
            color: white;
            border: none;
            padding: 12px;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: 6px;
            width: 100%;
            margin-top: 20px;
            transition: 0.3s;
        }

        .btn-submit:hover {
            background-color: #038d5a;
            transform: translateY(-2px);
        }

        footer {
            text-align: center;
            padding: 20px;
            color: #888;
            font-size: 0.9rem;
        }

        /* Popup Menu Positioning */
        .popupMenu {
            display: none;
            position: absolute;
            background: #333;
            right: 10%;
            top: 70px;
            z-index: 100;
            border-radius: 5px;
            padding: 10px;
            min-width: 150px;
        }
    </style>
</head>
<body>

<header>
    <div class="header-container">
        <video class="logo-video" autoplay loop muted>
            <source src="Morula Receipe System.mp4" type="video/mp4">
        </video>
        <h3 class="mb-0 d-none d-md-block">Morula Recipe System</h3>
        <nav class="navbar-custom">
            <a href="subscription.php">Home</a>
            <a href="recipe.php" class="active">Add Recipe</a>
            <a href="index.php">Browse</a>
            <a href="javascript:void(0);" onclick="toggleMenu()">☰</a>
        </nav>
    </div>

    <div id="popupMenu" class="popupMenu">
        <a href="index.php" class="text-white d-block p-2 text-decoration-none">Home</a>
        <a href="Connect.php" class="text-white d-block p-2 text-decoration-none">Connect</a>
        <a href="about.php" class="text-danger d-block p-2 text-decoration-none">Log Out</a>
    </div>
</header>

<main class="container">
    <div class="row justify-content-center">
        <div class="col-lg-7">
            <div class="form-card">
                <div class="text-center">
                    <h2>Add New Recipe</h2>
                    <p class="text-muted">Share your culinary creation with the Morula community.</p>
                </div>
                
                <form action="configs/recipeconfig.php" method="post">
                    <div class="mb-3">
                        <label for="recipeName" class="form-label">Recipe Name</label>
                        <input type="text" id="recipeName" class="form-control" name="recipeName" placeholder="e.g. Traditional Morula Jam" required>
                    </div>

                    <div class="mb-3">
                        <label for="ingredients" class="form-label">Ingredients</label>
                        <textarea rows="4" id="ingredients" class="form-control" name="ingredients" placeholder="List ingredients separated by commas..." required></textarea>
                    </div>

                    <div class="mb-3">
                        <label for="instructions" class="form-label">Instructions</label>
                        <textarea rows="4" id="instructions" class="form-control" name="instructions" placeholder="Step-by-step cooking guide..." required></textarea>
                    </div>

                    <div class="mb-4">
                        <label for="recipeType" class="form-label">Recipe Access Level</label>
                        <select class="form-select" id="recipeType" name="type">
                            <option value="normal" selected>Free (Available to all)</option>
                            <option value="premium">Paid (Premium subscribers only)</option>
                        </select>
                    </div>

                    <button type="submit" class="btn-submit shadow-sm">
                        <i class="fa fa-plus-circle me-2"></i> Publish Recipe
                    </button>
                </form>
            </div>
        </div>
    </div>
</main>

<footer>
    <p>&copy; 2024 Morula Recipe Website. All rights reserved.</p>
</footer>

<script>
    function toggleMenu() {
        var menu = document.getElementById("popupMenu");
        menu.style.display = (menu.style.display === "block") ? "none" : "block";
    }

    // Close menu when clicking outside
    window.onclick = function(event) {
        if (!event.target.matches('.icon') && !event.target.matches('.navbar-custom a')) {
            document.getElementById("popupMenu").style.display = "none";
        }
    }
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>