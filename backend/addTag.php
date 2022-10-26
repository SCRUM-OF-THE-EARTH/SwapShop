<?php

    include('conf.php');

    $name = $_REQUEST['name'];

    $query = "INSERT INTO tags (name, date_created) VALUES ('$name', CURDATE())";


    if ( $result = $conn->query($query)) {
        if ($result = $conn->query("SELECT * FROM tags WHERE id=LAST_INSERT_ID()")){
            $row = $result->fetch_assoc();
            setResults(1, $row);
        }
    }

    printOutput();
?>