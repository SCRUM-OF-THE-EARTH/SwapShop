<?php

    include('conf.php');

    $name = $_REQUEST['name'];

    $query = "INSERT INTO tags (name, date_created) VALUES ('$name', CURDATE())";

    $output = array("success"=>0, "results"=>0);

    if ( $result = $conn->query($query)) {
        $output['success'] = 1;
        if ($result = $conn->query("SELECT * FROM tags WHERE id=LAST_INSERT_ID()")){
            $row = $result->fetch_assoc();

            $output['results'] = $row;
        }
    }

    echo json_encode($output);
?>