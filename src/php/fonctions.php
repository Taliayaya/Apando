<?php
function checksignup($post){
// Vérifications de routine, avec renvoi d'erreur par $_SESSION["signuperror"] : vérification de présence et de regex
    $error = match(true){
        (!(isset($post["mail"]) && isset($post["pseudo"]) && isset($post["password"]) && isset($post["password_check"]))) => "badpost",
        (!filter_var($post["mail"],FILTER_VALIDATE_EMAIL)) => "badmail",
        (!preg_match("#^([a-zA-Z0-9._\/\\-]){8,24}$#",$post["pseudo"])) => "badpseudo",
        (!preg_match("#^([a-zA-Z0-9._\/\\-]){8,24}$#",$post["password"])) => "badpassword",
        (!($post["password"]==$post["password_check"])) => "unequalpassword",
        true => "",
    };
    if ($error) {
        session_start();
        $_SESSION["signuperror"]=$error;
        header('Location: /Project-Plateforme/public/signup.html');
        exit();
    }
}