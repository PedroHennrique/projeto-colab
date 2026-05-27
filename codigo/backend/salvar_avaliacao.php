<?php

header('Content-Type: application/json');

// CONEXÃO
$conn = new mysqli("localhost", "root", "", "ttraioDB");

// VERIFICA CONEXÃO
if($conn->connect_error){

    die(json_encode([

        "status" => "error",

        "message" => "Erro na conexão"
    ]));
}

// RECEBE JSON
$data = json_decode(

    file_get_contents("php://input")
);

// VERIFICA DADOS
if(!$data){

    echo json_encode([

        "status" => "error",

        "message" => "Dados inválidos"
    ]);

    exit;
}

// VARIÁVEIS
$produto_id = $data->produto_id;
$usuario = $data->usuario;
$nota = $data->nota;
$comentario = $data->comentario;

// SQL
$sql = "

INSERT INTO avaliacoes

(

    produto_id,

    usuario,

    nota,

    comentario

)

VALUES (?, ?, ?, ?)

";

// PREPARA
$stmt = $conn->prepare($sql);

// BIND
$stmt->bind_param(

    "isis",

    $produto_id,

    $usuario,

    $nota,

    $comentario
);

// EXECUTA
if($stmt->execute()){

    echo json_encode([

        "status" => "success",

        "message" => "Avaliação enviada!"
    ]);

}else{

    echo json_encode([

        "status" => "error",

        "message" => "Erro ao enviar avaliação"
    ]);
}
?>