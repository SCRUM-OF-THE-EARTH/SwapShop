<?php

    include("conf.php");

    $name = $_REQUEST['name'];
    $description = $_REQUEST['desc'];
    $value = $_REQUEST['value'];
    $id =$_REQUEST['id'];

    $query = "INSERT INTO trade_items (item_name, description, item_value, owner_id) VALUE ('$name', '$description',$value, $id);";
    
    $output = array("success"=>0, "results"=>0);

    if ($results = $conn->query($query)) {
        if ($results = $conn->query("SELECT * FROM trade_items WHERE id=LAST_INSERT_ID()")) {
            $output['success'] = 1;
            $row = $results->fetch_assoc();
            $output['results'] = $row;
        }
    }

    echo json_encode($output);

?>