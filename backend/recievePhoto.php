<?php

    include("../../backend/conf.php");

    $ImageBase64= $_POST['image_content'];
    $fileName = time() . '_' . $_POST['image_file'];
    $item_id = $_POST['item_id'];

    $ifp = fopen($fileName, "wb");
    $url = 'https://sudocode.co.za/SwapShop/assets/images/' . $fileName;
    fwrite($ifp, base64_decode($ImageBase64));
    fclose($ifp);

    $query = "INSERT INTO trade_images (image_name, image_url, trade_id) VALUES ('$fileName', '$url', $item_id)";

    if ($results = $conn->query($query)) {
        echo "success";
    }
?>