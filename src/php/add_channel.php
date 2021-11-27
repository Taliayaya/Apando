<?php 
require 'config.php';
header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents('php://input');
$_POST = json_decode($rest_json, true);
if (empty($_POST['channel_name'])
|| empty($_POST['server_id']))
die();

if ($_POST)
{
    // set response code - 200 OK

    http_response_code(200);

    // data (ça marche ???!!!)
    $db = getDB();
    $send = $db->prepare('INSERT INTO channels (channel_name, id_server) VALUES (:channel_name,:id_server)');
    $send->bindParam(':channel_name', $_POST['channel_name']);
    $send->bindParam(':id_server', $_POST['server_id']);
    $send->execute();

    echo json_encode(array(
        "added" => true
    ));
}
else {
    // tell the user about error

    echo json_encode([
        "added"=> false,
        "message"=> "Something went wrong"
    ]);
}

?>