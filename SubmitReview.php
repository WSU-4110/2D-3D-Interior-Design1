<?php
include ("ReviewDAO.php");

if(isset($_POST['submit']))
{
    $email=$_POST['email'];
    $rev=$_POST['rev'];
    $name =$_POST['name'];

    $myReview = new Review($email,$rev, $name);
    $sendit = new ReviewDAO();

    $sendit->insert_info($myReview);
    
}
?>
<!DOCTYPE html>
<html lang="en">
    
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reviews</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <style>
            .center {
                margin: auto;
                width: 60%;
                border: 3px solid Orange;
                padding: 10px;
                font-family: Arial;
                color: white;
            }
            .textbox{
                width: 700px;
            }
        </style>
</head>
<body style="background-color:black;">
    <div class ="center">
        <h1>Submit a Review</h1>
        <form action="" method="post">
            <input type="email" placeholder="Email" name="email" onfocus="this.value=''"><br>
            <input type="text" placeholder="Enter your review"  name="rev" class="textbox" onfocus="this.value=''" ><br/>
            <input type="text" placeholder="Enter name to display on review page"  name="name" class="textbox" onfocus="this.value=''" ><br/>
            <input type="submit" name="submit" />
        </form>
    </div>
</body>

</html>