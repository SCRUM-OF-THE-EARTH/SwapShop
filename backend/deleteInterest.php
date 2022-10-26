<?php

    include("conf.php");

    $userId = $_REQUEST['user'];
    $tagId = $_REQUEST['tag'];

    $query = "DELETE FROM user_tags WHERE user = $userId AND tags = $tagId";

    if ($results = $conn->query($query)) {
        setResults(1, NULL);
    }

    printOutput();
?>