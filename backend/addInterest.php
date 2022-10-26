<?php

    // the add interest function is used to add tags (user interests) to a user account
    //
    // it takes in the user ID and a tag ID which exist in the user_login_details and tag table respectivly in the datbase
    // it inserts these details into the user_tags table
    // and resturns an array of 


    include("conf.php");

    $userId = $_REQUEST['user'];
    $tagId = $_REQUEST['tag'];

    $query = "INSERT INTO user_tags (user, tags) VALUES ($userId, $tagId)";

    if ($Result = $conn->query($query)) {
        setResults(1, NULL);
    }

    printOutput();
?>