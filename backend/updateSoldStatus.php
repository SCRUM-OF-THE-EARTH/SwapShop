<?php

    include("conf.php");

    $status = $_REQUEST['status'];
    $item_id = $_REQUEST['item_id'];

    $query = "UPDATE trade_items SET sold = $status WHERE id = $item_id";

    if ($conn = $conn->query($query)) {
        setResults(1, NULL);
    }

    printOutput();

?>