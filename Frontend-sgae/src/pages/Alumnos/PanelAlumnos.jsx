import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'

export default function PanelAlumnos() {
  const navigate = useNavigate();
  const grado = localStorage.getItem("grado");
  const grupo = localStorage.getItem("grupo");
  const turno = localStorage.getItem("turno");
  const estatus = localStorage.getItem("estatus");
  const conducta = localStorage.getItem("conducta");

  useEffect(() => {
    const tipo = localStorage.getItem("tipo_user");
    if (tipo !== "alumno") {
      navigate("/panel/alumno", {
        state: { message: "Por favor, inicia sesión primero." },
      });
    }
  }, []);

  const nombre = localStorage.getItem("nombre");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/alumnos/login");
  };

  return (
    <>
      <Header usuario={"Alumno"} />

      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Header principal */}
        <header className="w-full h-20 bg-blue-600 flex justify-between items-center px-8 text-white">
          <h1 className="text-2xl font-bold">Panel de Alumnos</h1>
          <div className="flex gap-4 items-center">
            <span className="text-sm">Bienvenido, {nombre}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        {/* Contenedor principal con sidebar y contenido */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-200 p-4">
            <ul className="space-y-2">
              <li><label className="block p-2 text-gray-700 hover:bg-gray-300 rounded cursor-pointer">Resumen Académico</label></li>
              <li><label className="block p-2 text-gray-700 hover:bg-gray-300 rounded cursor-pointer">Calificaciones</label></li>
              <li><label className="block p-2 text-gray-700 hover:bg-gray-300 rounded cursor-pointer">Credencial Escolar</label></li>
              <li><label className="block p-2 text-gray-700 hover:bg-gray-300 rounded cursor-pointer">Calendario Escolar</label></li>
            </ul>
          </aside>

          {/* Contenido principal */}
          <main className="flex-1 p-6">
            <h2 className="text-xl font-bold">Bienvenido al Panel de Alumnos</h2>
            <p className="mt-2">Aquí puedes ver tus materias y calificaciones.</p>
            <div className="p-6">
              <h1 className="text-2xl font-bold">Bienvenido, {nombre}</h1>
              <ul className="mt-4 space-y-2">
                <li><strong>Grado:</strong> {grado}</li>
                <li><strong>Grupo:</strong> {grupo}</li>
                <li><strong>Turno:</strong> {turno}</li>
                <li><strong>Estatus:</strong> {estatus}</li>
                <li><strong>Conducta:</strong> {conducta}</li>
              </ul>
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="w-full h-20 bg-blue-600 flex justify-center items-center text-white">
          <p className="text-sm">© 2023 SGAE. Todos los derechos reservados.</p>
        </footer>
      </div>
    </>
  );
}
