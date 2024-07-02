import Swal from "sweetalert2";
import "../styles/DefaultStyles.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const Filtros = () => {
  const [origenes, setOrigenes] = useState([]);
  const [destinos, setDestinos] = useState([]);
  const [filtroOrigen, setFiltroOrigen] = useState("");
  const [filtroDestino, setFiltroDestino] = useState("");
  const [mostrarOpcionesOrigen, setMostrarOpcionesOrigen] = useState(false);
  const [mostrarOpcionesDestino, setMostrarOpcionesDestino] = useState(false);
  const [origenSeleccionado, setOrigenSeleccionado] = useState("");
  const [datosVuelo, setDatosVuelo] = useState([]);
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const url = "http://localhost:5000/vuelos/";

  useEffect(() => {
    const fetchOrigenes = async () => {
      const response = await fetch(`${url}resultados`);
      const data = await response.json();
      setOrigenes(data.obj);
    };
    fetchOrigenes();
  }, []);

  const handleOrigenInputChange = (e) => {
    setFiltroOrigen(e.target.value);
    setMostrarOpcionesOrigen(true);
  };

  const handleDestinoInputChange = (e) => {
    setFiltroDestino(e.target.value);
    setMostrarOpcionesDestino(true);
  };

  const handleOrigenOptionClick = async (origen) => {
    setFiltroOrigen(origen);
    setOrigenSeleccionado(origen);
    setMostrarOpcionesOrigen(false);

    // Fetch destinos based on the selected origen
    const response = await fetch(`${url}resultados/${origen}`);
    const data = await response.json();
    setDestinos(data.obj);
  };

  const handleDestinoOptionClick = (destino) => {
    setFiltroDestino(destino);
    setMostrarOpcionesDestino(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (origenSeleccionado && filtroDestino) {
      const response = await fetch(`${url}ruta/${origenSeleccionado}/${filtroDestino}`);
      const data = await response.json();
      setDatosVuelo(data.obj);
    }
  };

  const handleReservar = async (vuelo) => {
    const reserva = {
      id_reserva: uuidv4(),
      id_viaje: vuelo.id_viaje,
      fecha: fecha,
    };

    const response = await fetch(`${url}add/reserva`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reserva),
    });

    if (response.ok) {
      Swal.fire({
        title: "Correcto!",
        text: "Reserva realizada con exito!",
        icon: "success",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal!",
      });
    }
  };

  const origenesFiltrados = origenes.filter((origen) => origen.origen.toLowerCase().includes(filtroOrigen.toLowerCase()));

  const destinosFiltrados = destinos.filter((destino) => destino.destino.toLowerCase().includes(filtroDestino.toLowerCase()));

  return (
    <div className="div-filtro flex flex-col items-end p-4 gap-1 min-h-64">
      <h1 className="text-promo text-3xl">Tiquetes Economicos</h1>
      <h3 className="text-lg mb-4">Reserva y vuela por toda latinoamerica</h3>
      <form
        className="flex flex-wrap items-center gap-2 self-center p-4 bg-gray-200 text-black font-bold border-solid border-2 rounded-xl container"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full gap-3 mb-2">
          <div className="flex">
            <input type="radio" id="travelOption1" name="idaVuelta" value="1" className="hidden peer" />
            <div className="flex items-center px-2 py-1 rounded-xl bg-white bg-opacity-90 backdrop-blur-2xl shadow-xl transition peer-checked:bg-slate-800 peer-checked:text-white">
              <label htmlFor="travelOption1" className="cursor-pointer hover:text-sky-700">
                Solo ida
              </label>
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#fff">
                <path d="M630-444H192v-72h438L429-717l51-51 288 288-288 288-51-51 201-201Z" />
              </svg>
            </div>
          </div>
          <div className="flex">
            <input type="radio" id="travelOption2" name="idaVuelta" value="2" className="hidden peer" />
            <div className="flex items-center px-2 py-1 rounded-xl bg-white bg-opacity-90 backdrop-blur-2xl shadow-xl transition peer-checked:bg-slate-800 peer-checked:text-white">
              <label htmlFor="travelOption2" className="cursor-pointer hover:text-sky-700">
                Ida y Regreso
              </label>
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#fff">
                <path d="M288-144 96-336l192-192 51 51-105 105h582v72H234l105 105-51 51Zm384-288-51-51 105-105H144v-72h582L621-765l51-51 192 192-192 192Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col items-star w-52">
            <div className="flex gap-2 pb-1">
              <label className="text-sm" htmlFor="origen">
                Origen
              </label>
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000">
                <path d="M144-144v-72h672v72H144Zm72-193L105-523l57-13 74 63 153-41-151-256 76-17 255 224 207-56q26-8 49 7t29 42q5 24-8 45t-37 28L216-337Z" />
              </svg>
            </div>
            <input
              className="bg-white rounded-lg pl-3 font-normal w-48"
              type="text"
              placeholder="¿Desde donde?"
              value={filtroOrigen}
              onChange={handleOrigenInputChange}
              onFocus={() => setMostrarOpcionesOrigen(true)}
              onBlur={() => setTimeout(() => setMostrarOpcionesOrigen(false), 200)}
            />
            {mostrarOpcionesOrigen && (
              <div className="w-48 bg-white border border-gray-300 rounded-lg mt-1 z-10">
                {origenesFiltrados.map((origen, index) => (
                  <div key={index} className="px-3 py-2 cursor-pointer hover:bg-gray-200" onMouseDown={() => handleOrigenOptionClick(origen.origen)}>
                    {origen.origen}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col items-start w-52">
            <div className="flex gap-2 pb-1">
              <label className="text-sm" htmlFor="destino">
                Destino
              </label>
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000">
                <path d="M736-338 144-503v-217l56 19 30 91 154 43v-297l75 24 105 324 206 57q20 5 33 22t13 38q0 32-25 51t-55 10ZM144-144v-72h672v72H144Z" />
              </svg>
            </div>
            <input
              className="bg-white rounded-lg pl-3 font-normal w-48"
              type="text"
              placeholder="¿Cual es tu destino?"
              value={filtroDestino}
              onChange={handleDestinoInputChange}
              onFocus={() => setMostrarOpcionesDestino(true)}
              onBlur={() => setTimeout(() => setMostrarOpcionesDestino(false), 200)}
              disabled={!origenSeleccionado}
            />
            {!origenSeleccionado && <div className="text-red-500 text-sm">Seleccione origen primero</div>}
            {mostrarOpcionesDestino && origenSeleccionado && (
              <div className="w-48 bg-white border border-gray-300 rounded-lg mt-1 z-10">
                {destinosFiltrados.map((destino, index) => (
                  <div key={index} className="px-3 py-2 cursor-pointer hover:bg-gray-200" onMouseDown={() => handleDestinoOptionClick(destino.destino)}>
                    {destino.destino}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col items-start w-52">
            <div className="flex gap-2 pb-1">
              <label className="text-sm" htmlFor="fecha">
                Fecha
              </label>
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000">
                <path d="M216-96q-29.7 0-50.85-21.15Q144-138.3 144-168v-528q0-29 21.5-50.5T216-768h72v-96h72v96h240v-96h72v96h72q29 0 50.5 21.5T816-696v216h-72v-48H216v360h288v72H216Zm0-504h528v-96H216v96Zm0 0v-96 96ZM576-96v-113l210-209q7.26-7.41 16.13-10.71Q811-432 819.76-432q9.55 0 18.31 3.5Q846.83-425 854-418l44 45q6.59 7.26 10.29 16.13Q912-348 912-339.24t-3.29 17.92q-3.3 9.15-10.71 16.32L689-96H576Zm288-243-45-45 45 45ZM624-144h45l115-115-22-23-22-22-116 115v45Zm138-138-22-22 44 45-22-23Z" />
              </svg>
            </div>
            <input
              className="date bg-white rounded-lg pl-3 font-normal w-48"
              type="date"
              min={fecha}
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <div>
            <button className="px-3 py-2 bg-slate-800 text-white rounded-xl w-52 flex justify-center items-center" type="submit">
              <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed">
                <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
              </svg>
              Buscar
            </button>
          </div>
        </div>
      </form>
      {datosVuelo.length > 0 && (
        <div className="bg-gray-200 p-4 mt-4 m-auto rounded-lg shadow-md text-black">
          <h2 className="text-xl font-bold">Detalles del Vuelo</h2>
          {datosVuelo.map((vuelo, index) => (
            <div key={index} className="flex w-full items-center gap-3 mb-1 justify-between">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000">
                  <path d="M144-144v-72h672v72H144Zm72-193L105-523l57-13 74 63 153-41-151-256 76-17 255 224 207-56q26-8 49 7t29 42q5 24-8 45t-37 28L216-337Z" />
                </svg>
                <p>Origen:{vuelo.origen}</p>
              </div>
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000">
                  <path d="M736-338 144-503v-217l56 19 30 91 154 43v-297l75 24 105 324 206 57q20 5 33 22t13 38q0 32-25 51t-55 10ZM144-144v-72h672v72H144Z" />
                </svg>
                <p>Destino: {vuelo.destino}</p>
              </div>
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000">
                  <path d="M480-96q-108 0-174-31.5T240-210q0-26 19.5-47.5T315-295l58 55q-15 5-32 12.5T312-209q8 14 62 27.5T480-168q56 0 109-13.5t59-30.5q-13-9-30.5-16.5T585-241l58-56q38 16 57.5 38.5T720-210q0 51-66 82.5T480-96Zm1-210q95-70 143-143.5T672-594q0-98-62-148t-130-50q-68 0-130 50t-62 148q0 65 48 137.5T481-306Zm-1 90q-133-98-198.5-193.5T216-594q0-66 24-116.5t62-84.5q38-34 85-51.5t93-17.5q46 0 93 17.5t85 51.5q38 34 62 84.5T744-594q0 89-65.5 184.5T480-216Zm0-312q30 0 51-21t21-51q0-30-21-51t-51-21q-30 0-51 21.5T408-600q0 29 21 50.5t51 21.5Zm0-72Z" />
                </svg>
                <p>Distancia: {vuelo.distancia} km</p>
              </div>
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000">
                  <path d="M360-816v-72h240v72H360Zm84 432h72v-240h-72v240Zm36 288q-70 0-130.92-26.51-60.92-26.5-106.49-72.08-45.58-45.57-72.08-106.49Q144-362 144-432q0-70 26.51-130.92 26.5-60.92 72.08-106.49 45.57-45.58 106.49-72.08Q410-768 479.56-768q58.28 0 111.86 19.5T691-694l52-51 50 50-51 52q35 45 54.5 98.81T816-431.86q0 69.86-26.51 130.78-26.5 60.92-72.08 106.49-45.57 45.58-106.49 72.08Q550-96 480-96Zm0-72q110 0 187-77t77-187q0-110-77-187t-187-77q-110 0-187 77t-77 187q0 110 77 187t187 77Zm0-264Z" />
                </svg>
                <p>Duración: {vuelo.duracion}</p>
              </div>
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000">
                  <path d="M552-432q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm-288 96q-29.7 0-50.85-21.17Q192-378.33 192-408.06v-288.22Q192-726 213.15-747T264-768h576q29.7 0 50.85 21.17Q912-725.67 912-695.94v288.22Q912-378 890.85-357T840-336H264Zm72-72h432q0-30 21.15-51.12 21.15-21.11 50.85-21.11V-624q-29.7 0-50.85-21.15Q768-666.3 768-696H336q0 30-21.15 51.12-21.15 21.11-50.85 21.11V-480q29.7 0 50.85 21.15Q336-437.7 336-408Zm456 216H120q-29.7 0-50.85-21.15Q48-234.3 48-264v-408h72v408h672v72ZM264-408v-288 288Z" />
                </svg>
                <p>Precio: ${vuelo.precio}</p>
              </div>
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000">
                  <path d="M517-144 416-416 144-517v-35l672-264-264 672h-35Zm19-156 152-388-388 152 171 65 65 171Zm-65-171Z" />
                </svg>
                <p>Escalas: {vuelo.tiene_escalas ? "Sí" : "No"}</p>
              </div>
              <button className="bg-cyan-950 text-white ml-3 py-1 px-3 rounded-lg" onClick={() => handleReservar(vuelo)}>
                Reservar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
