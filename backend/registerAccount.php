<?php

    include("conf.php");

    $fname = $_REQUEST['fname'];
    $lname = $_REQUEST['lname'];
    $username = $_REQUEST['user'];
    $password = $_REQUEST['pass'];
    $email = $_REQUEST['email'];

    $query = "INSERT INTO user_login_details (fname, lname, username, password, email) VALUES ('$fname','$lname','$username','$password','$email')";

    if ($result = $conn->query()) {
        echo "success";
    } else {
        echo "failure";
    }
?>