import React, { useState } from 'react';

function FormularioGasto() {
  const [gasto, setGasto] = useState({
    monto: '',
    descripcion: '',
    categoria: '',
    fecha: new Date().toISOString().split('T')[0], 
  });


  const manejarCambio = (e) => {
   
    const { name, value } = e.target;

    setGasto({
      ...gasto,       
      [name]: value, 
    });
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-100 rounded-lg">
      <div>
        <label className="block text-sm font-bold">Monto:</label>
        <input 
          name="monto"
          type="number"
          value={gasto.monto}
          onChange={manejarCambio}
          className="border-2 p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-bold">Descripción:</label>
        <input 
          name="descripcion" 
          type="text"
          value={gasto.descripcion}
          onChange={manejarCambio}
          className="border-2 p-2 w-full"
        />
      </div>

      <div className="bg-white p-2 mt-4 rounded shadow">
        <h3 className="font-bold text-blue-600">Resumen del Estado:</h3>
        <pre>{JSON.stringify(gasto, null, 2)}</pre>
      </div>
    </div>
  );
}
export default FormularioGasto;