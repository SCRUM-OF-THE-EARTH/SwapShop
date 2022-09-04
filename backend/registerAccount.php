<?php
    // thid API is used to create and add a new row to the user login details

    // It takes in 5 parameters:
    //  | fname - the first name of the user making an account
    //  | lname - the last name of the user making an account
    //  | username - the new chosen, unique username of the user
    //  | password - the password chosen by the user
    //  | email - the user's email
    //
    // It returns a json object in the standard form for this project
    //  | "success" - 1 if the request was successful and 0 if something went wrong
    //  | "results" - a json object containing the id of the newly created user account in the database

    // include conf.php for the initialised connection to the database $conn
    include("conf.php");

    $fname = $_REQUEST['fname'];
    $lname = $_REQUEST['lname'];
    $username = $_REQUEST['user'];
    $password = $_REQUEST['pass'];
    $email = $_REQUEST['email'];

    // construct the INSERT query to add a row into the user login detials table
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