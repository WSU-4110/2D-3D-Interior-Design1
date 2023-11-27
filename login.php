<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Load user data from a text file (in a real application, you'd use a database).
    $users = file_get_contents('users.txt'); // Assuming users.txt contains username:password pairs.

    // Split the content into an array of lines.
    $userArray = explode("\n", $users);

    // Loop through the userArray to check if the provided credentials match.
    foreach ($userArray as $user) {
        list($storedUsername, $storedPassword) = explode(':', $user);
        
        if ($username === $storedUsername && password_verify($password, trim($storedPassword))) {
            // Authentication successful.
            $_SESSION["username"] = $username;
            header("Location: dashboard.php"); // Redirect to the dashboard or a protected page.
            exit();
        }
    }

    // If authentication fails, display an error message.
    $error_message = "Invalid username or password.";
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login Page</title>
</head>
<body>
    <h2>Login</h2>
    <form action="login.php" method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>
        <input type="submit" value="Login">
    </form>
    
    <?php if (isset($error_message)) echo "<p>$error_message</p>"; ?>
</body>
</html>
