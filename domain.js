const Categoria = Object.freeze({
    Hotel: "Hotel",
    Departamento: "Departamento",
    Cabana: "Cabana",
    Apart: "Apart",
})

class Alojamiento {
    constructor(nombre, precioPorNoche, categoria) {
        this.nombre = nombre
        this.precioPorNoche = precioPorNoche
        this.categoria = categoria
        this.reservas = []
    }

    getDescripcion() {
        return `${this.nombre} (${this.categoria}) ${this.precioPorNoche} por noche`
    }

    agregarReserva(reserva) {
        this.reservas.push(reserva)
    }
}

class Reserva {
    constructor(alojamiento, diaInicio, diaFin) {
        if (!(diaInicio instanceof Date) || !(diaFin instanceof Date)) {
            throw new Error("El Dia de inicio y de fin deben ser una instancia de Date")
        }

        if (alojamiento.reservas.some(
            (a) => {return (a.diaInicio <= diaInicio && a.diaFin >= diaInicio) || (a.diaInicio <= diaFin && a.diaFin >= diaFin)})
            ) {
            throw new Error("Se esta superponiendo con otra reserva en el mismo alojamiento")
        }

        this.alojamiento = alojamiento
        this.diaInicio = diaInicio
        this.diaFin = diaFin
        this.descuentos = []

        alojamiento.agregarReserva(this)
    }

    cantidadNoches() {
        const msPorDia = 1000 * 60 * 60 * 24;
        return Math.ceil((this.diaFin - this.diaInicio) / msPorDia); // Para redondear hacia arriba
    }

    precioBase() {
        return this.cantidadNoches() * this.alojamiento.precioPorNoche;
    }

    precioFinal() {
        let base = this.precioBase();
        let totalDescontado = 0;
        for (const desc of this.descuentos) {
            totalDescontado += desc.valorDescontado(base, this.cantidadNoches());
        }
        return Math.max(0, base - totalDescontado);
    }

    agregarDescuento(descuento) {
        this.descuentos.push(descuento);
    }
}

class DescuentoFijo {
  constructor(valor) {
    this.valor = valor;
  }

  valorDescontado(precioBase, cantidad) {
    return this.valor;
  }
}

class DescuentoPorcentaje {
  constructor(porcentaje) {
    // Recibe por ejemplo, 10
    this.porcentaje = porcentaje;
  }

  valorDescontado(precioBase, cantidad) {
    return precioBase * (this.porcentaje / 100);
  }
}

class DescuentoPorNoches {
  constructor(cantidadMinima, porcentaje) {
    this.cantidadMinima = cantidadMinima;
    this.porcentaje = porcentaje;
  }

  valorDescontado(precioBase, cantidad) {
    const vecesRepetido = Math.floor(cantidad / this.cantidadMinima); // Para redondear hacia abajo
    let valorDescontado = 0;
    if (vecesRepetido >= 1) {
      valorDescontado = precioBase * (this.porcentaje / 100) * vecesRepetido;
    }
    return valorDescontado;
  }
}

module.exports = {
    Categoria,
    Alojamiento,
    Reserva,
    DescuentoFijo,
    DescuentoPorcentaje,
    DescuentoPorNoches,
};
