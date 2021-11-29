<?php
require "fonctions.php";
checksignup($_POST);
// Suppression des specialchars
$credentials=htchange($_POST);


// try
// {
//     $db=new PDO('mysql:host=localhost;dbname=logins','root','');
// }
// catch (Exception $e)
// {
//     die('Error : ' . $e->getMessage());
// }
// $signup=$db->prepare('INSERT INTO login (pseudo,mail,password) VALUES (?,?,?)');
// $signup->execute(array($credentials['pseudo'],$credentials['mail'],$credentials['password']));
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title> Infos login </title>
</head>

<body>
    <div>
        <?= $credentials["mail"] ?>
        <?= $credentials["pseudo"] ?>
        <?= $credentials["password"]==$credentials["password_check"] ?>
    </div>
</body>
</html>