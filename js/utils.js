"use strict";

const valoresIncorrectos = (texto) => {
    Toastify({
        text: texto,
        duration: 3500,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "rgb(210, 210, 210, 0.95)",
          color : "rgb(0, 0, 0)",
          fontWeight: "bold",
          border : "2px solid rgb(255, 0, 0)",
          borderRadius : "5px",
          fontSize : "1.2rem"
        }
    }).showToast();
}

const redondear = (num) => +(Math.round(num + "e+2")  + "e-2"); // Redondea a dos decimales. Fuente: https://www.delftstack.com/es/howto/javascript/javascript-round-to-2-decimal-places/#uso-de-la-funci%C3%B3n-personalizada-para-redondear-un-n%C3%BAmero-a-2-decimales-en-javascript

const obtenerCapitTotal = (xo, tna, t) => { // Fórmula (1)
    xo = parseFloat(xo)
    tna = parseFloat(tna)
    t = parseFloat(t)
    return xo*(1+tna*0.01*t/365)
}

const obtenerRendTradic = (xo, tna, t) => { // Fórmula (2)
    xo = parseFloat(xo)
    tna = parseFloat(tna)
    t = parseFloat(t)
    return redondear(xo*tna*0.01*t/365)
}

const obtenerInvRequerida = (R, tna, t) => { // Fórmula (3)
    R = parseFloat(R)
    tna = parseFloat(tna)
    t = parseFloat(t)
    return redondear(R/(tna*0.01*t/365))
}

const obtenerCapitalHaciendoInteresCompuesto = (xo, tna, n) => { // Fórmula (4)
    xo = parseFloat(xo)
    tna = parseFloat(tna)
    n = parseInt(n)
    return redondear(xo*(1+tna*0.01*30/365)**n)
}

const obtenerPlazosNecesariosInteresCompuesto = (xo, tna, xn) => { // Fórmula (5). Esta expreción tiene restricciones (como que xo no debe ser cero), pero en otra parte del código me encargo de eso
    xo = parseFloat(xo)
    tna = parseFloat(tna)
    xn = parseFloat(xn)
    return  Math.ceil( Math.log(xn/xo) / Math.log(1+tna*0.01*30/365) ) // La redondeo para arriba porque si por ejemplo el resultado nos da 7.3 plazos fijos, entonces se requerirán 8
}

const crearEjeX = (origen, final, incluirUltimo=true) => { // Devuelve un array con los números desde "origen" hasta "final" (este último a veces no se incluye). Si el parámetro opcional es true siempre devolverá el último valor
    let array = []
    origen = parseFloat(origen)
    final = parseFloat(final)
    for (let i=origen; i <= final; i+=Math.ceil((final-origen)/100)) { // La separación entre dos valores de i será 1 si 1<=final-origen<=100, 2 si 101<=final-origen<=200, etc. Esto lo hago para que en el gráfico no haya una cantidad exagerada de puntos 
        array.push(i)
    }

    if (incluirUltimo == true && array[array.length-1] != final) {
        array.push(final)
    }
    return array
}

export {
    valoresIncorrectos,
    redondear,
    obtenerCapitTotal,
    obtenerRendTradic,
    obtenerInvRequerida,
    obtenerCapitalHaciendoInteresCompuesto,
    obtenerPlazosNecesariosInteresCompuesto,
    crearEjeX
}
