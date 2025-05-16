<?php
// admin_prof_generator.php
// Configuración de la conexión a la base de datos
declare(strict_types=1);
$host = 'localhost';
$user = 'root';
$pass = 'mACD040904HTCYRVA9*';
$db   = 'sgae-db-v3';

// Crear la conexión
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Arrays de datos base
$nombres = ["David", "Luis", "Fernando", "Juan", "Mauricio", "Carlos", "Nemon", "Omar", "Julian", "Carmelio"];
$apePa   = ["Hernández", "García", "Martínez", "López", "González", "Pérez", "Rodríguez", "Sánchez", "Ramírez", "Cruz"];
$apeMa   = ["Hernández", "García", "Martínez", "López", "González", "Pérez", "Rodríguez", "Sánchez", "Ramírez", "Cruz"];
$turnos  = ["M", "V"]; // Matutino, Vespertino
$psws    = ["pass", "1234", "abcd"];

// Función para crear usuarios y perfiles
define('MATRICULA_PROF','25M');
define('MATRICULA_ADMIN','25A');
function generarUsuarios(
    mysqli $conn,
    int $cantidad,
    string $tipoUser,
    string $matBase,
    string $tablaDetalle // 'profesores' o 'administradores'
) {
    global $nombres, $apePa, $apeMa, $turnos, $psws;

    // Contar existentes para este tipo
    $res = $conn->query("SELECT COUNT(*) AS total FROM usuarios WHERE use_tipoUser='" . $tipoUser . "'");
    $count = ($res->fetch_assoc()['total'] ?? 0) + 1;

    for ($i = 0; $i < $cantidad; $i++, $count++) {
        // Generar matrícula: base + 7 dígitos
        $sequence = str_pad((string)$count, 7, '0', STR_PAD_LEFT);
        $matricula = $matBase . $sequence;
        // Evitar duplicados
        $chk = $conn->prepare("SELECT 1 FROM usuarios WHERE use_matricula=?");
        $chk->bind_param('s', $matricula);
        $chk->execute();
        $chk->store_result();
        if ($chk->num_rows > 0) { $i--; continue; }
        $chk->close();

        // Elegir datos aleatorios
        $psw = $psws[array_rand($psws)];
        // Insertar en usuarios
        $stmt = $conn->prepare(
            "INSERT INTO usuarios (use_matricula, use_psw, use_tipoUser) VALUES (?, ?, ?)"
        );
        $stmt->bind_param('sss', $matricula, $psw, $tipoUser);
        $stmt->execute();
        $uid = $stmt->insert_id;
        $stmt->close();

        // Datos detallados
        $nom = $nombres[array_rand($nombres)];
        $pa  = $apePa[array_rand($apePa)];
        $ma  = $apeMa[array_rand($apeMa)];
        $turn= $turnos[array_rand($turnos)];

        // Insertar en tabla de detalle
        if ($tablaDetalle === 'profesores') {
            $ins = $conn->prepare(
                "INSERT INTO profesores (use_id, Prof_Nombres, Prof_ApePa, Prof_ApeMa, Prof_Turno) VALUES (?,?,?,?,?)"
            );
            $ins->bind_param('issss', $uid, $nom, $pa, $ma, $turn);
        } else {
            $ins = $conn->prepare(
                "INSERT INTO administradores (use_id, Adm_Nombre, Adm_ApePa, Adm_ApeMa, Adm_Turno) VALUES (?,?,?,?,?)"
            );
            $ins->bind_param('issss', $uid, $nom, $pa, $ma, $turn);
        }
        $ins->execute();
        $ins->close();

        echo "Usuario $tipoUser creado: $matricula / Contraseña: $psw<br>";
    }
}

// Procesar formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $admins   = intval($_POST['admins'] ?? 0);
    $profs    = intval($_POST['profs']  ?? 0);
    if ($admins > 0)   generarUsuarios($conn,$admins, 'administrador', MATRICULA_ADMIN, 'administradores');
    if ($profs  > 0)   generarUsuarios($conn,$profs,    'profesor',     MATRICULA_PROF, 'profesores');
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generar Profesores y Administradores</title>
</head>
<body>
  <h1>Generador de Usuarios</h1>
  <form method="POST">
    <label>Administradores a crear:</label>
    <input type="number" name="admins" min="0" value="0" /><br><br>
    <label>Profesores a crear:</label>
    <input type="number" name="profs"  min="0" value="0" /><br><br>
    <button type="submit">Generar Usuarios</button>
  </form>
</body>
</html>
