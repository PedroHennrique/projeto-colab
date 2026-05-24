<?php

$conn = new mysqli("localhost","root","","ttraioDB");

$data = json_decode(file_get_contents("php://input"), true);

$nome = $data['nome'];
$preco = $data['preco'];
$imagem = $data['imagem'];

$sql = "INSERT INTO produtos(nome,preco,imagem)
VALUES('$nome','$preco','$imagem')";

if($conn->query($sql)){
    echo "Produto cadastrado!";
}else{
    echo "Erro!";
}

?>