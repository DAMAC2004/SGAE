<?php
$host = 'localhost';
$db = 'sgae-db-v3';
$user = 'root';
$pass = 'mACD040904HTCYRVA9*';

// Crear conexión
$conn = new mysqli($host, $user, $pass, $db);

// Definición de días y franjas horarias
$dias = ['Lunes','Martes','Miércoles','Jueves','Viernes'];
$horasM = [
  ['07:00:00','08:00:00'],
  ['08:00:00','09:00:00'],
  ['09:00:00','10:00:00'],
  ['10:00:00','11:00:00'],
  ['11:00:00','12:00:00'],
  ['12:00:00','13:00:00']
];

$horasV = [
  ['14:00:00','15:00:00'],
  ['15:00:00','16:00:00'],
  ['16:00:00','17:00:00'],
  ['17:00:00','18:00:00'],
  ['18:00:00','19:00:00'],
  ['19:00:00','20:00:00']
];
// Si fueras vespertino, podrías definir $horasV

for ($grupo = 1; $grupo <= 9; $grupo++) {
  foreach ($dias as $dia) {
    foreach ($horasV as $slot) {
      // Elegir materia al azar o cíclica
      $mtr = rand(1, 15);
      // Profesor asignado según materia
      $prof = 10 + $mtr; // ej. Mtr_ID=3 → prof=13

      // Insertar en la tabla horarios
      $stmt = $conn->prepare("
        INSERT INTO horarios
          (use_id_profesor, Grupo_ID, Mtr_ID, Dia, Hora_Inicio, Hora_Fin)
        VALUES (?, ?, ?, ?, ?, ?)
      ");
      
      echo "Horarios generados para:", $grupo;
      $stmt->bind_param(
        'iiisss',
        $prof,
        $grupo,
        $mtr,
        $dia,
        $slot[0],
        $slot[1]
      );
      $stmt->execute();
      $stmt->close();
    }
  }
}

echo "Horarios generados para los 9 grupos";
$conn->close();
