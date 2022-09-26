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
    
    // initialise the array that is going to be outputed
    $output = array("success"=>0, "results"=>0);

    // check if the query returns a result
    if ($results = $conn->query($query)) {
        if ($results = $conn->query("SELECT * FROM trade_items WHERE id=LAST_INSERT_ID()")) {
            $output['success'] = 1;
            $row = $results->fetch_assoc();
            $output['results'] = $row;
        }
    }

    echo json_encode($output);

?>