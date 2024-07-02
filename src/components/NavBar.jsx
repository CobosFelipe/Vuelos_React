import '../styles/DefaultStyles.css'
// eslint-disable-next-line react/prop-types
export const NavBar = ({ setView }) => {
  return (
    <nav className="bg-slate-900 p-4 mx-auto flex justify-between">
      <div className="flex items-center cursor-pointer hover:text-sky-700">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
          <path d="m274-274-128-70 42-42 100 14 156-156-312-170 56-56 382 98 157-155q17-17 42.5-17t42.5 17q17 17 17 42.5T812-726L656-570l98 382-56 56-170-312-156 156 14 100-42 42-70-128Z" />
        </svg>
        <h1 className="text-logo ml-2">Punto de Pago</h1>
      </div>
      <div className="flex gap-x-2">
        {/* Hacer Reserva */}
        <div className="flex items-center cursor-pointer hover:text-sky-700" onClick={() => setView('filtros')}>
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed">
            <path d="M144-144v-72h672v72H144Zm72-193L105-523l57-13 74 63 153-41-151-256 76-17 255 224 207-56q26-8 49 7t29 42q5 24-8 45t-37 28L216-337Z" />
          </svg>
          <h2 className="ml-2">Planear Vuelo</h2>
        </div>
        {/* Editar Reserva */}
        <div className="flex items-center cursor-pointer hover:text-sky-700" onClick={() => setView('reservas')}>
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="m354-334 356-94q15-4 22.5-18.5T736-476q-4-15-17.5-22.5T690-502l-98 26-160-150-56 14 96 168-96 24-50-38-38 10 66 114Zm446 174H160q-33 0-56.5-23.5T80-240v-160q33 0 56.5-23.5T160-480q0-33-23.5-56.5T80-560v-160q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160Zm0-80v-480H160v102q37 22 58.5 58.5T240-480q0 43-21.5 79.5T160-342v102h640ZM480-480Z" />
          </svg>
          <h2 className="ml-2">Editar Reserva</h2>
        </div>
      </div>
    </nav>
  );
};
