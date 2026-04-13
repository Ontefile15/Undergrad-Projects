<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us | Morula Recipe System</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,700;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        :root { --morula-gold: #e1a200; --dark-bg: #121212; }
        body { font-family: 'Inter', sans-serif; background-color: #fdfdfd; color: #2d2d2d; }
        header { background-color: var(--dark-bg); padding: 10px 0; position: sticky; top: 0; z-index: 1000; }
        .logo-vid { height: 45px; border-radius: 5px; }
        .nav-link-custom { color: #fff !important; font-size: 0.9rem; letter-spacing: 1px; margin-left: 20px; text-decoration: none; transition: 0.3s; }
        .nav-link-custom:hover { color: var(--morula-gold) !important; }
        .hero-section { padding: 100px 0; text-align: center; }
        .display-title { font-family: 'Playfair Display', serif; font-size: 4rem; margin: 20px 0; }
        .section-story { background-color: var(--dark-bg); color: #fff; padding: 100px 0; text-align: center; }
        .who-card { background: #fff; padding: 40px; border-radius: 20px; border: 1px solid #eee; text-align: center; transition: 0.3s; }
        .who-card:hover { transform: translateY(-10px); border-color: var(--morula-gold); }
    </style>
</head>
<body>

<header>
    <div class="container d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
            <video class="logo-vid me-2" autoplay loop muted><source src="Morula Receipe System.mp4" type="video/mp4"></video>
            <h4 class="text-white mb-0">Morula</h4>
        </div>
        <nav>
            <a href="about.php" class="nav-link-custom">ABOUT</a>
            <a href="sign-up.php" class="nav-link-custom">SIGN UP</a>
            <a href="login.php" class="nav-link-custom">LOGIN</a>
            <a href="Connect.php" class="nav-link-custom">CONNECT</a>
        </nav>
    </div>
</header>

<main>
    <section class="hero-section container">
        <span class="text-warning fw-bold small text-uppercase letter-spacing-2">Est. 2024</span>
        <h1 class="display-title">About Morula</h1>
        <p class="lead text-muted mx-auto" style="max-width: 700px;">Our Culinary Journey Begins. We are a passionate community of food lovers, home cooks, and kitchen adventurers.</p>
    </section>

    <section class="section-story">
        <div class="container">
            <h2 class="mb-4 text-warning" style="font-size: 1rem; letter-spacing: 2px;">OUR LEGACY</h2>
            <p class="display-6 italic" style="font-family: 'Playfair Display';">"Every meal has a tale to tell—a memory, a tradition, or a secret passed down through generations."</p>
        </div>
    </section>

    <section class="container py-5">
        <div class="row g-4 mt-4">
            <div class="col-md-4"><div class="who-card"><h4>Culinary Dreamers</h4><p class="text-muted small">Testing every flavor to ensure your success.</p></div></div>
            <div class="col-md-4"><div class="who-card"><h4>Passionate Goal</h4><p class="text-muted small">Igniting your kitchen with inspiration.</p></div></div>
            <div class="col-md-4"><div class="who-card"><h4>Global Community</h4><p class="text-muted small">Join our flavorful journey today.</p></div></div>
        </div>
    </section>
</main>

<footer class="bg-light py-5 text-center border-top">
    <p class="mb-0 text-muted small">&copy; 2024 Morula Recipe Website. All rights reserved.</p>
</footer>
</body>
</html>