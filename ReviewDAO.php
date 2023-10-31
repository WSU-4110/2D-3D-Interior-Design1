<?php
include ("Review.php");
class ReviewDAO{
    function insert_info($myReview){
        $email = $myReview->get_email();
        $rev = $myReview->get_rev();

        $mysqil = mysqli_connect('localhost','root','','test1',3307);
        $result=mysqli_query($mysqil,"INSERT into review(email,paragraph)values('$email', '$rev')");
        if($result){
            echo "Review Submitted! Thank you for your feedback!";
        }
        else{
            echo "Review failed to submit";
        }
        return $result;
    }
}
?>