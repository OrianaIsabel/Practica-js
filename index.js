const {
  Alojamiento,
  Categoria,
  Reserva,
  DescuentoFijo,
  DescuentoPorcentaje,
  DescuentoPorNoches,
} = require("./domain.js");

const {
    aumentarPrecioDiario,
    alojamientoMasCaro,
    filtrarPorPrecio,
    incluyeCaracteristicas, // Aunque no se use explicitamente hay que exportarla porque filtrarPorCaracteristicas la usa
    filtrarPorCaracteristicas,
    obtenerTotalReservas,
} = require("./funciones.js")

const alojamiento1 = new Alojamiento(
  "Hotel en Buenos Aires",
  100,
  Categoria.Hotel,
  ["wifi", "piscina"]
)

console.log(alojamiento1.getDescripcion())

const reserva1 = new Reserva(
  alojamiento1,
  new Date("2025-05-10"),
  new Date("2025-05-20")
);

reserva1.agregarDescuento(new DescuentoFijo(100));
reserva1.agregarDescuento(new DescuentoFijo(50));
reserva1.agregarDescuento(new DescuentoPorcentaje(10));
reserva1.agregarDescuento(new DescuentoPorNoches(2, 5));

const catalogo = [
  new Alojamiento("Apart1", 10, Categoria.Apart, ["wifi", "piscina"]),
  new Alojamiento("Apart2", 2000, Categoria.Apart, ["apto para mascotas", "wifi"]),
  new Alojamiento("Apart3", 100, Categoria.Hotel, ["piscina", "buffet", "wifi"]),
];

const alojamientosFiltrados = filtrarPorCaracteristicas(catalogo, ["wifi", "piscina"])
console.log(alojamientosFiltrados)

const reservas = [
  new Reserva(alojamiento1, new Date("2025-05-01"), new Date("2025-05-10")),
  new Reserva(alojamiento1, new Date("2025-05-01"), new Date("2025-05-7")),
  new Reserva(alojamiento1, new Date("2025-05-01"), new Date("2025-05-8")),
];
