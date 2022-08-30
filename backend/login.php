<?php

    include("conf.php");

    $username = $_REQUEST['user'];
    $password = $_REQUEST['pass'];

    $query = "SELECT COUNT(*) AS exist FROM user_login_details WHERE username='$username'";

    $output = array("success"=>0, "results"=>0);

    if ($result = $conn->query($query)) {
        $row = $result->fetch_assoc();

        if ($row["exist"] == 1){
            $results = checkLogin($username, $password, $conn);
            if ($results != 0) {
                $output['success'] = 1;
            }
            $output["results"] = $results;
        }
    }

    echo json_encode($output);


    function checkLogin($username, $password, $conn) {
        $sql = "SELECT *, COUNT(*) AS success FROM user_login_details WHERE username='$username' AND password='$password'";
        
        if ($res = $conn->query($sql)) {
            $row = $res->fetch_assoc();

            if ($row['success'] == 1){
                return $row;
            }

        }

        return 0;
    }

?>