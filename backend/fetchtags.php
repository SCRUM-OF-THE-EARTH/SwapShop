<?php

    include('conf.php');

    $query = "SELECT * FROM tags";

    if ($results = $conn->query($query)) {
        while ($row = $results->fetch_assoc()) {
            $resArray[] = $row;
        }

        setResults(1, $resArray);
    }

    printOutput();

?>