<?php 
require 'config.php';
header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents('php://input');
$_POST = json_decode($rest_json, true);
if (empty($_POST[0]['message'])
|| empty($_POST[0]['user_id'])
|| empty($_POST[1]))
die();

if ($_POST)
{   
    // get variables | on peut tester leur fiabibilité ici
    $message = $_POST[0]['message'];
    $user_id = $_POST[0]['user_id'];
    $id_channel = $_POST[1];

    // set response code - 200 OK

    http_response_code(200);

    // data (ça marche ???!!!)
    $db = getDB();
    $send = $db->prepare('INSERT INTO messages (message, message_date, u_id, id_channel) VALUES (:message, NOW(), :u_id, :id_channel)');
    $send->bindParam(':message', $message, PDO::PARAM_STR);
    $send->bindParam(':u_id', $user_id, PDO::PARAM_INT);
    $send->bindParam(':id_channel', $id_channel, PDO::PARAM_INT);
    $send->execute();

    echo json_encode(array(
        "sent" => true,
        "all"=>[$message, $user_id, $id_channel],
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