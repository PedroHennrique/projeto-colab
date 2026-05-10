<?php
$servername = "localhost";
$username = "root";
$password = ""; // senha padrão
$dbname = "ttraioDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Falha na conexão com o banco."]));
}

$data = json_decode(file_get_contents("php://input"), true);
$user = $data['username'];
$email = $data['email'];

$sql = "SELECT password FROM usuarios WHERE username = '$user' AND email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode(["status" => "success", "password" => $row['password']]);
} else {
    echo json_encode(["status" => "error", "message" => "Usuário ou e-mail não encontrados."]);
}

$conn->close();
?>
