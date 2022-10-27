<?php
    // this file is used to initialise the connecting between the api layer and the mysql database

    // adding header to allow for cross domain communication
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");

    // setting the host, username, password and database got connection
    $host = "sql31.cpt3.host-h.net";
    $username = "tectobhjww_29";
    $password = "AdRBuz3yyYGy35jFxKU8";
    $db = "ciarantwo";

    $output = array("success"=>0, "results"=>0);

    function setResults($success, $results) {
        global $output;
        $output['success'] = $success;
        $output['results'] = $results;
    }

    function printOutput() {
        global $output;
        echo json_encode($output);
    }

    // creating the connection
    $conn = new mysqli($host, $username, $password, $db);

    // check if the connect was successful
    if ($conn->connect_error) {
        die("Connection failed: ".$conn->connect_error);
    }

?>