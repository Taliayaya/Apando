<?php
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