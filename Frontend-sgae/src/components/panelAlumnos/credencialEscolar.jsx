import React from 'react';

export default function CredencialEscolar() {
  // Obtener datos del alumno
  const nombre    = localStorage.getItem('nombre') || '—';
  const apellidoP = localStorage.getItem('apellidoP') || '—';
  const apellidoM = localStorage.getItem('apellidoM') || '—';
  const grado     = localStorage.getItem('grado') || '—';
  const grupo     = localStorage.getItem('grupo') || '—';
  const estatus   = localStorage.getItem('estatus') || '—';
  const conducta  = localStorage.getItem('conducta') || '—';

  // Validación de tarjeta
  const invalida = estatus === 'Expulsado' || conducta === 'Mala';

  return (
    <main className="flex justify-center items-start p-6">
      <div className="w-64 bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg">
        {/* Encabezado */}
        <div className="bg-blue-900 text-white text-center py-3 font-bold text-lg">
          Lic. Adelor D. Sala
        </div>

        {/* Contenido */}
        <div className="p-4 space-y-2 text-gray-800">
          <p><span className="font-semibold">Nombre:</span> {nombre}</p>
          <p><span className="font-semibold">Apellido Paterno:</span> {apellidoP}</p>
          <p><span className="font-semibold">Apellido Materno:</span> {apellidoM}</p>
          <p><span className="font-semibold">Grado:</span> {grado}</p>
          <p><span className="font-semibold">Grupo:</span> {grupo}</p>
          <p><span className="font-semibold">Estatus:</span> {estatus}</p>
          <p><span className="font-semibold">Conducta:</span> {conducta}</p>

          {invalida && (
            <p className="text-red-600 font-bold text-center mt-4">
              Tarjeta no válida
            </p>
          )}

          {/* Espacio para firmas */}
          <div className="mt-6 space-y-4">
            <br></br>
            <br></br>
            <div className="border-t border-gray-400 pt-2 text-center text-sm">
              Firma del Alumno
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className="border-t border-gray-400 pt-2 text-center text-sm">
              Firma del Padre/Tutor
            </div>
          </div>

          {/* Validez */}
          <div className="mt-6 text-sm text-gray-600">
            <p className="font-semibold">Validez de la Tarjeta:</p>
            <p>Válida mientras el estatus sea distinto de "Expulsado" y conducta distinta de "Mala".</p>
          </div>

          {/* Botón futuro */}
          <div className="mt-4 text-center">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded opacity-50 cursor-not-allowed"
              disabled
            >
              Descargar PDF (próximamente)
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
