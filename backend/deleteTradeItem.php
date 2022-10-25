<?php

    include("conf.php");

    $id = $_REQUEST['id'];

    $query = "DELETE FROM trade_items where id = $id";

    if ($results = $conn->query($query)) {
        $query = "DELETE FROM item_tags WHERE item = $id";
        if ($results = $conn->query($query)) {
            $query = "DELETE FROM trade_images WHERE trade_id = $id";
            if ($results = $conn->query($query)) {
                $output['success'] = 1;
                setResults(1, NULL);
            }   
            
        }
    }

    printOutput();

?>