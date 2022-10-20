<?php
    // this api is used to fetch all enetries of trade items 
    // it takes in no parameters and returns an array of json objects in the standard format for this project:
    //      | "success" : 1 for a successful request and 0 for unsuccessful
    //      | "results" : returns the array of json trade items

    // including conf.php for database connection $conn
    include('conf.php');

    // SELECT query to be executed 
    $query = "SELECT * FROM trade_items WHERE sold = 1;";

    // setup the return array
    $output = array("success"=>0, "results"=>0);
    $tradeItems = array();

    // check if the query was successful or not 
    if ($results = $conn->query($query)) {
        while ($row = $results->fetch_assoc()) {
            $item_id = $row['id'];
            $tags = array();
            $trade_item = array("id"=>0, "item_name"=>"name", "owner_id"=>0, "description"=>"desc", "item_value"=>0, "date_created"=>0, "tags"=>0, "exchange_item"=>0);

            if ($sub_results = $conn->query("SELECT tags.id, tags.name, tags.date_created, item_tags.exchange FROM item_tags INNER JOIN tags ON item_tags.tag = tags.id AND item_tags.item = $item_id")) {
                while ($tag_row = $sub_results->fetch_assoc()) {
                    $tags[] = $tag_row;
                }
            }

            $tradeItem['id'] = $item_id;
            $tradeItem['item_name'] = $row['item_name'];
            $tradeItem['owner_id'] = $row['owner_id'];
            $tradeItem['description'] = $row['description'];
            $tradeItem['item_value'] = $row['item_value'];
            $tradeItem['date_created'] = $row['date_created'];
            $tradeItem['tags'] = $tags;
            $tradeItem['exchange_item'] = $row['exchange_item'];

            $tradeItems[] = $tradeItem;
        }
        $output['success'] = 1;
        $output['results'] = $tradeItems;
    }

    // return a json formatted array
    echo json_encode($output);

?>
