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
