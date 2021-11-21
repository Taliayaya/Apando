<?php
// Vérifications de routine, avec renvoi d'erreur par $_SESSION["signuperror"] : vérification de présence, de regex,
// suppression des specialchars.
session_start();
if (!(isset($_POST["mail"]) && (isset($_POST["pseudo"]) && (isset($_POST["password"]) && (isset($_POST["passwordcheck"]))){
    $_SESSION["signuperror"]="badpost";
    header('Location : /Project-Plateforme/public/signup.html',true,301);
    exit();
}
if (!filter_var($_POST["mail"],FILTER_VALIDATE_EMAIL)){
    $_SESSION["signuperror"]="badmail";
    header('Location : /Project-Plateforme/public/signup.html',true,301);
    exit();
}
if (!preg_match("#^([a-zA-Z0-9._\/\\-]){8,24}$#",$_POST["pseudo"])){
    $_SESSION["signuperror"]="badpseudo";
    header('Location : /Project-Plateforme/public/signup.html',true,301);
    exit();
}
if (!preg_match("#^([a-zA-Z0-9._\/\\-]){8,24}$#",$_POST["password"])){
    $_SESSION["signuperror"]="badpassword";
    header('Location : /Project-Plateforme/public/signup.html',true,301);
    exit();
}
if (!($_POST["password"]==$_POST["passwordcheck"])){
    $_SESSION["signuperror"]="unequalpassword";
    header('Location : /Project-Plateforme/public/signup.html',true,301);
    exit();
}
htmlspecialchars($_POST["mail"]);
htmlspecialchars($_POST["pseudo"]);
htmlspecialchars($_POST["password"]);
htmlspecialchars($_POST["passwordcheck"]);

try
{
    $db=new PDO('mysql:host=localhost;dbname=logins','root','');
}
catch (Exception $e)
{
    die('Error : ' . $e->getMessage());
}
$signup=$db->prepare('INSERT INTO login (pseudo,mail,password) VALUES (?,?,?)');
$signup->execute(array($_POST['pseudo'],$_POST['mail'],$_POST['password']));
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title> Infos login </title>
</head>

<body>
    <div>
        <?= $_POST["mail"] ?>
        <?= $_POST["pseudo"] ?>
        <?= $_POST["password"]==$_POST["password_check"] ?>
    </div>
</body>
</html>