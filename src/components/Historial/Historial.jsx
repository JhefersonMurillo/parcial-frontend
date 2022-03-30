import React from "react";

function Historial({ seleccionPrevia, historial }) {
  const historialModificado = [...historial].pop();

  return (
    <div className="recordatorio">
      <h3>Selección anterior: {seleccionPrevia}</h3>
      <h4>Historial de opciones elegidas</h4>
      <ul>
        {historialModificado.map((eleccion, index) => (
          <li key={`${index}${eleccion}`}>{eleccion}</li>
        ))}
      </ul>
    </div>
  );
}

export default Historial;
