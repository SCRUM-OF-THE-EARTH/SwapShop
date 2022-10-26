<?php

    include('conf.php');

    $item = $_REQUEST['item'];
    $tag = $_REQUEST['tag'];

    $query = "DELETE FROM item_tags WHERE item = $item && tag = $tag";

    if ($result = $conn->query($query)) {
        setResults(1, NULL);
    }

    printOutput();

?>