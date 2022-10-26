<?php

    include("conf.php");

    $id = $_REQUEST['id'];

    $query = "DELETE FROM user_login_details WHERE id = $id";

    if ($results = $conn->query($query)) {
        setResults(1, 0);
    }

    printOutput();

?>