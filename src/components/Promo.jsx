export const Promo = () => {
  return (
    <div className="bg-cyan-700 w-full grid grid-cols-3 gap-6 p-8">
      <div className="flex flex-col items-center">
        <svg className="mb-3" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M340-80v-60l80-60v-220L80-320v-80l340-200v-220q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v220l340 200v80L540-420v220l80 60v60l-140-40-140 40Z"/></svg>
        <h3 className="font-bold">#1 EN VUELOS</h3>
        <p>Vuelos, Hoteles y paquetes a precios especiales</p>
        <a href="#" className="hover:underline">Conoce nuestras ofertas</a>
      </div>
      <div className="flex flex-col items-center">
        <svg className="mb-3" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M540-420q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM220-280q-24.75 0-42.37-17.63Q160-315.25 160-340v-400q0-24.75 17.63-42.38Q195.25-800 220-800h640q24.75 0 42.38 17.62Q920-764.75 920-740v400q0 24.75-17.62 42.37Q884.75-280 860-280H220Zm100-60h440q0-42 29-71t71-29v-200q-42 0-71-29t-29-71H320q0 42-29 71t-71 29v200q42 0 71 29t29 71Zm480 180H100q-24.75 0-42.37-17.63Q40-195.25 40-220v-460h60v460h700v60ZM220-340v-400 400Z"/></svg>
        <h3 className="font-bold">MÚLTIPLES FORMAS DE PAGOS</h3>
        <p>Hasta 36 cuotas con tarjeta de crédito</p>
        <a href="#" className="hover:underline">Conoce formas de pago</a>
      </div>
      <div className="flex flex-col items-center">
        <svg className="mb-3" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M496-489v-321q0-12.75 8.63-21.38Q513.25-840 526-840h284q12.75 0 21.38 8.62Q840-822.75 840-810v192q0 12.75-8.62 21.37Q822.75-588 810-588H600l-104 99Zm60-159h224v-132H556v132Zm0 0v-132 132Zm239 528q-116 0-236.5-56T335-335Q232-438 176-558.5T120-795q0-19.29 12.86-32.14Q145.71-840 165-840h140q14 0 24 10t14 25l26.93 125.64Q372-665 369.5-653.5t-10.73 19.73L259-533q26 44 55 82t64 72q37 38 78 69.5t86 55.5l95-98q10-11 23.15-15 13.15-4 25.85-2l119 26q15 4 25 16.04 10 12.05 10 26.96v135q0 19.29-12.86 32.14Q814.29-120 795-120ZM229-588l81-82-23-110H180q2 42 13.5 88.5T229-588Zm369 363q41 19 89 31t93 14v-107l-103-21-79 83ZM229-588Zm369 363Z"/></svg>
        <h3 className="font-bold">NUESTROS EXPERTOS A TU SERVICIO</h3>
        <p>Atención 24 horas, 365 días del año</p>
        <a href="#" className="hover:underline">Contactanos</a>
      </div>
    </div>
  )
}
