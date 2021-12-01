<?php
require "fonctions.php";
checksignup($_POST);
// Suppression des specialchars
$credentials=htchange($_POST);
inserdatabase($credentials);
// Redirection temporaire : sera redirigée à l'avenir vers la page d'instructions pour la confirmation du compte
echo json_encode(["finished" => true]);
// header('Location: /Project-Plateforme/public/signup.html');
// exit();
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