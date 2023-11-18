<?php

    $host = "localhost";
    $dbname = "test1";
    $username = "root";
    $password = "";

    $mysqil = new mysqli(hostname:$host, 
                         username:$username, 
                         password:$password, 
                         database:$dbname);

        if ($mysqil->connect_error) {
            die("connection error: ". $mysqil->connect_error);
        }

        return $mysqil;
?>