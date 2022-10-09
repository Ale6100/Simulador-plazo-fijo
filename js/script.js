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
    return xo*(1+tna*0.01*t/365)
}

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

const obtenerCapitalHaciendoInteresCompuesto = (xo, tna, n) => { // Fórmula (4)
    xo = parseFloat(xo)
    tna = parseFloat(tna)
    return xo*(1+tna*0.01*30/365)**n
}

const obtenerPlazosNecesariosInteresCompuesto = (xo, tna, xn) => { // Fórmula (5). Esta expreción tiene restricciones (como que xo no debe ser cero), pero en otra parte del código me encargo de eso
    xo = parseFloat(xo)
    tna = parseFloat(tna)
    xn = parseFloat(xn)
    return Math.ceil( Math.log(xn/xo) / Math.log(1+tna*0.01*30/365) ) // La redondeo para arriba porque si por ejemplo el resultado nos da 7.3 plazos fijos, entonces se requerirán 8
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

    } else if ((invInic+tna+dias).includes("-")) {
        valoresIncorrectos("Los valores no deben ser negativos!")

    } else if (isNaN(resultado)){
        valoresIncorrectos("Valores incorrectos! por favor revísalos")

    } else {
        pResultado.innerHTML = `<p>El rendimiento en ${dias} días considerando una TNA de ${tna}%, y una inversión inicial de $${invInic} es de <span class="resultadoNegrita">$${resultado}</span></p>`
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

    } else if ((rendimiento+tna+dias).includes("-")) {
        valoresIncorrectos("Los valores no deben ser negativos!")

    } else if (isNaN(resultado)){
        valoresIncorrectos("Valores incorrectos! por favor revísalos")
        
    } else {
        pResultado.innerHTML = `<p>Para obtener $${rendimiento} de rendimiento en ${dias} días con una TNA de ${tna}%, es necesario aportar con una inversión inicial de <span class="resultadoNegrita">$${resultado}</span></p>`
    }
})

const intCompuesto = document.getElementById("intCompuesto")
intCompuesto.addEventListener("submit", (e) => {
    e.preventDefault()
    const invInic = document.getElementById("inputInvInic-intCompuesto").value
    const tna = document.getElementById("inputTNA-intCompuesto").value
    const plazos = parseInt(document.getElementById("inputPlazos-intCompuesto").value) // Se necesita un número natural pero si alguien pone "10,6" o "10.6" plazos por ejemplo, me quedo con el 10 y luego se anuncia en pResultado la cantidad de plazos que se consideró

    const pResultado = document.getElementById("resultado-intCompuesto")
    const resultado = obtenerCapitalHaciendoInteresCompuesto(invInic, tna, plazos)

    if ((invInic+tna).includes(",")) {
        valoresIncorrectos("Los valores no deben tener comas! si quieres decimales puedes poner puntos")

    } else if ((invInic+tna+plazos.toString()).includes("-")) {
        valoresIncorrectos("Los valores no deben ser negativos!")

    } else if (isNaN(resultado)){
        valoresIncorrectos("Valores incorrectos! por favor revísalos")
        
    } else {
        pResultado.innerHTML = `<p>El interés compuesto con ${plazos} plazos fijos de 30 días c/u considerando una TNA de ${tna}% y una inversión inicial de $${invInic} es de <span class="resultadoNegrita">$${redondear(resultado-invInic)}</span>. El capital total final es de <span class="resultadoNegrita">$${redondear(resultado)}</span></p>`
    }
})

const plazosNecesariosIntComp = document.getElementById("plazosNecesariosIntComp")
plazosNecesariosIntComp.addEventListener("submit", (e) => {
    e.preventDefault()
    const invInic = document.getElementById("inputInvInic-plazosNecesariosIntComp").value
    const tna = document.getElementById("inputTNA-plazosNecesariosIntComp").value
    const capitalFinal = document.getElementById("inputCapitalFinal-plazosNecesariosIntComp").value

    const pResultado = document.getElementById("resultado-plazosNecesariosIntComp")
    const resultado = obtenerPlazosNecesariosInteresCompuesto(invInic, tna, capitalFinal)

    if ((invInic+tna+capitalFinal).includes(",")) {
        valoresIncorrectos("Los valores no deben tener comas! si quieres decimales puedes poner puntos")

    } else if ((invInic+tna+capitalFinal).includes("-")) {
        valoresIncorrectos("Los valores no deben ser negativos!")

    } else if (invInic == 0) {
        valoresIncorrectos("En esta simulación la inversión inicial no puede ser cero!")
    
    } else if (tna == 0) {
        valoresIncorrectos("En esta simulación la tasa nominal anual no puede ser cero!")

    } else if (parseFloat(invInic) > parseFloat(capitalFinal)) {
        valoresIncorrectos("La inversión inicial no puede ser más grande que el capital final!")
    
    } else if (isNaN(resultado)){
        valoresIncorrectos("Valores incorrectos! por favor revísalos")
        
    } else {
        pResultado.innerHTML = `<p>Considerando una TNA de ${tna}% y una inversión inicial de $${invInic}, haciendo interés compuesto se superan los $${capitalFinal} al cabo de <span class="resultadoNegrita">${resultado} plazos</span> de 30 días c/u (<span class="resultadoNegrita">${redondear(resultado*30/365)} años</span>)</p>`
    }
})

