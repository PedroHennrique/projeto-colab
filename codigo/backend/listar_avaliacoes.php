<?php

header('Content-Type: application/json');

// CONEXÃO
$conn = new mysqli("localhost", "root", "", "ttraioDB");

// PEGA O ID
$produto_id = $_GET['produto_id'];

// SQL
$sql = "

SELECT *

FROM avaliacoes

WHERE produto_id = ?

ORDER BY id DESC

";

// PREPARA
$stmt = $conn->prepare($sql);

// BIND
$stmt->bind_param("i", $produto_id);

// EXECUTA
$stmt->execute();

// RESULTADO
$result = $stmt->get_result();

// ARRAY
$avaliacoes = [];

// PERCORRE
while($row = $result->fetch_assoc()){

    $avaliacoes[] = $row;
}

// RETORNA JSON
echo json_encode($avaliacoes);

?>