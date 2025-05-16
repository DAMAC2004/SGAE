<?php
include 'db_connection.php'; // Asegúrate de tener la conexión MySQLi en este archivo

function generarCalificacion() {
    return rand(6, 10); // Calificaciones entre 6 y 10
}

$sqlAlumnos = "SELECT use_id, Grupo_ID FROM alumnos";
$resultAlumnos = $conn->query($sqlAlumnos);

if ($resultAlumnos->num_rows > 0) {
    while ($alumno = $resultAlumnos->fetch_assoc()) {
        $alumnoId = $alumno['use_id'];
        $grupoId = $alumno['Grupo_ID'];

        // Obtener materias del grupo según horario
        $sqlMaterias = "SELECT Mtr_ID, use_id_profesor FROM horarios WHERE Grupo_ID = $grupoId";
        $resultMaterias = $conn->query($sqlMaterias);

        if ($resultMaterias->num_rows > 0) {
            while ($materia = $resultMaterias->fetch_assoc()) {
                $materiaId = $materia['Mtr_ID'];
                $profesorId = $materia['use_id_profesor'];

                $cal1 = generarCalificacion();
                $cal2 = generarCalificacion();
                $cal3 = generarCalificacion();
                $cal4 = generarCalificacion();

                // Insertar calificación
                $sqlInsert = "INSERT INTO calificaciones (use_id_alumno, Mtr_ID, use_id_profesor, Cal_T1, Cal_T2, Cal_T3, Cal_T4)
                              VALUES ($alumnoId, $materiaId, $profesorId, $cal1, $cal2, $cal3, $cal4)";
                if ($conn->query($sqlInsert)) {
                    echo "✅ Calificación asignada al alumno ID $alumnoId en materia ID $materiaId<br>";
                } else {
                    echo "❌ Error al asignar calificación: " . $conn->error . "<br>";
                }
            }
        } else {
            echo "⚠️ El grupo $grupoId del alumno ID $alumnoId no tiene materias asignadas.<br>";
        }
    }
} else {
    echo "No se encontraron alumnos.";
}

$conn->close();
?>
