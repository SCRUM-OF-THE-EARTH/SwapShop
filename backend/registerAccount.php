<?php

    include("conf.php");

    $fname = $_REQUEST['fname'];
    $lname = $_REQUEST['lname'];
    $username = $_REQUEST['user'];
    $password = $_REQUEST['pass'];
    $email = $_REQUEST['email'];

    $query = "INSERT INTO user_login_details (fname, lname, username, password, email) VALUES ('$fname','$lname','$username','$password','$email');";


    $results = array("success"=>0);
    if ($result = $conn->query($query)) {
        $results["success"] = 1;
    }

    echo json_encode($results);
?>