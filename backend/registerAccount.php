<?php

    include("conf.php");

    $fname = $_REQUEST['fname'];
    $lname = $_REQUEST['lname'];
    $username = $_REQUEST['user'];
    $password = $_REQUEST['pass'];
    $email = $_REQUEST['email'];

    $query = "INSERT INTO user_login_details (fname, lname, username, password, email) VALUES ('$fname','$lname','$username','$password','$email');";

    $output = array("success"=>0, "results"=>0);

    $id = array("id"=>0);
    if ($result = $conn->query($query)) {
        $query = "SELECT LAST_INSERT_ID() as id";

        if ($result = $conn->query($query)){

            $output["success"] = 1;
            $row = $result->fetch_assoc();
            $id["id"] = $row["id"];
            $output["results"] = $id;
        }
    }

    echo json_encode($output);
?>