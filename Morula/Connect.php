<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connect | Morula Recipes</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root { --morula-gold: #e1a200; --dark-bg: #121212; }
        body { background: #121212; color: white; }
        header { background: #000; padding: 10px 0; border-bottom: 1px solid #333; }
        .logo-vid { height: 45px; border-radius: 5px; }
        .nav-link-custom { color: #aaa !important; margin-left: 20px; text-decoration: none; font-size: 0.9rem; }
        .nav-link-custom:hover { color: #fff !important; }
        .contact-card { background: #fff; color: #333; padding: 40px; border-radius: 20px; }
    </style>
</head>
<body>

<header>
    <div class="container d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center"><video class="logo-vid me-2" autoplay loop muted><source src="Morula Receipe System.mp4" type="video/mp4"></video><h4 class="mb-0">Morula</h4></div>
        <nav>
            <a href="about.php" class="nav-link-custom">HOME</a>
            <a href="login.php" class="nav-link-custom">LOGIN</a>
            <a href="Connect.php" class="nav-link-custom" style="color:var(--morula-gold) !important">CONNECT</a>
        </nav>
    </div>
</header>

<main class="container py-5 mt-5">
    <div class="row g-5">
        <div class="col-lg-6">
            <h1 class="display-4 fw-bold">Let's Talk Food.</h1>
            <p class="text-muted fs-5 mt-3">Suggestions? Issues? Say hi!</p>
            <div class="mt-4">
                <p><i class="fas fa-envelope text-warning me-2"></i> support@morularecipes.co.bw</p>
                <div class="d-flex gap-3 mt-4">
                    <a href="#" class="text-white fs-4"><i class="fab fa-facebook"></i></a>
                    <a href="#" class="text-white fs-4"><i class="fab fa-tiktok"></i></a>
                    <a href="#" class="text-white fs-4"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="contact-card">
                <form action="contact_process.php" method="POST">
                    <label class="small fw-bold">Your Name</label><input type="text" class="form-control mb-3">
                    <label class="small fw-bold">Message</label><textarea class="form-control mb-4" rows="4"></textarea>
                    <button type="submit" class="btn btn-dark w-100 py-2 fw-bold">SEND MESSAGE</button>
                </form>
            </div>
        </div>
    </div>
</main>
</body>
</html>