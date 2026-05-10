<?php
$servername = "localhost";
$username = "root";
$password = ""; // senha padrão
$dbname = "ttraioDB";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
$user = $data['username'];

$sql = "SELECT username, email, password FROM usuarios WHERE username='$user'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode(["status" => "success", "user" => $row]);
} else {
    echo json_encode(["status" => "error", "message" => "Usuário não encontrado"]);
}

$conn->close();
?>
