import React from 'react';

export default function CalendarioEscolar() {
  const eventosJson = localStorage.getItem('eventos');
  const eventos = eventosJson ? JSON.parse(eventosJson) : [];

  return (
    <main className="flex-1 p-6 overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Calendario Escolar</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Título','Fecha','Descripción'].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {eventos.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{e.titulo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{e.fecha}</td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">{e.desc}</td>
              </tr>
            ))}
            {eventos.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                  No hay eventos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
