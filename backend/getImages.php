<?php

    include('./conf.php');

    $Id = $_REQUEST['id'];

    $query = "SELECT * FROM trade_images WHERE trade_id = $Id;";

    $data = array();
    if ($result = $conn->query($query)) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row['image_url'];
        }

        setResults(1, $data);
    }

    printOutput();

?>