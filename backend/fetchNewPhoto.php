<?php

    include('conf.php');

    $user_id = $_REQUEST['id'];

    $query = "SELECT photo from user_login_details WHERE id = $user_id";

    if ($results = $conn->query($query)) {
        $row = $results->fetch_assoc();
        setResults(1, $row);
    }

    printOutput();

?>