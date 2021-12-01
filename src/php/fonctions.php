<?php
function checksignup($post)
{
    // Vérifications de routine, avec renvoi d'erreur par $_SESSION["signuperror"] : vérification de présence et de regex
    $error = match (true) {
        !($post) => "nopost",
        (!(isset($post["mail"]) && isset($post["pseudo"]) && isset($post["password"]) && isset($post["password_check"]))) => "badpost",
        (!filter_var($post["mail"], FILTER_VALIDATE_EMAIL)) => "badmail",
        (!preg_match("#^([a-zA-Z0-9._\/\\-]){8,24}$#", $post["pseudo"])) => "badpseudo",
        (!preg_match("#^([a-zA-Z0-9._\/\\-]){8,24}$#", $post["password"])) => "badpassword",
        (!($post["password"] == $post["password_check"])) => "unequalpassword",
        true => null,
    };
    if ($error) {
        echo json_encode(["sent" => false, "error" => $error]);
        header('Location: /Project-Plateforme/public/signup.html');
        exit();
    } else {
        echo json_encode(["sent" => true]);
    }
}

function htchange($list)
{
    // Prend tous les éléments d'une liste et les passe en htmlspecialchars
    $result = array_map('htmlspecialchars', $list);
    return $result;
}

function inserdatabase($contents)
{
    // Insère dans la database les éléments d'une liste correspondant à la table des personnes
    // Le hashing, salting et peppering se feront dans des prochaines versions à l'aide d'un prochain set de fonctions
    // Un peppering grossier de toutes les informations est prévu, et un salting avancé des mots de passe
    // La vérification par mail ne se fera que plus tard
    try {
        $db = new PDO('mysql:host=localhost;dbname=logins', 'root', '');
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // Test si les valeurs osnt déjà existantes dans la db
        $query=$db->prepare("SELECT * FROM login WHERE pseudo = ?");
        $query->execute(array($contents['pseudo']));
        $possiblepseudos = $query->fetch();
        $query=$db->prepare("SELECT * FROM login WHERE mail = ?");
        $query->execute(array($contents['mail']));
        $possiblemails = $query -> fetch();
        if ($possiblepseudos) {
            throw new Exception("existentpseudo");
        } elseif ($possiblemails) {
            throw new Exception("existentmail");
        }
        // Insertion dans la db
        $signup = $db->prepare('INSERT INTO login (pseudo,mail,password) VALUES (?,?,?)');
        $signup->execute(array($contents['pseudo'], $contents['mail'], $contents['password']));
    } catch (Exception $e) {
        $e = $e -> getMessage();
        if (!($e=="existentpseudo" || $e=="existentmail")) {
        $e = "dbproblem";
        }
        echo json_encode(["dbrecorded" => false, "dberror" => $e]);
        header('Location: /Project-Plateforme/public/signup.html');
        die();
    }
    echo json_encode(["dbrecorded" => true]);
}
