<?php

    include('conf.php');

    $item = $_REQUEST['item'];
    $tag = $_REQUEST['tag'];
    $exchange = $_REQUEST['exchange'];

    $query = "INSERT INTO item_tags (item, tag, exchange) VALUE ($item, $tag, $exchange);";

    if ($result = $conn->query($query)) {

        $tag_results = $conn->query("SELECT * FROM tags WHERE id = $tag");
        $row = $tag_results->fetch_assoc();

        setResults(1, $row);
    }

    printOutput();
?>