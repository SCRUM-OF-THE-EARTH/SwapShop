<?php

    // This is an api used to INSERT a new trade item into the database

    // it takes in 4 parameters:
    //  | name - the name of the trade item
    //  | description - the description associated with this trade item    
    //  | value - the estimated value of the item based on the user
    //  | id - the id of the user adding the item to the database

    // it returns the newly added item but in the standard form for this project:
    // | it returns a json object with two parameters:
    //       - "success" : 1 if request was successful and 0 if something went wrong during api call
    //       - "results" : returns a json object with the row from the database

    include("conf.php"); // include conf in order to get $conn which contian the connected database


    // take in the parameters from the url
    $name = $_REQUEST['name'];
    $description = $_REQUEST['desc'];
    $value = $_REQUEST['value'];
    $id =$_REQUEST['id'];

    // construct an insert query
    $query = "INSERT INTO trade_items (item_name, description, item_value, owner_id, date_created) VALUE ('$name', '$description',$value, $id, CURDATE());";

    // check if the query returns a result
    if ($results = $conn->query($query)) {
        if ($results = $conn->query("SELECT * FROM trade_items WHERE id=LAST_INSERT_ID()")) {
            $row = $results->fetch_assoc();
            $temp = array('id'=>0,'item_name'=>0, 'description'=>0, 'item_value'=>0, 'owner_id'=>0, 'date_created'=>0, 'tags'=>0);
            $item_id = $row['id'];
            $temp['id'] = $row['id'];
            $temp['item_name'] = $row['item_name'];
            $temp['description'] = $row['description'];
            $temp['item_value'] = $row['item_value'];
            $temp['owner_id'] = $row['owner_id'];
            $temp['date_created'] = $row['date_created'];
            $tags = array();
            if ($sub_results = $conn->query("select * from item_tags WHERE item = $item_id;")) {
                while ($tag_row = $sub_results->fetch_assoc()) {
                    $tags[] = $tag_row['tag'];
                }
            }
            $temp['tags'] = $tags;
            setResults(1, $temp);

            $query = "INSERT INTO trade_images (trade_id, image_id) VALUES ($item_id, 4)";
            $conn->query($query);
        }
    }

    printOutput();

?>