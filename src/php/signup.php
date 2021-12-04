<?php
require "fonctions.php";
// A CHANGER UNE FOIS INSTALLE
header('Access-Control-Allow-Origin: http://localhost');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
checksignup($_POST);
// Suppression des specialchars
$credentials=htchange($_POST);
inserdatabase($credentials);
echo json_encode(["finished" => true]);
exit();
?>