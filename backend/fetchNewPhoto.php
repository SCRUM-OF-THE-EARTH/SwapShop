<?php

    include('conf.php');

    $user_id = $_REQUEST['id'];

    $query = "SELECT photo from user_login_details WHERE id = $user_id";
    $output = array("success"=>0, "results"=>0);

    if ($results = $conn->query($query)) {
        $output['success'] = 1;

        $row = $results->fetch_assoc();
        $output['results'] = $row;

    }

    echo json_encode($output);

?>