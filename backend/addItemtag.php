<?php

    include('conf.php');

    $item = $_REQUEST['item'];
    $tag = $_REQUEST['tag'];
    $exchange = $_REQUEST['exchange'];

    $query = "INSERT INTO item_tags (item, tag, exchange) VALUE ($item, $tag, $exchange);";

    $output = array("success"=>0, "results"=>0);

    if ($result = $conn->query($query)) {
        $output['success'] = 1;
    }

    echo json_encode($output);
?>