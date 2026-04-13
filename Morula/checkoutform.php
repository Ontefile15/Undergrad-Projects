<?php
session_start();
require_once("configs/db/db.php");

// Handle "Clear Cart" Action
if (isset($_POST['clear_cart_cmd'])) {
    $sql = "DELETE FROM cart";
    if (mysqli_query($conn, $sql)) {
        $message = "Cart cleared successfully!";
    } else {
        $message = "Error clearing cart: " . mysqli_error($conn);
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Morula Recipes | Checkout</title>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <style>
        :root {
            --primary-gold: #e1a200;
            --dark-bg: #212529;
            --light-gray: #f8f9fa;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
        }

        /* Header Styling */
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
            max-width: 1200px;
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

        /* Layout */
        .main-content {
            max-width: 1100px;
            margin: 40px auto;
            padding: 0 20px;
        }

        .checkout-box, .cart-summary {
            background: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            height: 100%;
        }

        h3 {
            font-size: 1.25rem;
            margin-bottom: 20px;
            border-bottom: 2px solid var(--primary-gold);
            display: inline-block;
        }

        /* Form Elements */
        .form-label { margin-top: 10px; font-weight: 500; }
        .form-control { border-radius: 6px; padding: 10px; }

        .btn-checkout {
            background-color: #04AA6D;
            color: white;
            padding: 12px;
            border: none;
            width: 100%;
            border-radius: 6px;
            font-size: 1.1rem;
            margin-top: 20px;
            cursor: pointer;
        }

        .btn-checkout:hover { background-color: #038d5a; }

        .btn-clear {
            background: none;
            border: 1px solid #dc3545;
            color: #dc3545;
            width: 100%;
            padding: 8px;
            border-radius: 5px;
            margin-top: 20px;
            transition: 0.3s;
        }

        .btn-clear:hover {
            background: #dc3545;
            color: white;
        }

        .cart-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }

        .price-val { font-weight: bold; }
    </style>
</head>
<body>

<header>
    <div class="header-container">
        <video class="logo-video" autoplay loop muted>
            <source src="Morula Receipe System.mp4" type="video/mp4">
        </video>
        <h4 class="mb-0">Morula Recipe System</h4>
        <nav class="navbar-custom">
            <a href="subscription.php">Home</a>
            <a href="recipe.php" class="active">Recipes</a>
            <a href="Connect.php">Connect</a>
        </nav>
    </div>
</header>

<main class="main-content">
    <?php if(isset($message)): ?>
        <div class="alert alert-info"><?php echo $message; ?></div>
    <?php endif; ?>

    <div class="row g-4">
        <div class="col-lg-8">
            <div class="checkout-box">
                <form action="/action_page.php" method="POST">
                    <div class="row">
                        <div class="col-md-6">
                            <h3>Billing Address</h3>
                            <label class="form-label"><i class="fa fa-user"></i> Full Name</label>
                            <input type="text" name="firstname" class="form-control" placeholder="Segolame Skoon" required>
                            
                            <label class="form-label"><i class="fa fa-envelope"></i> Email</label>
                            <input type="email" name="email" class="form-control" placeholder="segolame@example.com" required>
                            
                            <label class="form-label"><i class="fa fa-address-card"></i> Address</label>
                            <input type="text" name="address" class="form-control" placeholder="4775 Notwane Rd">
                            
                            <div class="row">
                                <div class="col-6">
                                    <label class="form-label">City</label>
                                    <input type="text" name="city" class="form-control" placeholder="Gaborone">
                                </div>
                                <div class="col-6">
                                    <label class="form-label">Zip</label>
                                    <input type="text" name="zip" class="form-control" placeholder="0000">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <h3>Payment</h3>
                            <div class="mb-3">
                                <i class="fab fa-cc-visa fa-2x text-primary"></i>
                                <i class="fab fa-cc-mastercard fa-2x text-danger"></i>
                                <i class="fab fa-cc-amex fa-2x text-info"></i>
                            </div>
                            
                            <label class="form-label">Name on Card</label>
                            <input type="text" name="cardname" class="form-control" placeholder="S Skoon">
                            
                            <label class="form-label">Card Number</label>
                            <input type="text" name="cardnumber" class="form-control" placeholder="1111-2222-3333-4444">
                            
                            <div class="row">
                                <div class="col-6">
                                    <label class="form-label">Exp Month</label>
                                    <input type="text" name="expmonth" class="form-control" placeholder="September">
                                </div>
                                <div class="col-3">
                                    <label class="form-label">Year</label>
                                    <input type="text" name="expyear" class="form-control" placeholder="2027">
                                </div>
                                <div class="col-3">
                                    <label class="form-label">CVV</label>
                                    <input type="text" name="cvv" class="form-control" placeholder="352">
                                </div>
                            </div>
                        </div>
                    </div>
                    <label class="mt-4">
                        <input type="checkbox" checked="checked" name="sameadr"> Shipping same as billing
                    </label>
                    <button type="submit" class="btn-checkout">Continue to Checkout</button>
                </form>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="cart-summary">
                <h3>Your Cart <i class="fa fa-shopping-cart"></i></h3>
                <div class="mt-3">
                    <?php
                    $sql = "SELECT recipes.name, recipes.price FROM cart JOIN recipes ON cart.recipid = recipes.recipid";
                    $result = mysqli_query($conn, $sql);
                    $total = 0;

                    if ($result && mysqli_num_rows($result) > 0) {
                        while ($row = mysqli_fetch_assoc($result)) {
                            echo "<div class='cart-item'>";
                            echo "<span>" . htmlspecialchars($row['name']) . "</span>";
                            echo "<span class='price-val'>P" . number_format($row['price'], 2) . "</span>";
                            echo "</div>";
                            $total += $row['price'];
                        }
                        echo "<div class='cart-item mt-2'><strong>Total</strong><strong>P" . number_format($total, 2) . "</strong></div>";
                    } else {
                        echo "<p class='text-muted'>Your cart is empty.</p>";
                    }
                    ?>
                </div>

                <form method="POST" onsubmit="return confirm('Are you sure you want to clear your cart?');">
                    <button type="submit" name="clear_cart_cmd" class="btn-clear">
                        <i class="fa fa-trash"></i> Clear Cart
                    </button>
                </form>
            </div>
        </div>
    </div>
</main>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>