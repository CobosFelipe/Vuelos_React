import "../styles/DefaultStyles.css";
import { useState } from "react";

export const Reservas = () => {
  const [datosReserva, setDatosReserva] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editFecha, setEditFecha] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const url = "http://localhost:5000/vuelos/";

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}reservas`);
      const data = await response.json();
      setDatosReserva(data.obj);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const handleEditClick = (index, fecha) => {
    setEditIndex(index);
    setEditFecha(fecha);
  };

  const handleFechaChange = (e) => {
    setEditFecha(e.target.value);
  };

  const handleSaveClick = async (id_reserva, id_viaje) => {
    try {
      const response = await fetch(`${url}put/${id_reserva}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_viaje: id_viaje,
          fecha: editFecha,
        }),
      });

      if (response.ok) {
        const updatedReservas = datosReserva.map((reserva, index) => (index === editIndex ? { ...reserva, fecha: editFecha } : reserva));
        setDatosReserva(updatedReservas);
        setEditIndex(null);
        setEditFecha("");
      } else {
        console.error("Error updating reservation:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  return (
    <div className="div-filtro flex flex-col items-end p-4 gap-1 min-h-64">
      <h1 className="text-promo text-3xl">¿Cambio de planes?</h1>
      <h3 className="text-lg mb-4">Verifica, modifica o cancela tu reservación</h3>
      <button className="bg-cyan-900 rounded-lg p-2" onClick={handleSearch}>
        Ver todas las reservas
      </button>
      {datosReserva.length > 0 && (
        <div className="bg-gray-200 p-4 mt-4 m-auto rounded-lg shadow-md text-black">
          <h2 className="text-xl font-bold">Detalles del reserva</h2>
          {datosReserva.map((reserva, index) => (
            <div key={index} className="flex w-full items-center gap-3 mb-1 justify-between">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000">
                  <path d="M144-144v-72h672v72H144Zm72-193L105-523l57-13 74 63 153-41-151-256 76-17 255 224 207-56q26-8 49 7t29 42q5 24-8 45t-37 28L216-337Z" />
                </svg>
                <p>Origen: {reserva.origen}</p>
              </div>

              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000">
                  <path d="M736-338 144-503v-217l56 19 30 91 154 43v-297l75 24 105 324 206 57q20 5 33 22t13 38q0 32-25 51t-55 10ZM144-144v-72h672v72H144Z" />
                </svg>
                <p>Destino: {reserva.destino}</p>
              </div>

              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000">
                  <path d="M480-96q-108 0-174-31.5T240-210q0-26 19.5-47.5T315-295l58 55q-15 5-32 12.5T312-209q8 14 62 27.5T480-168q56 0 109-13.5t59-30.5q-13-9-30.5-16.5T585-241l58-56q38 16 57.5 38.5T720-210q0 51-66 82.5T480-96Zm1-210q95-70 143-143.5T672-594q0-98-62-148t-130-50q-68 0-130 50t-62 148q0 65 48 137.5T481-306Zm-1 90q-133-98-198.5-193.5T216-594q0-66 24-116.5t62-84.5q38-34 85-51.5t93-17.5q46 0 93 17.5t85 51.5q38 34 62 84.5T744-594q0 89-65.5 184.5T480-216Zm0-312q30 0 51-21t21-51q0-30-21-51t-51-21q-30 0-51 21.5T408-600q0 29 21 50.5t51 21.5Zm0-72Z" />
                </svg>
                <p>Distancia: {reserva.distancia} km</p>
              </div>

              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000">
                  <path d="M360-816v-72h240v72H360Zm84 432h72v-240h-72v240Zm36 288q-70 0-130.92-26.51-60.92-26.5-106.49-72.08-45.58-45.57-72.08-106.49Q144-362 144-432q0-70 26.51-130.92 26.5-60.92 72.08-106.49 45.57-45.58 106.49-72.08Q410-768 479.56-768q58.28 0 111.86 19.5T691-694l52-51 50 50-51 52q35 45 54.5 98.81T816-431.86q0 69.86-26.51 130.78-26.5 60.92-72.08 106.49-45.57 45.58-106.49 72.08Q550-96 480-96Zm0-72q110 0 187-77t77-187q0-110-77-187t-187-77q-110 0-187 77t-77 187q0 110 77 187t187 77Zm0-264Z" />
                </svg>
                <p>Duración: {reserva.duracion}</p>
              </div>

              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000">
                  <path d="M552-432q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm-288 96q-29.7 0-50.85-21.17Q192-378.33 192-408.06v-288.22Q192-726 213.15-747T264-768h576q29.7 0 50.85 21.17Q912-725.67 912-695.94v288.22Q912-378 890.85-357T840-336H264Zm72-72h432q0-30 21.15-51.12 21.15-21.11 50.85-21.11V-624q-29.7 0-50.85-21.15Q768-666.3 768-696H336q0 30-21.15 51.12-21.15 21.11-50.85 21.11V-480q29.7 0 50.85 21.15Q336-437.7 336-408Zm456 216H120q-29.7 0-50.85-21.15Q48-234.3 48-264v-408h72v408h672v72ZM264-408v-288 288Z" />
                </svg>
                <p>Precio: ${reserva.precio}</p>
              </div>

              {editIndex === index ? (
                <input type="date" value={editFecha} min={fecha} onChange={handleFechaChange} className="date bg-white border rounded-lg p-1" />
              ) : (
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000">
                    <path d="M324.21-408q-15.21 0-25.71-10.29t-10.5-25.5q0-15.21 10.29-25.71t25.5-10.5q15.21 0 25.71 10.29t10.5 25.5q0 15.21-10.29 25.71t-25.5 10.5Zm156 0q-15.21 0-25.71-10.29t-10.5-25.5q0-15.21 10.29-25.71t25.5-10.5q15.21 0 25.71 10.29t10.5 25.5q0 15.21-10.29 25.71t-25.5 10.5Zm156 0q-15.21 0-25.71-10.29t-10.5-25.5q0-15.21 10.29-25.71t25.5-10.5q15.21 0 25.71 10.29t10.5 25.5q0 15.21-10.29 25.71t-25.5 10.5ZM216-96q-29.7 0-50.85-21.5Q144-139 144-168v-528q0-29 21.15-50.5T216-768h72v-96h72v96h240v-96h72v96h72q29.7 0 50.85 21.5Q816-725 816-696v528q0 29-21.15 50.5T744-96H216Zm0-72h528v-360H216v360Zm0-432h528v-96H216v96Zm0 0v-96 96Z" />
                  </svg>
                  <p>Fecha: {reserva.fecha}</p>
                </div>
              )}
              {editIndex === index ? (
                <button className="bg-cyan-950 text-white py-1 px-3 rounded-lg" onClick={() => handleSaveClick(reserva.id_reserva, reserva.id_viaje)}>
                  Guardar
                </button>
              ) : (
                <button className="bg-cyan-950 text-white py-1 px-3 rounded-lg" onClick={() => handleEditClick(index, reserva.fecha)}>
                  Editar
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
