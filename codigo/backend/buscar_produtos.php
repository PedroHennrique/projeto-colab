<?php

header("Content-Type: application/json");

$conn = new mysqli(
    "localhost",
    "root",
    "",
    "ttraioDB"
);

if ($conn->connect_error) {

    die(json_encode([
        "status" => "erro"
    ]));
}

$sql = "SELECT * FROM produtos";

$result = $conn->query($sql);

$produtos = [];

while($row = $result->fetch_assoc()) {

    $produtos[] = $row;

}

echo json_encode($produtos);

$conn->close();

?>