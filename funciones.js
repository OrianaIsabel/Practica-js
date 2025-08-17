function aumentarPrecioDiario(alojamientos, aumento) {
  alojamientos.forEach((a) => {
    a.precioPorNoche = a.precioPorNoche + aumento;
  });
}

function alojamientoMasCaro(alojamientos) {
  const listaDePrecios = alojamientos.map((a) => {
    return a.precioPorNoche;
  });
  const precioMaximo = Math.max(...listaDePrecios); // el operador ... devuelve cada miembro de la lisat como parametro

  const alojamiento = alojamientos.find((a) => {
    return a.precioPorNoche == precioMaximo;
  });

  return alojamiento;
}

function filtrarPorPrecio(alojamientos, precioMaximo) {
  return alojamientos.filter((a) => {
    return a.precioPorNoche <= precioMaximo;
  });
}

function incluyeCaracteristicas(alojamiento, caracDeseadas) {
  return caracDeseadas.every((a) => {return alojamiento.caracteristicas.includes(a)})
}

function filtrarPorCaracteristicas(alojamientos, caracDeseadas) {
  return alojamientos.filter((a) => {return incluyeCaracteristicas(a, caracDeseadas)})
}

function obtenerTotalReservas(reservas) {
  return reservas.reduce((previo, reserva) => {
    return previo + reserva.precioFinal();
  }, 0); // reduce funciona como fold
}

module.exports = {
  aumentarPrecioDiario,
  alojamientoMasCaro,
  filtrarPorPrecio,
  incluyeCaracteristicas,
  filtrarPorCaracteristicas,
  obtenerTotalReservas,
};