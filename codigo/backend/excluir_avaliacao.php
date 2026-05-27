<?php

header('Content-Type: application/json');

// CONEXÃO
$conn = new mysqli("localhost", "root", "", "ttraioDB");

// RECEBE JSON
$data = json_decode(

    file_get_contents("php://input")
);

// PEGA ID
$id = $data->id;

// SQL
$sql = "

DELETE FROM avaliacoes

WHERE id = ?

";

// PREPARA
$stmt = $conn->prepare($sql);

// BIND
$stmt->bind_param("i", $id);

// EXECUTA
if($stmt->execute()){

    echo json_encode([

        "status" => "success",

        "message" => "Avaliação excluída!"
    ]);

}else{

    echo json_encode([

        "status" => "error",

        "message" => "Erro ao excluir avaliação"
    ]);
}

?>