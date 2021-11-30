<?php 
require 'config.php';
header("Access-Control-Allow-Origin: *"); 


if ($_FILES && $_POST)
{
    $user_id = $_POST['user_id'];

    $infoFichier = pathinfo($_FILES['file']['name']);
    $extension_upload = $infoFichier['extension'];
    $fullName = "avatar_".basename($user_id).".".$extension_upload;

    $extensions_autorisees = array('jpg', 'jpeg', 'gif', 'png');
    if (! in_array($extension_upload, $extensions_autorisees)) {
        exit;
    }
    // On déplace l'image dans le dossier avatar
    move_uploaded_file($_FILES['file']['tmp_name'], '../images/avatars/'.$fullName);
    
    $db = getDB();
    $add = $db->prepare('UPDATE login SET avatar=:avatar WHERE id=:id');
    $add->bindParam(':avatar', $fullName, PDO::PARAM_STR);
    $add->bindParam(':id', $user_id, PDO::PARAM_INT);
    $add->execute();

    echo json_encode(array(
        "done"=>true,
        "data"=>$_FILES,
        "test"=>$_POST
    ));
    // move_uploaded_file($_FILES["file"])
    exit;
}
?>