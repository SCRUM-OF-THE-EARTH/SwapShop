<?php
    // this api is used to fetch all enetries of trade items 
    // it takes in no parameters and returns an array of json objects in the standard format for this project:
    //      | "success" : 1 for a successful request and 0 for unsuccessful
    //      | "results" : returns the array of json trade items

    // including conf.php for database connection $conn
    include('conf.php');

    // SELECT query to be executed 
    $query = "SELECT * FROM trade_items;";

    // setup the return array
    $output = array("success"=>0, "results"=>0);
    $tradeItems = array();

    // check if the query was successful or not 
    if ($results = $conn->query($query)) {
        while ($row = $results->fetch_assoc()) {
            $tradeItems[] = $row;
        }
        $output['success'] = 1;
        $output['results'] = $tradeItems;
    }

    // return a json formatted array
    echo json_encode($output);

?>
