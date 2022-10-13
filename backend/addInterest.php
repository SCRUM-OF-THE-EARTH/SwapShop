<?php

    include("conf.php");

    $userId = $_REQUEST['user'];
    $tagId = $_REQUEST['tag'];

    $query = "INSERT INTO user_tags (user, tags) VALUES ($userId, $tagId)";

    $output = array("success"=>0, "results"=>0);
    if ($Result = $conn->query($query)) {
        $output['success'] = 1;
    }

    echo json_encode($output);
?>