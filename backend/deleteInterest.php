<?php

    include("conf.php");

    $userId = $_REQUEST['user'];
    $tagId = $_REQUEST['tag'];

    $query = "DELETE FROM user_tags WHERE user = $userId AND tags = $tagId";

    $output = array("success"=>0, "results"=>0);
    if ($results = $conn->query($query)) {
        $output['success'] = 1;
    }

    echo json_encode($output);
?>