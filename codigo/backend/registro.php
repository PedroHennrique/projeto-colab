<?php
$servername = "localhost";
$username = "root";
$password = ""; // senha padrão
$dbname = "ttraioDB";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) { die("Conexão falhou: " . $conn->connect_error); }

$data = json_decode(file_get_contents("php://input"), true);
$user = $data['username'];
$email = $data['email'];
$pass = $data['password'];

$sql = "INSERT INTO usuarios (username, email, password) VALUES ('$user', '$email', '$pass')";

if ($conn->query($sql) === TRUE) {
    echo "Usuário registrado com sucesso!";
} else {
    echo "Erro: " . $conn->error;
}

$conn->close();
?>