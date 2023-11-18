<?php
if(empty($_POST["name"])){
    die("Name is required");
}

if(!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)){
    die("Valid email required");
}

$mysqil = require __DIR__ . "/database_connection.php";

$sql = "INSERT INTO login (name, email, password)
        VALUES (?, ?, ?)";

$stmt = $mysqli->stmt_init();

$stmt->prepare($sql);

$stmt->bind_param("sss", $_POST["name"], $_POST["email"], $_POST["password"]);
if($stmt->execute()){
    header("Location: Login.html");
    exit();
}

print_r($_POST);

?>