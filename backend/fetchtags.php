<?php

    include('conf.php');

    $query = "SELECT * FROM tags";

    $output = array("success"=>0, "results"=>0);

    if ($results = $conn->query($query)) {
        $output['success'] = 1;
        while ($row = $results->fetch_assoc()) {
            $resArray[] = $row;
        }

        $output["results"] = $resArray;
    }

    echo json_encode($output);

?>