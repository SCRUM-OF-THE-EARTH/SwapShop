<?php

    include("conf.php");

    $status = $_REQUEST['status'];
    $item_id = $_REQUEST['item_id'];

    $output = array("success"=>0, "results"=>0);

    $query = "UPDATE trade_items SET sold = $status WHERE id = $item_id";

    if ($conn = $conn->query($query)) {
        $output['success'] = 1;
    }

    echo json_encode($output);

?>