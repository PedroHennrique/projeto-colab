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
$usuario = $data['username'];
$email = $data['email'];
$senha = $data['password'];
$usuarioAntigo = $data['usuarioAntigo'];

// Atualiza os dados do usuário
$sql = "UPDATE usuarios SET username='$usuario', email='$email', password='$senha' WHERE username='$usuarioAntigo'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Dados atualizados com sucesso!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Erro: " . $conn->error]);
}

$conn->close();
?>
