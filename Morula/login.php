<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | Morula Recipes</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        :root { --morula-gold: #e1a200; --dark-bg: #121212; }
        body, html { height: 100%; margin: 0; }
        .split-container { height: 100vh; display: flex; }
        .video-side { width: 50%; background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .video-side video { min-width: 100%; min-height: 100%; object-fit: cover; opacity: 0.5; }
        .form-side { width: 50%; display: flex; align-items: center; justify-content: center; background: #fff; padding: 40px; }
        .login-card { width: 100%; max-width: 350px; }
        .btn-login { background: var(--morula-gold); border: none; padding: 12px; width: 100%; font-weight: 700; border-radius: 8px; }
        @media (max-width: 992px) { .video-side { display: none; } .form-side { width: 100%; } }
    </style>
</head>
<body>

<div class="split-container">
    <div class="video-side">
        <video autoplay loop muted playsinline><source src="Morula Receipe System.mp4" type="video/mp4"></video>
    </div>
    <div class="form-side">
        <div class="login-card">
            <h2 class="fw-bold mb-1">Welcome Back</h2>
            <p class="text-muted mb-4">Please enter your details.</p>
            <form action="configs/signupcontrol.php" method="post">
                <label class="small fw-bold">Username</label>
                <input type="text" name="username" class="form-control mb-3" required>
                <label class="small fw-bold">Password</label>
                <input type="password" name="password" class="form-control mb-4" required>
                <button type="submit" class="btn-login">SIGN IN</button>
                <p class="text-center mt-3 small">New here? <a href="sign-up.php" class="text-warning fw-bold">Sign Up</a></p>
            </form>
            <div class="text-center mt-4"><a href="about.php" class="text-muted small text-decoration-none">← Back to Home</a></div>
        </div>
    </div>
</div>

</body>
</html>