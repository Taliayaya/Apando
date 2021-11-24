<?php 
require 'config.php';
header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents('php://input');
$_POST = json_decode($rest_json, true);
if (empty($_POST['message'])
|| empty($_POST['user_id']))
die();

if ($_POST)
{
    // set response code - 200 OK

    http_response_code(200);

    // data (ça marche ???!!!)
    $db = getDB();
    $send = $db->prepare('INSERT INTO messages (message, message_date, u_id) VALUES (:message, NOW(), :u_id)');
    $send->bindParam(':message', $_POST['message']);
    $send->bindParam(':u_id', $_POST['user_id']);
    $send->execute();

    echo json_encode(array(
        "sent" => true
    ));
}
else {
    // tell the user about error

    echo json_encode([
        "sent"=> false,
        "message"=> "Something went wrong"
    ]);
}

?>