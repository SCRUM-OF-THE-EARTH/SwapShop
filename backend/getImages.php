<?php

    include('./conf.php');

    $Id = $_REQUEST['id'];

    $query = "SELECT * FROM trade_images WHERE trade_id = $Id;";
    $output = array("success"=>0, "results"=>0);

    $data = array();
    if ($result = $conn->query($query)) {
        $output['success'] = 1;
        while ($row = $result->fetch_assoc()) {
            $data[] = $row['image_url'];
        }

        $output["results"] = $data;
    }

    echo json_encode($output);

?>