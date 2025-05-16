export function InfoInscripcion() {
  return (
    <section className="max-w-7xl mx-auto my-8 space-y-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-blue-700 text-white px-6 py-4 text-3xl font-bold text-center">
          Proceso de Inscripción
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Documentos Requeridos */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Documentos Requeridos</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Acta de nacimiento (original y copia)</li>
              <li>CURP (copia)</li>
              <li>Certificado del nivel educativo anterior (original y copia)</li>
              <li>Comprobante de domicilio (copia)</li>
              <li>4 fotografías tamaño infantil</li>
              <li>Identificación oficial del padre o tutor (copia)</li>
            </ul>
          </div>

          {/* Procedimiento */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Procedimiento</h3>
            <ol className="list-decimal list-inside text-gray-700">
              <li>Solicita la ficha de inscripción en la oficina administrativa o descárgala de nuestro sitio web.</li>
              <li>Completa la ficha con todos los datos requeridos.</li>
              <li>Reúne todos los documentos mencionados en la sección anterior.</li>
              <li>Realiza el pago de inscripción en la institución bancaria indicada.</li>
              <li>Presenta los documentos y el comprobante de pago en la oficina administrativa.</li>
              <li>Asiste a la reunión informativa de inicio de curso (fechas por confirmar).</li>
            </ol>
          </div>
        </div>
      </div>

      
    </section>
  );
}