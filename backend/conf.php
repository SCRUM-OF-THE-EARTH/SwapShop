<?php

    $host = "sql31.cpt3.host-h.net";
    $username = "tectobhjww_29";
    $password = "AdRBuz3yyYGy35jFxKU8";
    $db = "ciarantwo";

    $conn = new mysqli($host, $username, $password, $db);

    if ($conn->connect_error) {
        die("Connection failed: ".$conn->connect_error);
    }

?>