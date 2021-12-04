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
// Redirection temporaire : sera redirigée à l'avenir vers la page d'instructions pour la confirmation du compte
echo json_encode(["finished" => true]);
exit();
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title> Infos login </title>
</head>

<body>
    <div>
        <?= "Merci de vous être inscrit !"?>
    </div>
</body>
</html>