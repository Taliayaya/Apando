<?php 
require 'config.php';
header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents('php://input');
$_POST = json_decode($rest_json, true);


if ($_POST)
{
    // set response code - 200 OK

    http_response_code(200);

    // data (ça marche ???!!!)
    $db = getDB();
    $load = $db->query('SELECT pseudo, id_message, message, message_date, u_id FROM messages LEFT JOIN login ON id=u_id ORDER BY message_date DESC');

    $messages_list = array();
    while($row = $load->fetch(PDO::FETCH_ASSOC)) {
        $messages_list[]=$row;
    }

    
    echo json_encode(array(
        "loaded" => true,
        "messages_list"=>$messages_list
    ));
}
else {
    // tell the user about error

    echo json_encode([
        "loaded"=> false,
        "message"=> "Something went wrong"
    ]);
}
