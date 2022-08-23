<?php

    include("conf.php");

    $username = $_REQUEST['user'];
    $password = $_REQUEST['pass'];

    $query = "SELECT COUNT(*) AS exist FROM user_login_details WHERE username='$username'";

    if ($result = $conn->query($query)) {
        $row = $result->fetch_assoc();
        if ($row["exist"] == 1){
            checkLogin($username, $password, $conn);
        } else {
            echo "no account with username $username exists";
        }
    } else {
        echo "something went wrong with Query";
    }


    function checkLogin($username, $password, $conn) {
        $sql = "SELECT *, COUNT(*) AS valid FROM user_login_details WHERE username='$username' AND password='$password'";
        
        if ($res = $conn->query($sql)) {
            $row = $res->fetch_assoc();
            if ($row['valid'] == 1){
                echo json_encode($row);
            } else {
                echo "Password is incorrect";
            }
            return;
        }
        echo "something went wrong with query";
    }

?>