<?php

    include("../../backend/conf.php");

    $out = fopen("out.txt", "wb");
    fwrite($out, "File started...\n");

    $ImageBase64= $_POST['image_content'];
    fwrite($out,"image Base" . $ImageBase64 . "\n");
    $fileName = time() . '_' . $_POST['image_file'];
    fwrite($out,"File name" . $fileName . "\n");
    $item_id = $_POST['item_id'];
    fwrite($out,"item id" . $item_id . "\n");
    $item_type = $_POST['item_type'];
    fwrite($out, "item type" . $item_type . "\n");

    $ifp = fopen($fileName, "wb");
    $url = 'https://sudocode.co.za/SwapShop/assets/images/' . $fileName;
    fwrite($out, $url . "\n");
    fwrite($ifp, base64_decode($ImageBase64));
    fclose($ifp);


    if ($item_type == 'profile') {
        $query = "UPDATE user_login_details SET photo = '$url' WHERE id = $item_id";
    }

    if ($item_type == 'trade') {
        $conn->query($query);
        $query = "INSERT INTO trade_images (image_name, image_url, trade_id) VALUES ('$fileName', '$url', $item_id)";
    }   
    

    if ($results = $conn->query($query)) {
        echo "success";
    }
?>