const intCompuestoPlus = document.getElementById("intCompuestoPlus")
intCompuestoPlus.addEventListener("submit", (e) => {
    e.preventDefault()
    const invInic = parseFloat(document.getElementById("inputInvInic-intCompuestoPlus").value)
    const tna = parseFloat(document.getElementById("inputTNA-intCompuestoPlus").value)
    const plazos = parseInt(document.getElementById("inputPlazos-intCompuestoPlus").value)
    const invMensual = parseFloat(document.getElementById("inputInvMensual-intCompuestoPlus").value)
    const pResultado = document.getElementById("resultado-intCompuestoPlus")

    const invInic_copia = document.getElementById("inputInvInic-intCompuestoPlus").value
    const tna_copia = document.getElementById("inputTNA-intCompuestoPlus").value
    const invMensual_copia = document.getElementById("inputInvMensual-intCompuestoPlus").value

    const capitalAportado = invInic + (plazos-1)*invMensual

    let resultado
    for (let i=0; i<plazos; i++) {
        if (i===0) {
            resultado = obtenerCapitTotal(invInic, tna, 30)
        } else {
            resultado = obtenerCapitTotal(resultado+invMensual, tna, 30)
        }
    }

    if ((invInic_copia+tna_copia+invMensual_copia).includes(",")) {
        valoresIncorrectos("Los valores no deben tener comas! si quieres decimales puedes poner puntos")

    } else if ((invInic_copia+tna_copia+invMensual_copia+plazos.toString()).includes("-")) {
        valoresIncorrectos("Los valores no deben ser negativos!")

    } else if (isNaN(resultado)){
        valoresIncorrectos("Valores incorrectos! por favor revísalos")
        
    } else {
        pResultado.innerHTML = `<p>Haciendo interés compuesto con ${plazos} plazos fijos de 30 días c/u considerando una TNA de ${tna}%, una inversión inicial de $${invInic} y un agregado de $${invMensual} mensuales (a partir del segundo plazo) el capital total final es de <span class="resultadoNegrita">$${redondear(resultado)}</span>.\nCapital total aportado: <span class="resultadoNegrita">$${redondear(capitalAportado)}</span> - Intereses generados: <span class="resultadoNegrita">$${redondear(resultado-capitalAportado)}</span></p>`
    }
})

const plazosNecesariosIntCompPlus = document.getElementById("plazosNecesariosIntCompPlus")
plazosNecesariosIntCompPlus.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const invInic = parseFloat(document.getElementById("inputInvInic-plazosNecesariosIntCompPlus").value)
    const tna = parseFloat(document.getElementById("inputTNA-plazosNecesariosIntCompPlus").value)
    const capitalFinal = parseFloat(document.getElementById("inputCapitalFinal-plazosNecesariosIntCompPlus").value)
    const invMensual = parseFloat(document.getElementById("inputInvMensual-plazosNecesariosIntCompPlus").value)
    const pResultado = document.getElementById("resultado-plazosNecesariosIntCompPlus")

    const invInic_copia = document.getElementById("inputInvInic-plazosNecesariosIntCompPlus").value
    const tna_copia = document.getElementById("inputTNA-plazosNecesariosIntCompPlus").value
    const capitalFinal_copia = parseFloat(document.getElementById("inputCapitalFinal-plazosNecesariosIntCompPlus").value)
    const invMensual_copia = document.getElementById("inputInvMensual-plazosNecesariosIntCompPlus").value

    const algunValorNoNumerico = isNaN(invInic) || isNaN(tna) || isNaN(capitalFinal) || isNaN(invMensual) // Devuelve true si algún valor ingresado no es un número

    let cantPlazos = 0
    let capitalTotal = 0

    if (algunValorNoNumerico === false) {
        while (capitalTotal <= capitalFinal) { // Itera hasta que la cantidad de plazos sean los necesarios como para que el capital total sea mayor al capitalFinal solicitado
            if (cantPlazos === 0) {
                capitalTotal = obtenerCapitTotal(invInic, tna, 30)
            } else {
                capitalTotal = obtenerCapitTotal(capitalTotal+invMensual, tna, 30)
            }
            cantPlazos++
        }
    }

    if ((invInic_copia+tna_copia+capitalFinal_copia+invMensual_copia).includes(",")) {
        valoresIncorrectos("Los valores no deben tener comas! si quieres decimales puedes poner puntos")

    } else if ((invInic_copia+tna_copia+capitalFinal_copia+invMensual_copia).includes("-")) {
        valoresIncorrectos("Los valores no deben ser negativos!")

    } else if (algunValorNoNumerico) {
        valoresIncorrectos("Valores incorrectos! por favor revísalos")
        
    } else {
        pResultado.innerHTML = `<p>Haciendo interés compuesto considerando una TNA de ${tna}%, una inversión inicial de $${invInic}, y agregándole además $${invMensual}  mensuales, se superan los $${capitalFinal} después de <span class="resultadoNegrita">${cantPlazos} plazos</span> de 30 días c/u (<span class="resultadoNegrita">${redondear(cantPlazos*30/365)} años</span>)</p>`
    }
})
