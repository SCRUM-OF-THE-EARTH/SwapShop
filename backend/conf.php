<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");

    $host = "sql31.cpt3.host-h.net";
    $username = "tectobhjww_29";
    $password = "AdRBuz3yyYGy35jFxKU8";
    $db = "ciarantwo";

    $conn = new mysqli($host, $username, $password, $db);

    if ($conn->connect_error) {
        die("Connection failed: ".$conn->connect_error);
    }

?>