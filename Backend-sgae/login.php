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

// 8. Obtener las calificaciones del alumno
$calStmt = $conn->prepare(
    "SELECT c.Mtr_ID, m.Mtr_Nombre, c.Cal_T1, c.Cal_T2, c.Cal_T3, c.Cal_T4
     FROM calificaciones c
     JOIN materias m ON m.Mtr_ID = c.Mtr_ID
     WHERE c.use_id_alumno = ?"
);
$calStmt->bind_param("i", $user['use_id']);
$calStmt->execute();
$calRes = $calStmt->get_result();
$calificaciones = [];
while ($row = $calRes->fetch_assoc()) {
    $promTr = ($row['Cal_T1'] + $row['Cal_T2'] + $row['Cal_T3'] + $row['Cal_T4']) / 4;
    $calificaciones[] = [
        'Mtr_ID' => $row['Mtr_ID'],
        'materia'=> $row['Mtr_Nombre'],
        'T1'     => $row['Cal_T1'],
        'T2'     => $row['Cal_T2'],
        'T3'     => $row['Cal_T3'],
        'T4'     => $row['Cal_T4'],
        'prom'   => round($promTr,2)
    ];
}
$calStmt->close();

// 10. obtener los Eventos de la tabla eventos
$evtStmt = $conn->prepare(
    "SELECT Evento_ID, Evento_Fecha, Evento_Titulo, Evento_Descripcion, use_id_administrador
     FROM calendario"
);
$evtStmt->execute();
$evtRes = $evtStmt->get_result();
$eventos = [];
while ($e = $evtRes->fetch_assoc()) {
    $eventos[] = [
        'id'    => $e['Evento_ID'],
        'fecha' => $e['Evento_Fecha'],
        'titulo'=> $e['Evento_Titulo'],
        'desc'  => $e['Evento_Descripcion']
    ];
}
$evtStmt->close();

// 9. Si todo está bien, devolver JSON con todos los datos necesarios
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
    // Calificaciones
    'calificaciones' => $calificaciones,
    // Eventos
    'eventos' => $eventos,
]);

// 10. Cerrar conexión
$stmt->close();
$conn->close();
