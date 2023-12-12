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
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Reviews</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        body {
            background-color: #1a1a1a;
            color: #f5f5f5;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        .center {
            width: 60%;
            border: 3px solid #ffa500;
            padding: 20px;
            text-align: center;
            background-color: #333;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h1, h2 {
            color: #ffa500;
            overflow: hidden;
            white-space: nowrap;
            margin: 0 auto;
            animation: typeWriter 1.5s steps(40, end), blink-caret .75s step-end infinite;
        }

        @keyframes typeWriter {
            from { width: 0 }
            to { width: 100% }
        }

        @keyframes blink-caret {
            from, to { border-color: transparent }
            50% { border-color: orange; }
        }

        form {
            display: flex;
            flex-direction: column;
            align-items: center;
            animation: slideIn 1s ease-out;
        }

        label {
            margin: 10px 0;
            font-size: 16px;
        }

        input, textarea {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
            box-sizing: border-box;
            border: 1px solid #ffa500;
            border-radius: 4px;
            background-color: #555;
            color: #f5f5f5;
        }

        input[type="submit"] {
            background-color: #ffa500;
            color: black;
            cursor: pointer;
        }

        input[type="submit"]:hover {
            background-color: #e69500;
        }

        /* Modal styles */
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.4);
            padding-top: 60px;
        }

        .modal-content {
            background-color: #333;
            margin: 5% auto;
            padding: 20px;
            border: 1px solid #ffa500;
            width: 80%;
            border-radius: 10px;
        }

        .close {
            color: #ffa500;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

        .close:hover,
        .close:focus {
            color: #e69500;
            text-decoration: none;
            cursor: pointer;
        }

        center {
            margin-top: 20px;
        }

        .fab {
            padding: 20px;
            font-size: 30px;
            width: 50px;
            text-align: center;
            text-decoration: none;
            margin: 5px 10px;
            transition: background-color 0.3s;
            color: #f5f5f5;
            border-radius: 50%;
        }

        .fab:hover {
            background-color: #555;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
</head>

<body style="background-color:black;">
    <div class ="center">
        <h1>Submit a Review</h1>
        <form action="" method="post">
            <input type="name" placeholder="Name that will be Visible" name="name" onfocus="this.value"<br>
            <input type="email" placeholder="Email" name="email" onfocus="this.value=''"><br>
            <input type="text" placeholder="Enter your review"  name="rev" class="textbox" onfocus="this.value=''" ><br/>
            <input type="text" placeholder="Enter name to display on review page"  name="name" class="textbox" onfocus="this.value=''" ><br/>
            <input type="submit" name="submit" />
        </form>
        <h1>Reviews</h1>
        <?php
        $mysqil = mysqli_connect('localhost','root','','test1',3307);
        $sql = "SELECT * FROM review";
        $result = $mysqil->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo "User " . $row["name"] . " Said: " . $row["paragraph"] . "<br>" . "<br>";
            }
        } else {
            echo "0 results";
        }
        ?>
    </div>
</body>

</html>
