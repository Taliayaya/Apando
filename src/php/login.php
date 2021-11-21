
<?php 
require 'config.php';
header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if (empty($_POST['username_or_email']
|| empty($_POST['u_password'])))
die();
if ($_POST)
{
    
    // set response code - 200 OK
    
    http_response_code(200);
    
    
    // login 
    $db = getDB();

    
    $login=$db->prepare("SELECT * FROM login WHERE (pseudo=:pseudo OR mail=:mail) AND password=:password");
    $login->bindParam(":pseudo",$_POST['username_or_email'], PDO::PARAM_STR);
    $login->bindParam(":mail",$_POST['username_or_email'], PDO::PARAM_STR);
    $login->bindParam(":password",$_POST['u_password'], PDO::PARAM_STR);
    $login->execute();

    $user_data = $login->fetch();
    if (!empty($user_data))
    {
    echo json_encode(array(
        "logged"=>true
    ));
    }

}
else
    {
        // Quelque chose s'est mal passé

        echo json_encode(["online" => false, "message"=>"Quelque chose s'est mal passé"]);
    }
?>