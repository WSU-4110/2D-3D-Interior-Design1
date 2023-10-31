<?php
include ("ReviewDAO.php");

if(isset($_POST['submit']))
{
    $email=$_POST['email'];
    $rev=$_POST['rev'];

    $myReview = new Review($email,$rev);
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
</head>
<body>
        <form action="" method="post">
            <h1>Submit a Review</h1>
            <input type="email" placeholder="Email" name="email" onfocus="this.value=''"><br>
            <input type="text" placeholder="Enter your review"  name="rev" onfocus="this.value=''" ><br/>
            <input type="submit" name="submit" />
        </form>
</body>

</html>