<?php

    include("conf.php");

    $id = $_REQUEST['id'];

    $query = "DELETE FROM user_login_details WHERE id = $id";

    $output = array("success"=>0, "results"=>0);

    if ($results = $conn->query($query)) {
        $output["success"] = 1;
    }

    echo json_encode($output);

?>