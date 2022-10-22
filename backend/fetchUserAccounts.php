<?php

    include("conf.php");

    $query = "SELECT * FROM user_login_details";

    $output = array("success"=>0, "results"=>0);
    $users = array();
    $user_accounts = array('id'=>0, 'fname'=>'', 'lname'=>'', 'username'=>'', 'password'=>'', 'email'=>'', 'tags'=>'', 'photo' =>"");
    if ($results = $conn->query($query)) {
        $output["success"] = 1;
        while($row = $results->fetch_assoc()) {
            $user_id = $row['id'];
            $user_accounts['id'] = $user_id;
            $user_accounts['fname'] = $row['fname'];
            $user_accounts['lname'] = $row['lname'];
            $user_accounts['username'] = $row['username'];
            $user_accounts['password'] = $row['password'];
            $user_accounts['email'] = $row['email'];
            $user_accounts['photo'] = $row['photo'];
            $tags = array();

            if ($user_results = $conn->query("SELECT * FROM user_tags WHERE user = $user_id")) {
                while ($tag_row = $user_results->fetch_assoc()) {
                    $tags[] = $tag_row['tags'];
                }
            }
            $user_accounts['tags'] = $tags;
            $users[] = $user_accounts;
        }
        
    }

    $output['results'] = $users;


    echo json_encode($output);

?>