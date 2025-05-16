export default function ResumenAcademico() {
  const datos = {
    matricula: localStorage.getItem("matricula"),
    nombre: localStorage.getItem("nombre"),
    apellidoP: localStorage.getItem("apellidoP"),
    apellidoM: localStorage.getItem("apellidoM"),
    curp: localStorage.getItem("curp"),
    promedio: localStorage.getItem("promedio"),
    estatus: localStorage.getItem("estatus"),
    conducta: localStorage.getItem("conducta"),
    turno: localStorage.getItem("turno"),
    grado: localStorage.getItem("grado"),
    grupo: localStorage.getItem("grupo"),
  };

  return (
    <main className="flex-1 p-6">
      <h2 className="text-2xl font-bold mb-4">Bienvenido al Panel de Alumnos</h2>
      <p className="mb-6 text-gray-600">Aquí puedes ver tus materias y calificaciones.</p>

      <div className="rounded-xl shadow-lg overflow-hidden max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-blue-900 text-white px-6 py-4 text-lg font-semibold">
          Matrícula: {datos.matricula}
        </div>

        {/* Cuerpo */}
        <div className="bg-white px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-black">
          <Dato label="Nombre" valor={datos.nombre} />
          <Dato label="Apellido Paterno" valor={datos.apellidoP} />
          <Dato label="Apellido Materno" valor={datos.apellidoM} />
          <Dato label="CURP" valor={datos.curp} />
          <Dato label="Promedio" valor={datos.promedio} />
          <Dato label="Estatus" valor={datos.estatus} />
          <Dato label="Conducta" valor={datos.conducta} />
          <Dato label="Turno" valor={datos.turno} />
          <Dato label="Grado" valor={datos.grado} />
          <Dato label="Grupo" valor={datos.grupo} />
        </div>
      </div>
    </main>
  );
}

// Componente reutilizable para mostrar cada dato
function Dato({ label, valor }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-lg">{valor || "—"}</p>
    </div>
  );
}
