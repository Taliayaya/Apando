<?php
function checksignup($post){
// Vérifications de routine, avec renvoi d'erreur par $_SESSION["signuperror"] : vérification de présence et de regex
    $error = match(true){
        !($post) => "nopost",
        (!(isset($post["mail"]) && isset($post["pseudo"]) && isset($post["password"]) && isset($post["password_check"]))) => "badpost",
        (!filter_var($post["mail"],FILTER_VALIDATE_EMAIL)) => "badmail",
        (!preg_match("#^([a-zA-Z0-9._\/\\-]){8,24}$#",$post["pseudo"])) => "badpseudo",
        (!preg_match("#^([a-zA-Z0-9._\/\\-]){8,24}$#",$post["password"])) => "badpassword",
        (!($post["password"]==$post["password_check"])) => "unequalpassword",
        true => null,
    };
    if ($error) {
        echo json_encode(["sent" => false, "error" => $error]);
        header('Location: /Project-Plateforme/public/signup.html');
        exit();
    }
    else {
        echo json_encode(["sent" => true]);
    }
}

function htchange($list){
//Prend tous les éléments d'une liste et les passe en htmlspecialchars
        $result=array_map('htmlspecialchars',$list);
        return $result;
}