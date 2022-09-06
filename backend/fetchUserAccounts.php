<?php

    include("conf.php");

    $query = "SELECT * FROM user_login_details";

    $output = array("succes"=>0, "results"=>0);
    $user_accounts = array();
    if ($results = $conn->query($query)) {
        $output["success"] = 1;
        while($row = $results->fetch_assoc()) {
            $user_accounts[] = $row;
        }
        $output["results"] = $user_accounts;
    }

    echo json_encode($output);

?>