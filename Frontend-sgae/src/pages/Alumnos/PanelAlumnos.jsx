import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import ResumenAcademico from '../../components/panelAlumnos/ResumenAcademico';
import Calificaciones from '../../components/panelAlumnos/calificaciones';
import CredencialEscolar from '../../components/panelAlumnos/credencialEscolar';
import CalendarioEscolar from '../../components/panelAlumnos/calendarioEscolar';

export default function PanelAlumnos() {
  const navigate = useNavigate();
  const [opcionActiva, setOpcionActiva] = useState('resumen'); // por defecto resumen

  useEffect(() => {
    const tipo = localStorage.getItem("tipo_user");
    if (tipo !== "alumno") {
      navigate("/panel/alumno", {
        state: { message: "Por favor, inicia sesión primero." },
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const renderContenido = () => {
    switch (opcionActiva) {
      case 'resumen':
        return <ResumenAcademico />;
      case 'calificaciones':
        return <Calificaciones />;
      case 'credencial':
        return <CredencialEscolar />;
      case 'calendario':
        return <CalendarioEscolar />;
      default:
        return <ResumenAcademico />;
    }
  };

  return (
    <>
      <Header usuario={"Alumno"} />

      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Header principal */}
        <header className="w-full h-20 bg-blue-600 flex justify-between items-center px-8 text-white">
          <h1 className="text-2xl font-bold">Panel de Alumnos</h1>
          <div className="flex gap-4 items-center">
            <span className="text-2xl font-bold">Bienvenido</span>
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
              <li>
                <label
                  onClick={() => setOpcionActiva('resumen')}
                  className={`block p-2 rounded cursor-pointer ${
                    opcionActiva === 'resumen'
                      ? 'bg-gray-400 text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Resumen Académico
                </label>
              </li>
              <li>
                <label
                  onClick={() => setOpcionActiva('calificaciones')}
                  className={`block p-2 rounded cursor-pointer ${
                    opcionActiva === 'calificaciones'
                      ? 'bg-gray-400 text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Calificaciones
                </label>
              </li>
              <li>
                <label
                  onClick={() => setOpcionActiva('credencial')}
                  className={`block p-2 rounded cursor-pointer ${
                    opcionActiva === 'credencial'
                      ? 'bg-gray-400 text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Credencial Escolar
                </label>
              </li>
              <li>
                <label
                  onClick={() => setOpcionActiva('calendario')}
                  className={`block p-2 rounded cursor-pointer ${
                    opcionActiva === 'calendario'
                      ? 'bg-gray-400 text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Calendario Escolar
                </label>
              </li>
            </ul>
          </aside>

          {/* Contenido principal */}
          <div className="flex-1 p-4">{renderContenido()}</div>
        </div>

        {/* Footer */}
        <footer className="w-full h-20 bg-blue-600 flex justify-center items-center text-white">
          <p className="text-sm">© 2023 SGAE. Todos los derechos reservados.</p>
        </footer>
      </div>
    </>
  );
}
