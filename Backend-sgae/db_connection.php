<?php
$host = 'localhost';
$db = 'sgae-db-v3';
$user = 'root';
$pass = 'mACD040904HTCYRVA9*';

// Crear conexión
$conn = new mysqli($host, $user, $pass, $db);

// Verificar conexión
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Error de conexión: " . $conn->connect_error]);
    exit;
}
?>
