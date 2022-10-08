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

const obtenerRendTradic = (xo, tna, t) => { // Fórmula (2)
    xo = parseFloat(xo)
    tna = parseFloat(tna)
    t = parseFloat(t)
    return redondear(xo*tna*0.01*t/365)
}

const obtenerInvInicial = (R, tna, t) => { // Fórmula (3)
    R = parseFloat(R)
    tna = parseFloat(tna)
    t = parseFloat(t)
    return redondear(R/(tna*0.01*t/365))
}

const obtenerCapitTotal = (xo, tna, t) => { // Fórmula (1)
    xo = parseFloat(xo)
    tna = parseFloat(tna)
    return xo*(1+tna*0.01*t/365)
}

const rendTradic = document.getElementById("rendTradic")
rendTradic.addEventListener("submit", (e) => {
    e.preventDefault()
    const invInic = document.getElementById("inputInvInic-rendTradic").value
    const tna = document.getElementById("inputTNA-rendTradic").value
    const dias = document.getElementById("inputTiempo-rendTradic").value
    const pResultado = document.getElementById("resultado-rendTradic")
    const resultado = obtenerRendTradic(invInic, tna, dias)

    if ((invInic+tna+dias).includes(",")) {
        valoresIncorrectos("Los valores no deben tener comas! si quieres decimales puedes poner puntos")

    } else if (isNaN(resultado)){
        valoresIncorrectos("Valores incorrectos! por favor revísalos")

    } else {
        pResultado.innerText = `El rendimiento en ${dias} días considerando una TNA de ${tna}%, y una inversión inicial de $${invInic} es de $${resultado}`
    }
})

const invInicialRequerida = document.getElementById("invInicialRequerida")
invInicialRequerida.addEventListener("submit", (e) => {
    e.preventDefault()
    const rendimiento = document.getElementById("rendEsp-invInicialRequerida").value
    const tna = document.getElementById("inputTNA-invInicialRequerida").value
    const dias = document.getElementById("inputTiempo-invInicialRequerida").value
    const pResultado = document.getElementById("resultado-invInicialRequerida")
    const resultado = obtenerInvInicial(rendimiento, tna, dias)

    if ((rendimiento+tna+dias).includes(",")) {
        valoresIncorrectos("Los valores no deben tener comas! si quieres decimales puedes poner puntos")

    } else if (isNaN(resultado)){
        valoresIncorrectos("Valores incorrectos! por favor revísalos")
        
    } else {
        pResultado.innerText = `Para obtener $${rendimiento} de rendimiento en ${dias} días con una TNA del ${tna}% es necesario aportar con una inversión inicial de $${resultado}`
    }
})

const intCompuesto = document.getElementById("intCompuesto")
intCompuesto.addEventListener("submit", (e) => {
    e.preventDefault()
    const invInic = parseFloat(document.getElementById("inputInvInic-intCompuesto").value)
    const tna = parseFloat(document.getElementById("inputTNA-intCompuesto").value)
    const meses = parseInt(document.getElementById("inputTiempo-intCompuesto").value)
    const pResultado = document.getElementById("resultado-intCompuesto")

    const invInic_copia = document.getElementById("inputInvInic-intCompuesto").value
    const tna_copia = document.getElementById("inputTNA-intCompuesto").value

    let resultado
    for (let i=0; i<meses; i++) {
        if (i===0) {
            resultado = obtenerCapitTotal(invInic, tna, 30)
        } else {
            resultado = redondear(obtenerCapitTotal(resultado, tna, 30))
        }
    }

    if ((invInic_copia+tna_copia).includes(",")) {
        valoresIncorrectos("Los valores no deben tener comas! si quieres decimales puedes poner puntos")

    } else if (isNaN(resultado)){
        valoresIncorrectos("Valores incorrectos! por favor revísalos")
        
    } else {
        pResultado.innerText = `El interés compuesto en ${meses} meses de 30 días c/u considerando una TNA de ${tna}% y una inversión inicial de $${invInic} es de $${redondear(resultado-invInic)}. El capital total final es de $${redondear(resultado)}`
    }
})
