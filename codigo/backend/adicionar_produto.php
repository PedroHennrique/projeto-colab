<?php

$conn = new mysqli("localhost","root","","ttraioDB");

header('Content-Type: application/json');

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

// DEBUG (remove depois)
file_put_contents("debug.txt", $raw);

$nome = $data['nome'] ?? '';
$preco = $data['preco'] ?? '';
$imagem = $data['imagem'] ?? '';
$categoria = $data['categoria'] ?? '';

$sql = "INSERT INTO produtos(nome,preco,imagem,categoria)
VALUES('$nome','$preco','$imagem','$categoria')";

if($conn->query($sql)){
    echo "Produto cadastrado!";
} else {
    echo "Erro: " . $conn->error;
}

?>