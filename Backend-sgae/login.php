<?php
// 1. CORS y JSON
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// 2. Conexión a la base de datos
include('db_connection.php');

// 3. Leer el JSON enviado por React
$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username']  ?? '';
$password = $data['psw']       ?? '';

// 4. Validar que hayan llegado datos
if (empty($username) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Faltan datos."]);
    exit;
}

// 5. Preparar la consulta con JOIN para traer todo en una sola pasada
$sql = "
  SELECT 
    u.use_id,
    u.use_matricula,
    u.use_psw,
    u.use_tipoUser,
    a.Alum_Nombre,
    a.Alum_ApePa,
    a.Alum_ApeMa,
    a.Alum_CURP,
    a.Alum_Promedio,
    a.Alum_Estatus,
    a.Alum_Conducta,
    a.Alum_Foto,
    a.Alum_Turno,
    g.Grado,
    g.Grupo,
    g.Salon_Numero
  FROM usuarios u
  LEFT JOIN alumnos a ON a.use_id = u.use_id
  LEFT JOIN grupos g ON g.Grupo_ID = a.Grupo_ID
  WHERE u.use_matricula = ?
  LIMIT 1
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

// 6. Verificar si se encontró el usuario
if ($result->num_rows !== 1) {
    echo json_encode(["success" => false, "message" => "Usuario no encontrado."]);
    exit;
}

$user = $result->fetch_assoc();

// 7. Validar la contraseña (aquí aún sin hash)
if ($password !== $user['use_psw']) {
    echo json_encode(["success" => false, "message" => "Contraseña incorrecta."]);
    exit;
}

// 8. Si todo está bien, devolver JSON con todos los datos necesarios
echo json_encode([
    "success"      => true,
    "message"      => "Login exitoso",
    "user_id"      => $user['use_id'],
    "matricula"    => $user['use_matricula'],
    "tipo_user"    => $user['use_tipoUser'],
    // Datos de la tabla alumnos
    "nombre"       => $user['Alum_Nombre'],
    "apellidoP"    => $user['Alum_ApePa'],
    "apellidoM"    => $user['Alum_ApeMa'],
    "curp"         => $user['Alum_CURP'],
    "promedio"     => $user['Alum_Promedio'],
    "estatus"      => $user['Alum_Estatus'],
    "conducta"     => $user['Alum_Conducta'],
    "foto"         => $user['Alum_Foto'],
    "turno"        => $user['Alum_Turno'],
    // Datos de la tabla grupos
    "grado"        => $user['Grado'],
    "grupo"        => $user['Grupo'],
    "salon"        => $user['Salon_Numero'],
]);

// 9. Cerrar conexión
$stmt->close();
$conn->close();
