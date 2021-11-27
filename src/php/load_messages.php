<?php 
require 'config.php';
header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents('php://input');
$_POST = json_decode($rest_json, true);


if ($_POST)
{

    // On peut tester les variables ici
    $id_channel = $_POST[1];
    // set response code - 200 OK

    http_response_code(200);

    // data (ça marche ???!!!)
    $db = getDB();
    $load = $db->prepare('SELECT pseudo, id_message, message, message_date, u_id FROM messages LEFT JOIN login ON id=u_id WHERE id_channel=:id_channel ORDER BY message_date DESC');
    $load->bindParam("id_channel", $id_channel, PDO::PARAM_INT);
    $load->execute();
    $messages_list = array();
    while($row = $load->fetch(PDO::FETCH_ASSOC)) {
        $messages_list[]=$row;
    }

    
    echo json_encode(array(
        "loaded" => true,
        "messages_list"=>$messages_list,
        "currentChannel"=> $_POST[1]
    ));
}
else {
    // tell the user about error

    echo json_encode([
        "loaded"=> false,
        "message"=> "Something went wrong"
    ]);
}
