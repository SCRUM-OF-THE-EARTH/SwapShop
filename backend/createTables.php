<?php

    include("conf.php");

    // This is used to create the table for the login system of the swapshop app
    // it stores the id, first name, last name, username, password and email (optional) 
    // of the user trying to create an account or log into an existing account 

    $query_user_detials_table ="CREATE TABLE user_login_details ( id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, fname VARCHAR(10) NOT NULL, lname VARCHAR(10) NOT NULL, username VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, email VARCHAR(255));";

    if ($result = $conn->query($query_user_detials_table)) {
        echo "successfully created the user login details table";
    } else {
        echo "query failed";
    }

?>