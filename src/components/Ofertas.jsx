export const Ofertas = () => {
  return (
    <>
    <div className="bg-cyan-900 w-full px-24 pt-6 p-b3 text-start">
      <h1 className="text-3xl">Aprovecha nuestras ofertas</h1>
      <h2>¡Disfruta de los mejores descuentos, que tenemos para tu próximo viaje!</h2>
    </div>
    <div className="bg-cyan-900 w-full grid grid-cols-2 justify-items-center gap-6 p-8">
      <div>
        <img className="rounded-3xl" src="https://campaign-cdn-v2.pricetravel.com/Banners-aerolineas-TB-Colecciones/home/24junio/promo.jpg"/>
      </div>
      <div>
        <img className="rounded-3xl" src="https://campaign-cdn-v2.pricetravel.com/Banners-aerolineas-TB-Colecciones/home/1julio/buscados.jpg"/>
      </div>
    </div>
    </>
  )
}
