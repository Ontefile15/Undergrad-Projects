<!DOCTYPE html>
<html lang="en">
<?php 
    session_start(); 
    if(isset($_SESSION["error"])){
        echo "<script>alert('".htmlspecialchars($_SESSION["error"])."');</script>";
        $_SESSION["error"] = null;
    } 
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Morula Recipes | Browse</title>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <style>
        :root {
            --primary-gold: #e1a200;
            --dark-bg: #212529;
        }

        body {
            background-color: #f8f9fa;
            font-family: 'Segoe UI', sans-serif;
        }

        /* Header & Banner */
        header {
            background-color: var(--dark-bg);
            color: white;
            padding: 10px 0;
            position: relative;
        }

        .logo-video {
            height: 60px;
            border-radius: 5px;
        }

        .navbar-custom {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            margin-top: 10px;
        }

        .navbar-custom a {
            color: #ddd;
            text-decoration: none;
            padding: 8px 15px;
            transition: 0.3s;
        }

        .navbar-custom a:hover, .navbar-custom a.active {
            color: var(--primary-gold);
            border-bottom: 2px solid var(--primary-gold);
        }

        /* Search Bar */
        .search-wrapper {
            max-width: 400px;
            margin: 15px auto;
            display: flex;
        }

        .search-wrapper input {
            border-radius: 20px 0 0 20px;
            border: 1px solid #ced4da;
        }

        .search-wrapper button {
            border-radius: 0 20px 20px 0;
            background-color: var(--primary-gold);
            border: none;
            color: white;
            padding: 0 20px;
        }

        /* Recipe Cards */
        .recipe-card {
            transition: transform 0.3s, box-shadow 0.3s;
            border: none;
            height: 100%; /* Keeps cards same height in a row */
        }

        .recipe-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }

        .recipe-img {
            height: 200px;
            object-fit: cover;
            border-radius: 8px 8px 0 0;
        }

        .ingredients-box {
            max-height: 80px;
            overflow-y: auto;
            font-size: 0.9rem;
            background: #f1f1f1;
            padding: 8px;
            border-radius: 4px;
        }

        footer {
            background: var(--dark-bg);
            color: #aaa;
            padding: 30px 0;
            text-align: center;
            margin-top: 50px;
        }
        
        /* Popup Menu */
        .popupMenu {
            display: none;
            position: absolute;
            right: 20px;
            top: 70px;
            background: #333;
            z-index: 1000;
            border-radius: 5px;
            padding: 10px;
        }
    </style>
</head>
<body>

<header>
    <div class="container d-flex flex-column align-items-center">
        <video class="logo-video" autoplay loop muted>
            <source src="Morula Receipe System.mp4" type="video/mp4">
        </video>
        <h2 class="mt-2">Morula Recipe System</h2>
        
        <nav class="navbar-custom">
            <a href="subscription.php">Home</a>
            <a href="recipe.php">Add Recipe</a>
            <a href="index.php" class="active">Browse</a>
            <a href="javascript:void(0);" onclick="toggleMenu()">☰</a>
        </nav>

        <form class="search-wrapper input-group shadow-sm">
            <input type="text" class="form-control" placeholder="Search recipes...">
            <button type="submit" class="btn"><i class="fas fa-search"></i></button>
        </form>
    </div>

    <div id="popupMenu" class="popupMenu">
        <a href="subscription.php" class="d-block text-white p-2">Home</a>
        <a href="Connect.php" class="d-block text-white p-2">Connect</a>
        <hr class="bg-secondary">
        <a href="logout.php" class="d-block text-danger p-2 font-weight-bold">Log Out</a>
    </div>
</header>

<main class="container my-5">
    <div class="row g-4">
        <?php 
            require_once("configs/db/db.php");
            $sql = "SELECT * FROM recipes";
            $result = mysqli_query($conn, $sql);

            if(mysqli_num_rows($result) > 0) {
                while($row = mysqli_fetch_assoc($result)) {
        ?> 
            <div class="col-md-6 col-lg-4">
                <article class="card recipe-card shadow-sm">
                    <img src="Morula.png" class="card-img-top recipe-img" alt="Recipe Image">
                    <div class="card-body">
                        <h5 class="card-title text-dark font-weight-bold"><?php echo htmlspecialchars($row['name']); ?></h5>
                        <p class="text-muted small mb-2">Ingredients:</p>
                        <div class="ingredients-box">
                            <?php echo htmlspecialchars($row['ingredients']); ?>
                        </div>
                        <a href="view_recipe.php?id=<?php echo $row['recipid']; ?>" class="btn btn-outline-warning btn-sm mt-3 w-100">View Details</a>
                    </div>
                </article>
            </div>
        <?php 
                }
            } else {
                echo "<div class='col-12'><div class='alert alert-warning text-center'>No Recipes Found</div></div>";
            }
        ?>
    </div>
</main>

<footer>
    <div class="container">
        <p>&copy; 2024 Morula Recipe Website. All rights reserved.</p>
    </div>
</footer>

<script>
    function toggleMenu() {
        var menu = document.getElementById("popupMenu");
        menu.style.display = (menu.style.display === "block") ? "none" : "block";
    }
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>