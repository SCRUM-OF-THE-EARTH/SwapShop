<?php

    include("conf.php");

    $fname = $_REQUEST['fname'];
    $lname = $_REQUEST['lname'];
    $username = $_REQUEST['user'];
    $password = $_REQUEST['pass'];
    $email = $_REQUEST['email'];

    $query = "INSERT INTO user_login_details (fname, lname, username, password, email) VALUES ('$fname','$lname','$username','$password','$email');";


    $results = array("success"=>0,"id"=>0);
    if ($result = $conn->query($query)) {
        $query = "SELECT LAST_INSERT_ID() as id";

        if ($result = $conn->query($query)){

            $results["success"] = 1;
            $row = $result->fetch_assoc();
            $results["id"] = $row["id"];
            
        }
    }

    echo json_encode($results);
?>