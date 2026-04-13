<?php 
session_start(); 
require_once("configs/db/db.php");

// Handle "Add to Cart" Logic at the TOP
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['RID'])) {
    $id = $_POST['RID'];
    $price = $_POST['price'];   
    
    $stmt = $conn->prepare("INSERT INTO cart (recipid, price) VALUES (?, ?)");    
    $stmt->bind_param("ii", $id, $price);
    
    if ($stmt->execute()) {
        $msg = "Added to cart!";
    } else {
        $msg = "Could not add to cart.";
    }
}

$user = isset($_SESSION["user"]) ? $_SESSION["user"] : "Guest";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Morula | Premium Recipes</title>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <style>
        :root {
            --premium-gold: #e1a200;
            --dark-card: #1a1a1a;
            --text-muted: #a0a0a0;
        }

        body {
            background-color: #121212; /* Dark theme for Premium feel */
            color: #e0e0e0;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        /* Modern Header */
        header {
            background-color: #000;
            padding: 15px 0;
            border-bottom: 1px solid #333;
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .header-wrap {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo-vid { height: 45px; border-radius: 4px; }

        .nav-links a {
            color: #fff;
            text-decoration: none;
            margin-left: 20px;
            font-size: 0.9rem;
            transition: 0.3s;
        }

        .nav-links a:hover { color: var(--premium-gold); }

        /* Premium Recipe Cards */
        .premium-card {
            background: var(--dark-card);
            border: 1px solid #333;
            border-radius: 12px;
            overflow: hidden;
            transition: 0.3s;
            height: 100%;
        }

        .premium-card:hover {
            border-color: var(--premium-gold);
            transform: translateY(-5px);
        }

        .recipe-thumb {
            width: 100%;
            height: 180px;
            object-fit: cover;
            filter: grayscale(30%);
        }

        .card-content { padding: 20px; }

        .price-badge {
            background: rgba(225, 162, 0, 0.15);
            color: var(--premium-gold);
            padding: 4px 10px;
            border-radius: 4px;
            font-weight: bold;
            font-size: 0.85rem;
        }

        .btn-add-cart {
            background-color: var(--premium-gold);
            color: #000;
            font-weight: 700;
            border: none;
            width: 100%;
            padding: 10px;
            border-radius: 6px;
            margin-top: 15px;
            transition: 0.2s;
        }

        .btn-add-cart:hover {
            background-color: #ffb700;
            box-shadow: 0 0 15px rgba(225, 162, 0, 0.4);
        }

        .user-welcome {
            color: var(--premium-gold);
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* Popup Styling */
        .menu-popup {
            display: none;
            position: absolute;
            top: 60px;
            right: 20px;
            background: #222;
            border: 1px solid #444;
            border-radius: 8px;
            padding: 10px;
            width: 180px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .menu-popup a {
            display: block;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
        }

        .menu-popup a:hover { background: #333; }

        footer {
            margin-top: 100px;
            padding: 40px 0;
            text-align: center;
            border-top: 1px solid #333;
            color: var(--text-muted);
        }
    </style>
</head>
<body>

<header>
    <div class="header-wrap">
        <div class="d-flex align-items-center">
            <video class="logo-vid me-3" autoplay loop muted>
                <source src="Morula Receipe System.mp4" type="video/mp4">
            </video>
            <span class="user-welcome d-none d-md-inline">Member: <?php echo htmlspecialchars($user); ?></span>
        </div>

        <nav class="nav-links">
            <a href="subscription.php">Premium</a>
            <a href="recipe.php">Add Recipe</a>
            <a href="index.php">Browse</a>
            <a href="javascript:void(0)" onclick="toggleMenu()"><i class="fa fa-bars"></i></a>
        </nav>
    </div>

    <div id="popupMenu" class="menu-popup">
        <a href="subscription.php">Home</a>
        <a href="checkoutform.php">View Cart <i class="fa fa-shopping-cart ms-2"></i></a>
        <hr class="bg-secondary">
        <a href="about.php" class="text-danger">Log Out</a>
    </div>
</header>

<main class="container my-5">
    <div class="text-center mb-5">
        <h1 class="display-5 fw-bold">Premium Kitchen</h1>
        <p class="text-muted">Exclusive recipes curated for our gold members.</p>
        <?php if(isset($msg)): ?>
            <div class="alert alert-warning py-2 d-inline-block"><?php echo $msg; ?></div>
        <?php endif; ?>
    </div>

    <div class="row g-4">
        <?php
        $sql = "SELECT * FROM recipes WHERE type='premium'";
        $result = mysqli_query($conn, $sql);

        if ($result && mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
        ?>
            <div class="col-sm-6 col-md-4 col-lg-3">
                <article class="premium-card">
                    <img src="Morula.png" class="recipe-thumb" alt="Premium Recipe">
                    <div class="card-content">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="mb-0"><?php echo htmlspecialchars($row['name']); ?></h5>
                            <span class="price-badge">P<?php echo number_format($row['price'], 2); ?></span>
                        </div>
                        
                        <form method="POST">
                            <input type="hidden" value="<?php echo $row['recipid']; ?>" name="RID">
                            <input type="hidden" value="<?php echo $row['price']; ?>" name="price">
                            <button type="submit" class="btn-add-cart">
                                <i class="fa fa-cart-plus me-1"></i> ADD TO CART
                            </button>
                        </form>
                    </div>
                </article>
            </div>
        <?php 
            }
        } else {
            echo "<div class='text-center w-100 mt-5'><p class='text-muted'>No premium recipes available yet.</p></div>";
        }
        ?>
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

    // Auto-hide alerts after 3 seconds
    setTimeout(function() {
        let alerts = document.querySelectorAll('.alert');
        alerts.forEach(a => a.style.display = 'none');
    }, 3000);
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>