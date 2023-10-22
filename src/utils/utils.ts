import { toast } from 'react-toastify';

export const valoresIncorrectos = (texto: string) => {
    toast.error(texto, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}

export const redondear = (n: number) => {
    return parseFloat(n.toFixed(2));
};

export const obtenerCapitTotal = (xo: number, tna: number, t: number) => { // Fórmula (1)
    return xo*(1+tna*0.01*t/365)
}

export const obtenerRendTradic = (xo: number, tna: number, t: number) => { // Fórmula (2)
    return redondear(xo*tna*0.01*t/365)
}

export const obtenerInvRequerida = (R: number, tna: number, t: number) => { // Fórmula (3)
    return t === 0 ? 0 : redondear(R/(tna*0.01*t/365))
}

export const obtenerCapitalHaciendoInteresCompuesto = (xo: number, tna: number, n: number) => { // Fórmula (4)
    return redondear(xo*(1+tna*0.01*30/365)**n)
}

export const obtenerPlazosNecesariosInteresCompuesto = (xo: number, tna: number, xn: number) => { // Fórmula (5). Esta expresión tiene restricciones (como que xo no debe ser cero), pero en otra parte del código me encargo de eso   
    return Math.ceil( Math.log(xn/xo) / Math.log(1+tna*0.01*30/365) ) // La redondeo para arriba porque si por ejemplo el resultado nos da 7.3 plazos fijos, entonces se requerirán 8
}

// export const crearEjeX = (origen: number, final: number, incluirUltimo=true) => { // Devuelve un array con los números desde "origen" hasta "final" (este último a veces no se incluye). Si el parámetro opcional es true siempre devolverá el último valor
//     let array = []
//     for (let i=origen; i <= final; i+=Math.ceil((final-origen)/100)) { // La separación entre dos valores de i será 1 si 1<=final-origen<=100, 2 si 101<=final-origen<=200, etc. Esto lo hago para que en el gráfico no haya una cantidad exagerada de puntos 
//         array.push(i)
//     }

//     if (incluirUltimo === true && array[array.length-1] != final) {
//         array.push(final)
//     }
//     return array
// }

export const crearEjeX = (origen: number, final: number, espaciado: number = 1, incluirUltimo=true): number[] => { // Nueva versión de crearEjeX(), ya no me preocupa la gran densidad de valores en el eje X
    const array = []
    for (let i=origen; i<=final; i+=espaciado) {
        if (i === final) {
            if (incluirUltimo) {
                array.push(i)
            }
        } else {
            array.push(i)
        }
    }
    return array
}
