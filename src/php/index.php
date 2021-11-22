<?php
require 'config.php';
header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
if (empty($_POST['username'])
|| empty($_POST['email'])
|| empty($_POST['u_password'])
|| empty($_POST['u_password_verif']))
die();

if ($_POST)
{
    
    // set response code - 200 OK
    
	http_response_code(200);
    
	// data
    
    $db = getDB();

    $signup=$db->prepare('INSERT INTO login (pseudo,mail,password) VALUES (:pseudo,:mail,:password)');
	$signup->bindParam(":pseudo", $_POST['username'], PDO::PARAM_STR);
	$signup->bindParam(":mail", $_POST['email'], PDO::PARAM_STR);
	$signup->bindParam(":password", $_POST['u_password'], PDO::PARAM_STR);
    $signup->execute();
    
	echo json_encode(array(
        "sent" => true
	));
}
  else
	{

	// tell the user about error

	echo json_encode(["sent" => false, "username" => "Something went wrong"]);
	}

?>