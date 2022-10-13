<?php
    // this api is used to check the username and password agaisnt the database to log them in if they have an existing account 

    // it takes in two parameters:
    //  | user - the username of the user
    //  | pass - the password the user had chosen when registering or updating password
    
    // it returns a json object in the standard format for this project:
    //  | "success" - 1 if the request was successful and 0 if something went wrong
    //  | "results" - a json object containing the user details of the logging in user


    // include conf.php for the database connection $conn
    include("conf.php");
    
    // request the usernaem and password from the url
    $username = $_REQUEST['user'];
    $password = $_REQUEST['pass'];

    // construct a query to check if the username exists in the database
    $query = "SELECT COUNT(*) AS exist FROM user_login_details WHERE username='$username'";

    // create the output array with initail values
    $output = array("success"=>0, "results"=>0);

    // check if the query returns a result
    if ($result = $conn->query($query)) {
        $row = $result->fetch_assoc();

        if ($row["exist"] == 1){
            $results = checkLogin($username, $password, $conn);
            if ($results != 0) {
                $output['success'] = 1;
            }
            $output["results"] = $results;
        }
    }

    echo json_encode($output);

    // this function is used to check that only 1 instance of a username with an associated password exists
    // it takes in 3 parameters:
    //  | username - the username of the user logging in 
    //  | password - the password of the user logging in
    //  | conn - an initialised connection to a database
    //
    // It returns the row from the database of the user details if their username and password are correct 
    // and returns false if there details are incorrect
    
    function checkLogin($username, $password, $conn) {
        $sql = "SELECT *, COUNT(*) AS success FROM user_login_details WHERE username='$username' AND password='$password'";
        
        if ($res = $conn->query($sql)) {
            $row = $res->fetch_assoc();
            $user_id = $row['id'];
            $tags = array();

            if ($tag_res = $conn->query("SELECT * FROM user_tags WHERE user = $user_id")) {
                while ($tag_row = $tag_res->fetch_assoc()) {
                    $tags[] = $tag_row['tags'];
                }
            }

            $row['tags'] = $tags;

            if ($row['success'] == 1){
                return $row;
            }

        }

        return 0;
    }

?>