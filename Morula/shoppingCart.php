<!DOCTYPE html>
<html lang="en">
    <?php session_start(); ?>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Morula Recipes</title>
<link rel="stylesheet" href="Styles.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <style>
    body {
        font-family: Arial, sans-serif;
    }
    header {
        background-color: #333;
        color: #eee;
        padding: 10px 0;
        text-align: center;
    }
    .navbar a {
        color: #ddd;
        padding: 14px 20px;
        text-decoration: none;
        display: inline-block;
    }
    .navbar a:hover {
        background-color: #ddd;
        color: black;
    }
    .search-container {
        position: absolute;
        right: 10px;
        top: 12px;
    }
    .search-container input, .search-container button {
        padding: 10px;
        margin-top: 8px;
    }
    .banner img {
        max-width: 200px;
        height: 300px;
    }
    .home article {
        margin: 50px;
        border: 1px solid #ccc;
        padding: 20px;
    }
    .home img {
        width: 100%;
        height: auto;
    }

    
/* Style the navigation bar */
.navbar {
display: flex;
justify-content: center;
align-items: center;
padding-bottom: 20px;
float:inline-start;

}

.navbar a {
color: white;
padding: 12px 20px;
text-decoration: none;
transition: background-color 0.3s;
}

.navbar a:hover {
background-color: #e1a200; /* A darker yellow tone for hover effect */
}
.popupMenu {
display: none;
position: relative;
margin-left:50%;
margin-top:70px;
background-color: #272626;
width: 20%;
height:auto;
z-index: 4;
}

.popupMenu a {
display: block;
color: white;
padding: 12px 16px;
text-decoration: none;
}

.popupMenu a:hover {
background-color: #ddd;
color: rgb(177, 175, 175);
}

.popupMenu .closebtn {
float: left;
color: white;
font-size: 30px;
cursor: pointer;
padding: 10px;
}

/* Style the search container */
.search-container {
position: sticky;
right: 20px;
margin-top: 70px;
transform: translateY(-50%);
}

.search-container input, .search-container button {
padding: 10px;
border: none;
border-radius: 5px;
}

.search-container button {
background-color: #e1a200;
color: white;
cursor: pointer;
}

.search-container button:hover {
background-color: #c88e00;
}
/* Style the banner */
.banner video.logo {
width: 45%;
height:150px;
float:left;
margin-left:-145px;
margin-top:-30px;
}

</style>
<script>
    function toggleMenu() {
        var x = document.getElementById("popupMenu");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }
</script>
</head>
<body>
<header>
<div class="banner">
    
    <video class="logo" autoplay loop muted>
        <source src="Morula Receipe System.mp4" type="video/mp4" width="50%">
    </video>
</div>
    <h1 style="float:margin-left 200%">Morula Receipe System</h1>
<div class="navbar">
    <a href="index.php">Home</a>
    <a href="Recipe.php">Recipes</a>
    <a href="about.php">About</a>
    <a href="sign-up.php">Subscription</a>
    <a href="javascript:void(0);" class="icon" onclick="toggleMenu()">
        ☰
    </a>
</div>
<div id="popupMenu" class="popupMenu">

    <a href="index.php">Home</a>
    <a href="Connect.php">Connect</a>
  </div>
<div class="search-container">
    <input type="text" placeholder="Search...">
    <button type="submit"><i class="fas fa-search"></i></button>
</div>
</header>
<body>
    <div class="container">
        <div class="recipe-card">
            <h2 class="recipe-title">Chocolate Chip Cookies</h2>
            <p class="recipe-price">P5.99</p>
            <button class="add-to-cart" onclick="addToCart('Chocolate Chip Cookies', 5.99)">Add to Cart</button>
            
        </div>
        <div class="recipe-card">
            <h2 class="recipe-title">Morogo Wa Dinawa</h2>
            <p class="recipe-price">P100.99</p>
            <button class="add-to-cart" onclick="addToCart('Morogo Wa Dinawa', 100.99)">Add to Cart</button>
        </div>
        <div class="recipe-card">
            <h2 class="recipe-title">Dahl soup indian</h2>
            <p class="recipe-price">P10.99</p>
            <button class="add-to-cart" onclick="addToCart('Dahl soup indian', 10.99)">Add to Cart</button>
        </div>
        <div class="recipe-card">
            <h2 class="recipe-title">Chicken Biryani</h2>
            <p class="recipe-price">P100.99</p>
            <button class="add-to-cart" onclick="addToCart('Chicken Biryani', 100.99)">Add to Cart</button>
        </div>

        <div class="cart">
            <h2>Your Cart</h2>
            <div class="cart-item">
            </div>
          
        </div>
    </div>

    <script>
        // Function to add items to the cart
        function addToCart(itemName, itemPrice) {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span class="cart-item-name">${itemName}</span>
                <span class="cart-item-price">P${itemPrice.toFixed(2)}</span>
            `;
            document.querySelector('.cart').appendChild(cartItem);
        }
    </script>
</body>
</html>
