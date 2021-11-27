
<?php 
require 'config.php';
header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if (empty($_POST['server_id']
|| empty($_POST['loaded'])))
die();
if ($_POST)
{
    
    // set response code - 200 OK
    
    http_response_code(200);
    
    
    // login 
    $db = getDB();

    
    $load=$db->prepare("SELECT id_channel, channel_name, id_server FROM channels WHERE id_server=:id_server");
    $load->bindParam(":id_server",$_POST['server_id'], PDO::PARAM_INT);
    $load->execute();

    $channels_list = array();
    while($row = $load->fetch(PDO::FETCH_ASSOC)){
        $channels_list[]=$row;
    }


    echo json_encode(array(
        "loaded"=>true,
        "channels_data"=>$channels_list
    ));


}
else
    {
        // Quelque chose s'est mal passé

        echo json_encode(["online" => false, "message"=>"Quelque chose s'est mal passé"]);
    }
?>