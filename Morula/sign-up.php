<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up | Morula Recipes</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root { --morula-gold: #e1a200; --dark-bg: #121212; }
        body { background-color: #f4f7f6; min-height: 100vh; display: flex; flex-direction: column; }
        header { background-color: var(--dark-bg); padding: 10px 0; color: white; }
        .logo-vid { height: 40px; border-radius: 4px; }
        .signup-card { background: white; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.05); width: 100%; max-width: 500px; padding: 40px; margin: auto; }
        .btn-signup { background: #04AA6D; color: white; border: none; padding: 12px; width: 100%; border-radius: 8px; font-weight: 700; margin-top: 20px; }
    </style>
</head>
<body>

<header>
    <div class="container d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center"><video class="logo-vid me-2" autoplay loop muted><source src="Morula Receipe System.mp4" type="video/mp4"></video><h5 class="mb-0">Morula</h5></div>
        <nav><a href="about.php" class="text-white text-decoration-none small">BACK TO HOME</a></nav>
    </div>
</header>

<main class="container d-flex flex-grow-1">
    <div class="signup-card">
        <h2 class="fw-bold text-center">Join Us</h2>
        <p class="text-center text-muted mb-4">Create your account to save recipes.</p>
        <form action="configs/signupcontrol.php" method="post">
            <div class="row g-2">
                <div class="col-6"><label class="small fw-bold">First Name</label><input type="text" name="firstname" class="form-control" required></div>
                <div class="col-6"><label class="small fw-bold">Last Name</label><input type="text" name="lastname" class="form-control" required></div>
            </div>
            <label class="small fw-bold mt-3">Username</label><input type="text" name="username" class="form-control" required>
            <label class="small fw-bold mt-3">Gender</label><select name="gender" class="form-select"><option value="M">Male</option><option value="F">Female</option></select>
            <label class="small fw-bold mt-3">Password</label><input type="password" name="password" class="form-control" required>
            <button type="submit" class="btn-signup">CREATE ACCOUNT</button>
            <p class="text-center mt-3 small">Already have an account? <a href="login.php" class="text-warning fw-bold">Login</a></p>
        </form>
    </div>
</main>
</body>
</html>