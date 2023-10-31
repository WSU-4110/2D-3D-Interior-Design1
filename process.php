<?php
$con = mysqli_connect("localhost", "root","","register") or die(mysqli_error());

?>





<?php
    session_start();
    include("process.php");

    if($_SERVER['RREQUEST_METHOD'] == "POST"){
        $email = $_POST['email'];
        $password = $_POST['password'];

        if(!empty($email) && !empty($password) && !is_numeric($email)){
            $query = "INSERT INTO users (email, password) VALUES('$email', '$password')";
            mysqli_query($con, $query);
            echo "<script type='text/javascript'> alert('Successfully registered')</script>"
        }
        else{
            echo "<script type='text/javascript'> alert('couldn't register')</script>"

        }
    }
?>