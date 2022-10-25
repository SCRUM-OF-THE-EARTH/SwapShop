<?php

    include ('conf.php');

    $item_id = $_REQUEST['item_id'];
    $name = $_REQUEST['name'];
    $description = $_REQUEST['desc'];
    $value = $_REQUEST['value'];

    $query = "UPDATE trade_items SET item_name = '$name', description = '$description', item_value = $value WHERE id = $item_id";

    if ($results = $conn->query($query)) {
        setResults(1, NULL);    
    }

    printOutput();
?>