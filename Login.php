<?php
class UserDAO {
    private $con;

    public function __construct($con) {
        $this->con = $con;
    }

    public function registerUser($email, $password) {
        if (!empty($email) && !empty($password) && !is_numeric($email)) {
            $email = mysqli_real_escape_string($this->con, $email);
            $password = mysqli_real_escape_string($this->con, $password);
            $query = "INSERT INTO users (email, password) VALUES ('$email', '$password')";

            if (mysqli_query($this->con, $query)) {
                return true; // Registration successful
            } else {
                return false; // Registration failed
            }
        } else {
            return false; // Invalid input
        }
    }
}


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="loginStyle.css">
    <title>Interior Design</title>
</head>

<body>

    <div class="container" id="container">
        <form action="process.php" method="post">
        <div class="form-container sign-up">
            <form>
                <h1>Create Account</h1>
                <div class="social-icons">
                    <a href="#" class="icon"><i class="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" class="icon"><i class="fa-brands fa-facebook-f"></i></a>
                </div>
                <span>or use your email for registeration</span>
                <input type="text" placeholder="Name">
                <input type="email" placeholder="Email">
                <input type="password" placeholder="Password">
                <button>Sign Up</button>
            </form>
        </div>
        <div class="form-container sign-in">
            <form>
                <h1>Sign In</h1>
                <div class="social-icons">
                    <a href="#" class="icon"><i class="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" class="icon"><i class="fa-brands fa-facebook-f"></i></a>
                </div>
                <span>or use your email password</span>
                <input type="email" placeholder="Email" name = "email" required>
                <input type="password" placeholder="Password" name = "password" required>
                <a href="#">Forget Your Password?</a>
                <button>Sign In</button>
            </form>
        </div>
        <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your details to use web app features</p>
                    <button class="hidden" id="login">Sign In</button>
                </div>
                <div class="toggle-panel toggle-right">
                    <h1>Hello, Friend!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button class="hidden" id="register">Sign Up</button>
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>

</html>