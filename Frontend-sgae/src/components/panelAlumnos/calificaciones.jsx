import React from 'react';

export default function Calificaciones() {
  // 1. Recuperar y parsear calificaciones
  const califsJson = localStorage.getItem('calificaciones');
  const califs = califsJson ? JSON.parse(califsJson) : [];

  // 2. Promedio general
  const promedioGeneral = localStorage.getItem('promedio') || '—';

  return (
    <main className="flex-1 p-6 overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Calificaciones</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Materia','T1','T2','T3','T4','Promedio'].map((h) => (
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
            {califs.map((c, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.materia}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.T1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.T2}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.T3}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.T4}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{c.prom}</td>
              </tr>
            ))}

            {/* Fila de promedio general */}
            <tr className="bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">Promedio General</td>
              <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                {promedioGeneral}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
