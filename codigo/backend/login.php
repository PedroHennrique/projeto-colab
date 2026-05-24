<?php
$servername = "localhost";
$username = "root";
$password = ""; // senha padrão
$dbname = "ttraioDB";

// Conexão com MySQL
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Recebe dados do formulário
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$pass = $data['password'];

// Consulta
$sql = "SELECT username, tipo FROM usuarios WHERE email='$email' AND password='$pass'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode([
        "status" => "success",
        "username" => $row['username'],
        "tipo" => $row['tipo']
    ]);
} else {
    http_response_code(401);
    echo json_encode([
        "status" => "error",
        "message" => "Email ou senha inválidos"
    ]);
}

$conn->close();
?>