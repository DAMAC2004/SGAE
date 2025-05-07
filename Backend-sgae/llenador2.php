<?php
// Configuración de la conexión a la base de datos
$host = "localhost";
$user = "root";
$pass = "mACD040904HTCYRVA9*";
$db   = "sgae-db-v3";

// Crear la conexión
$conexion = new mysqli($host, $user, $pass, $db);
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Arrays de valores para generar registros
$matriculaBase = "25S01"; // Base para generar matrícula
$nombres = ["David", "Luis", "Fernando", "Juan", "Mauricio", "Carlos", "Nemon", "Omar", "Julian", "Carmelio"];
$apePa   = ["Hernández", "García", "Martínez", "López", "González", "Pérez", "Rodríguez", "Sánchez", "Ramírez", "Cruz"];
$apeMa   = ["Hernández", "García", "Martínez", "López", "González", "Pérez", "Rodríguez", "Sánchez", "Ramírez", "Cruz"];
$turnos  = ["M", "V"]; // 'M' Matutino, 'V' Vespertino
$promedios = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
$estatusAll = ["Activo", "Expulsado", "Graduado"]; 
$conductas = ["Buena", "Regular", "Mala"];
$ftos    = ["1", "2", "3", "4", "5"]; // Valores de foto (placeholder)
$psws    = ["1234", "abcd", "pass", "9876"]; // Ejemplo de contraseñas (estas se pueden hashear luego)
$curpChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Función para generar una CURP aleatoria de 18 caracteres
function generarCURP($chars) {
    $length = 18;
    $curp = "";
    $maxIndex = strlen($chars) - 1;
    for ($i = 0; $i < $length; $i++) {
        $curp .= $chars[rand(0, $maxIndex)];
    }
    return $curp;
}

// Función para obtener un grupo aleatorio de la tabla 'grupos'
function obtenerGrupoAleatorio($conexion) {
    $sql = "SELECT Grupo_ID FROM grupos";
    $resultado = $conexion->query($sql);
    $grupos = [];
    if ($resultado && $resultado->num_rows > 0) {
        while ($row = $resultado->fetch_assoc()) {
            $grupos[] = $row['Grupo_ID'];
        }
    }
    if (count($grupos) > 0) {
        return $grupos[array_rand($grupos)];
    } else {
        return null;
    }
}

// Función para generar registros de alumnos
function generarRegistros($numRegistros, $conexion, $matriculaBase, $nombres, $apePa, $apeMa, $turnos, $promedios, $estatusAll, $conductas, $ftos, $psws, $curpChars) {
    // Obtener el contador a partir del número de registros en la tabla 'usuarios' para alumnos
    $result = $conexion->query("SELECT COUNT(*) as total FROM usuarios WHERE use_tipoUser='alumno'");
    $row = $result->fetch_assoc();
    $contador = (int)$row['total'];

    for ($i = 0; $i < $numRegistros; $i++) {
        // Generar matrícula única
        $matriculaGenerada = $matriculaBase . sprintf("%05d", $contador);
        $existe = true;
        while ($existe) {
            $sqlCheck = "SELECT * FROM usuarios WHERE use_matricula = '$matriculaGenerada'";
            $checkResult = $conexion->query($sqlCheck);
            if ($checkResult->num_rows > 0) {
                $contador++;
                $matriculaGenerada = $matriculaBase . sprintf("%05d", $contador);
            } else {
                $existe = false;
            }
        }
        
        // Insertar en la tabla 'usuarios'
        // Suponemos que la contraseña se guarda tal cual; en un entorno real se debe hashear.
        $psw = $psws[array_rand($psws)];
        $sqlUsuario = "INSERT INTO usuarios (use_matricula, use_psw, use_tipoUser)
                       VALUES ('$matriculaGenerada', '$psw', 'alumno')";
        if ($conexion->query($sqlUsuario) === TRUE) {
            $use_id = $conexion->insert_id; // Obtener el ID generado
        } else {
            echo "Error al insertar usuario: " . $conexion->error . "<br>";
            continue;
        }

        // Generación de datos del alumno
        $nombre = $nombres[array_rand($nombres)];
        $apellidoPaterno = $apePa[array_rand($apePa)];
        $apellidoMaterno = $apeMa[array_rand($apeMa)];
        $curp = generarCURP($curpChars);
        $turno = $turnos[array_rand($turnos)];
        $promedio = $promedios[array_rand($promedios)];
        $estatus = $estatusAll[array_rand($estatusAll)];
        $conducta = $conductas[array_rand($conductas)];
        $fto = $ftos[array_rand($ftos)];
        
        // Obtener un Grupo_ID aleatorio
        $grupo_id = obtenerGrupoAleatorio($conexion);
        if ($grupo_id == null) {
            echo "No se encontró un grupo disponible.<br>";
            continue;
        }
        
        // Insertar en la tabla 'alumnos'
        $sqlAlumno = "INSERT INTO alumnos (use_id, Alum_Nombre, Alum_ApePa, Alum_ApeMa, Alum_CURP, Alum_Promedio, Alum_Estatus, Alum_Conducta, Alum_Foto, Grupo_ID)
                      VALUES ($use_id, '$nombre', '$apellidoPaterno', '$apellidoMaterno', '$curp', '$promedio', '$estatus', '$conducta', '$fto', $grupo_id)";
        if ($conexion->query($sqlAlumno) === TRUE) {
            echo "Alumno insertado: $matriculaGenerada - $nombre $apellidoPaterno $apellidoMaterno (Grupo_ID: $grupo_id)<br>";
        } else {
            echo "Error al insertar alumno: " . $conexion->error . "<br>";
        }
        
        $contador++;
    }
}

// Si se envía el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cantidad = intval($_POST["cantidad"]); // Convertir a número entero
    if ($cantidad > 0) {
        generarRegistros($cantidad, $conexion, $matriculaBase, $nombres, $apePa, $apeMa, $turnos, $promedios, $estatusAll, $conductas, $ftos, $psws, $curpChars);
    } else {
        echo "Por favor, ingrese un número válido.";
    }
}

// Cerrar conexión
$conexion->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generar Registros de Alumnos</title>
</head>
<body>
    <h2>Generador de Registros de Alumnos sgae v3</h2>
    <form action="" method="POST">
        <label for="cantidad">Cantidad de registros a generar:</label>
        <input type="number" id="cantidad" name="cantidad" min="1" required>
        <button type="submit">Generar</button>
    </form>
</body>
</html>
