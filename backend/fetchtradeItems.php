<?php

    include('conf.php');

    $query = "SELECT * FROM trade_items;";

    $output = array("success"=>0, "results"=>0);
    $tradeItems = array();

    if ($results = $conn->query($query)) {
        while ($row = $results->fetch_assoc()) {
            $tradeItems[] = $row;
        }
        $output['success'] = 1;
        $output['results'] = $tradeItems;
    }

    echo json_encode($output);

?>
