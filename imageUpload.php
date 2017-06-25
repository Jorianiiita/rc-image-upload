<?php
header('Access-Control-Allow-Origin: *');

if(isset($_POST)){
    echo '<pre>';
    print_r($_FILES);
    echo '</pre>';
    foreach ($_FILES as $key => $value) {
      $name = $_FILES[$key]['name'];
      list($txt, $ext) = explode(".", $name);
      $image_name = $txt . time() . ".".$ext;
      $tmp = $_FILES[$key]['tmp_name'];
      if(move_uploaded_file($tmp, 'uploads/'.$image_name)){
          echo "image uploaded successfully with name " . $image_name;
      }else{
          echo "image uploading failed with name " . $image_name;
      }
    }
}else{
    echo "Please select image";
}
?>