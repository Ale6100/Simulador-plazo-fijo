"use strict";


/* 



    ----- Si estás leyendo esto NO TE ASUSTES en el siguiente commit voy a optimizar todo el código -----



*/


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
    return xo*(1+tna*0.01*30/365)**n
}

const obtenerPlazosNecesariosInteresCompuesto = (xo, tna, xn) => { // Fórmula (5). Esta expreción tiene restricciones (como que xo no debe ser cero), pero en otra parte del código me encargo de eso
    xo = parseFloat(xo)
    tna = parseFloat(tna)
    xn = parseFloat(xn)
    return  Math.ceil( Math.log(xn/xo) / Math.log(1+tna*0.01*30/365) ) // La redondeo para arriba porque si por ejemplo el resultado nos da 7.3 plazos fijos, entonces se requerirán 8
}

const crearEjeX = (origen, final, incluirUltimo=false) => { // Devuelve un array con los números desde "origen" hasta "final" (este último a veces no se incluye). Si el parámetro opcional es true siempre devolverá el último valor
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

    } else if (dias.includes(".")) {
        valoresIncorrectos("Los días solo pueden ser números enteros!")

    } else if (isNaN(resultado)){
        valoresIncorrectos("Valores incorrectos! por favor revísalos")

    } else {
        pResultado.innerHTML = `<p>El rendimiento en ${dias} días considerando una TNA de ${tna}%, y una inversión inicial de $${invInic} es de <span class="resultadoNegrita">$${resultado}</span></p>`

        const generarGraficoRendTradic = (incluirUltimo) => { // Genera una alerta con un gráfico
            const ejeX = crearEjeX(0, dias, incluirUltimo)

            if (incluirUltimo == false && ejeX[ejeX.length-1] != dias) { // La segunda condición está puesta para que no se nos muestre el botón "Agregar último punto" si ese punto ya está agregado por defecto en el gráfico
                Swal.fire({
                    html: '<canvas id="grafico" width="1000" height="600"></canvas>',
                    width: "60vw",
                    showCancelButton: true,
                    cancelButtonText: "Agregar último punto"
                }).then((result) => {
                    if (result.dismiss) {
                        generarGraficoRendTradic(true) // Genero el gráfico como true ya que ahora el gráfico va a mostrar con el último valor incluído, por lo tanto no haría falta mostrar este botón de nuevo
                    }
                })
            } else {
                Swal.fire({
                    html: '<canvas id="grafico" width="1000" height="600"></canvas>',
                    width: "60vw"
                })
            }

            const grafico = document.getElementById("grafico").getContext('2d');

            let ejeY = []
            ejeX.forEach(valor => {
                ejeY.push(obtenerRendTradic(invInic, tna, valor))
            })

            const data = {
                labels: ejeX,
                datasets: [{
                  label: 'Rendimiento',
                  data: ejeY,
                  fill: false,
                  backgroundColor: "rgb(255, 0, 0)",
                  borderColor: 'rgb(0, 0, 255)',
                  borderWidth: 1
                }]
            };
            const myChart = new Chart(grafico, {
                type: 'line',
                data: data,
                options: {
                    plugins : {
                        legend : {
                            labels : {
                                usePointStyle: true,
                                pointStyle: "circle"
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Tiempo (días)"
                            },
                            type: "linear"
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Rendimiento ($)"
                            }
                        }
                    }
                }
            })
        }
        if (dias > 0) { // No hace un gráfico si "dias" no es positivo ya que no tendría sentido 
            pResultado.innerHTML += `<button id="verGraficoRendTradic" class="botonGrafico" >Ver gráfico</button>`
            document.getElementById("verGraficoRendTradic").addEventListener("click", () => {
                generarGraficoRendTradic(false) // Coloco el false porque inicialmente quiero que el botón con valor "Agregar último punto" esté disponible
            })
        }
    }
})

const invRequerida = document.getElementById("invRequerida")
invRequerida.addEventListener("submit", (e) => {
    e.preventDefault()
    const rendimiento = document.getElementById("rendEsp-invRequerida").value
    const tna = document.getElementById("inputTNA-invRequerida").value
    const dias = document.getElementById("inputTiempo-invRequerida").value

    const pResultado = document.getElementById("resultado-invRequerida")
    const resultado = obtenerInvRequerida(rendimiento, tna, dias)

    if ((rendimiento+tna+dias).includes(",")) {
        valoresIncorrectos("Los valores no deben tener comas! si quieres decimales puedes poner puntos")

    } else if ((rendimiento+tna+dias).includes("-")) {
        valoresIncorrectos("Los valores no deben ser negativos!")

    } else if (dias.includes(".")) {
        valoresIncorrectos("Los días solo pueden ser números enteros!")

    } else if (isNaN(resultado)){
        valoresIncorrectos("Valores incorrectos! por favor revísalos")
        
    } else {
        pResultado.innerHTML = `<p>Para obtener $${rendimiento} de rendimiento en ${dias} días con una TNA de ${tna}%, es necesario aportar con una inversión de <span class="resultadoNegrita">$${resultado}</span></p>`
        
        const generarGraficoInvRequerida = (incluirUltimo) => {
            const ejeX = crearEjeX(0, dias, incluirUltimo)

            if (incluirUltimo == false && ejeX[ejeX.length-1] != dias) {
                Swal.fire({
                    html: '<canvas id="grafico" width="1000" height="600"></canvas>',
                    width: "60vw",
                    showCancelButton: true,
                    cancelButtonText: "Agregar último punto"
                }).then((result) => {
                    if (result.dismiss) {
                        generarGraficoInvRequerida(true)
                    }
                })
            } else {
                Swal.fire({
                    html: '<canvas id="grafico" width="1000" height="600"></canvas>',
                    width: "60vw"
                })
            }

            const grafico = document.getElementById("grafico").getContext('2d');

            let ejeY = []
            ejeX.forEach(valor => {
                ejeY.push(obtenerInvRequerida(rendimiento, tna, valor))
            })

            const data = {
                labels: ejeX,
                datasets: [{
                  label: 'Inversión requerida',
                  data: ejeY,
                  fill: false,
                  backgroundColor: "rgb(255, 0, 0)",
                  borderColor: 'rgb(0, 0, 255)',
                  borderWidth: 1
                }]
            };
            const myChart = new Chart(grafico, {
                type: 'line',
                data: data,
                options: {
                    plugins : {
                        legend : {
                            labels : {
                                usePointStyle: true,
                                pointStyle: "circle"
                            }
                        },
                        title: {
                            display: true,
                            text: `Inversión requerida para obtener un rendimiento de $${rendimiento} considerando distintos plazos de tiempo`
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Tiempo (días)"
                            },
                            type: "linear"
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Inversión requerida ($)"
                            }
                        }
                    }
                }
            })
        }

        pResultado.innerHTML += `<button id="verGraficoInvRequerida" class="botonGrafico" >Ver gráfico</button>`
        document.getElementById("verGraficoInvRequerida").addEventListener("click", () => {
            generarGraficoInvRequerida(false)
        })
    }
})

const intCompuesto = document.getElementById("intCompuesto")
intCompuesto.addEventListener("submit", (e) => {
    e.preventDefault()
    const invInic = document.getElementById("inputInvInic-intCompuesto").value
    const tna = document.getElementById("inputTNA-intCompuesto").value
    const plazos = document.getElementById("inputPlazos-intCompuesto").value

    const pResultado = document.getElementById("resultado-intCompuesto")
    const resultado = obtenerCapitalHaciendoInteresCompuesto(invInic, tna, plazos)

    if ((invInic+tna).includes(",")) {
        valoresIncorrectos("Los valores no deben tener comas! si quieres decimales puedes poner puntos")

    } else if ((invInic+tna+plazos).includes("-")) {
        valoresIncorrectos("Los valores no deben ser negativos!")

    } else if (plazos.includes(".")) {
        valoresIncorrectos("Los plazos fijos solo pueden ser números enteros!")

    } else if (isNaN(resultado)){
        valoresIncorrectos("Valores incorrectos! por favor revísalos")
        
    } else {
        pResultado.innerHTML = `<p>El interés compuesto con ${plazos} plazos fijos de 30 días c/u considerando una TNA de ${tna}% y una inversión inicial de $${invInic} es de <span class="resultadoNegrita">$${redondear(resultado-invInic)}</span>. El capital total final es de <span class="resultadoNegrita">$${redondear(resultado)}</span></p>`
    
        const generarGraficoIntCompuesto = (incluirUltimo) => {
            const ejeX = crearEjeX(0, plazos, incluirUltimo)

            if (incluirUltimo == false && ejeX[ejeX.length-1] != plazos) {
                Swal.fire({
                    html: '<canvas id="grafico" width="1000" height="600"></canvas>',
                    width: "60vw",
                    showCancelButton: true,
                    cancelButtonText: "Agregar último punto"
                }).then((result) => {
                    if (result.dismiss) {
                        generarGraficoIntCompuesto(true)
                    }
                })
            } else {
                Swal.fire({
                    html: '<canvas id="grafico" width="1000" height="600"></canvas>',
                    width: "60vw"
                })
            }

            const grafico = document.getElementById("grafico").getContext('2d');

            let ejeY = []
            ejeX.forEach(valor => {
                ejeY.push(redondear(obtenerCapitalHaciendoInteresCompuesto(invInic, tna, valor)))
            })

            const data = {
                labels: ejeX,
                datasets: [{
                  label: 'Capital total',
                  data: ejeY,
                  fill: false,
                  backgroundColor: "rgb(255, 0, 0)",
                  borderColor: 'rgb(0, 0, 255)',
                  borderWidth: 1
                }]
            };
            const myChart = new Chart(grafico, {
                type: 'line',
                data: data,
                options: {
                    plugins : {
                        legend : {
                            labels : {
                                usePointStyle: true,
                                pointStyle: "circle"
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Cantidad de plazos fijos"
                            },
                            type: "linear"
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Capital total ($)"
                            }
                        }
                    }
                }
            })
        }

        if (plazos > 0) {
            pResultado.innerHTML += `<button id="verGraficoIntCompuesto" class="botonGrafico" >Ver gráfico</button>`
            document.getElementById("verGraficoIntCompuesto").addEventListener("click", () => {
                generarGraficoIntCompuesto(false)
            })
        }
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
    
        const generarGraficoPlazosNecesariosIntComp = (incluirUltimo) => {
            const ejeX_ = crearEjeX(invInic, capitalFinal, incluirUltimo)

            Swal.fire({
                html: '<canvas id="grafico" width="1000" height="600"></canvas>',
                width: "60vw"
            })

            const grafico = document.getElementById("grafico").getContext('2d');

            const ejeY_ = []
            ejeX_.forEach(valor => {
                ejeY_.push(obtenerPlazosNecesariosInteresCompuesto(invInic, tna, valor))
            })

            const ejeX = []
            const ejeY = []
            for (let i=0; i<ejeY_.length-1; i++) { // De todos los grupos de puntos que están a la misma altura se queda con el último ya que no nos interesan los otros
                if (ejeY_[i+1] !== ejeY_[i]) {
                    ejeX.push(ejeX_[i])
                    ejeY.push(ejeY_[i])
                }
            }
            ejeX.push(ejeX_[ejeX_.length-1])
            ejeY.push(ejeY_[ejeY_.length-1])

            const data = {
                labels: ejeX,
                datasets: [{
                  label: 'Plazos fijos necesarios',
                  data: ejeY,
                  fill: false,
                  backgroundColor: "rgb(255, 0, 0)",
                  borderColor: 'rgb(0, 0, 255)',
                  borderWidth: 1
                }]
            };
            const myChart = new Chart(grafico, {
                type: 'line',
                data: data,
                options: {
                    plugins : {
                        legend : {
                            labels : {
                                usePointStyle: true,
                                pointStyle: "circle"
                            }
                        },
                        title: {
                            display: true,
                            text: `Cantidad de plazos fijos necesarios para superar a los distintos capitales del eje horizontal`
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Capital total ($)"
                            },
                            type: "linear"
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Cantidad de plazos fijos"
                            }
                        }
                    }
                }
            })
        }

        pResultado.innerHTML += `<button id="verGraficoPlazosNecesariosIntComp" class="botonGrafico" >Ver gráfico</button>`
        document.getElementById("verGraficoPlazosNecesariosIntComp").addEventListener("click", () => {
            generarGraficoPlazosNecesariosIntComp(true)
        })
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

    const ejeX = [0]
    const ejeY = [invInic]
    let resultado
    for (let i=0; i<plazos; i++) {
        if (i===0) {
            resultado = obtenerCapitTotal(invInic, tna, 30)
            ejeX.push(i+1)
            ejeY.push(redondear(resultado))
        } else {
            resultado = obtenerCapitTotal(resultado+invMensual, tna, 30)
            ejeX.push(i+1)
            ejeY.push(redondear(resultado))
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
    
        const generarGraficoIntCompuestoPlus = () => {

            Swal.fire({
                html: '<canvas id="grafico" width="1000" height="600"></canvas>',
                width: "60vw"
            })

            const grafico = document.getElementById("grafico").getContext('2d');

            const data = {
                labels: ejeX,
                datasets: [{
                  label: 'Capital total',
                  data: ejeY,
                  fill: false,
                  backgroundColor: "rgb(255, 0, 0)",
                  borderColor: 'rgb(0, 0, 255)',
                  borderWidth: 1
                }]
            };
            const myChart = new Chart(grafico, {
                type: 'line',
                data: data,
                options: {
                    plugins : {
                        legend : {
                            labels : {
                                usePointStyle: true,
                                pointStyle: "circle"
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Cantidad de plazos fijos"
                            },
                            type: "linear"
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Capital total ($)"
                            }
                        }
                    }
                }
            })
        }

        if (plazos > 0) {
            pResultado.innerHTML += `<button id="verGraficoIntCompuestoPlus" class="botonGrafico" >Ver gráfico</button>`
            document.getElementById("verGraficoIntCompuestoPlus").addEventListener("click", () => {
                generarGraficoIntCompuestoPlus()
            })
        }
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
    let capitalTotal = invInic
    const ejeX = [capitalTotal]
    const ejeY = [cantPlazos]

    if (algunValorNoNumerico === false && (invInic != 0 || invMensual != 0) && (invInic <= capitalFinal)) {
        while (capitalTotal <= capitalFinal) { // Itera hasta que la cantidad de plazos sean los necesarios como para que el capital total sea mayor al capitalFinal solicitado
            if (cantPlazos === 0) {
                capitalTotal = obtenerCapitTotal(invInic, tna, 30)
            } else {
                capitalTotal = obtenerCapitTotal(capitalTotal+invMensual, tna, 30)
            }
            cantPlazos++
            ejeX.push(redondear(capitalTotal))
            ejeY.push(cantPlazos)
        }
    }

    if ((invInic_copia+tna_copia+capitalFinal_copia+invMensual_copia).includes(",")) {
        valoresIncorrectos("Los valores no deben tener comas! si quieres decimales puedes poner puntos")

    } else if ((invInic_copia+tna_copia+capitalFinal_copia+invMensual_copia).includes("-")) {
        valoresIncorrectos("Los valores no deben ser negativos!")

    } else if (invInic == 0 && invMensual == 0) {
        valoresIncorrectos("La inversión inicial y la mensual no pueden ser cero al mismo tiempo!")
    
    } else if (tna == 0) {
        valoresIncorrectos("En esta simulación la tasa nominal anual no puede ser cero!")

    } else if (invInic > capitalFinal) {
        valoresIncorrectos("La inversión inicial no puede ser más grande que el capital final!")

    } else if (algunValorNoNumerico) {
        valoresIncorrectos("Valores incorrectos! por favor revísalos")
        
    } else {
        pResultado.innerHTML = `<p>Haciendo interés compuesto considerando una TNA de ${tna}%, una inversión inicial de $${invInic}, y agregándole además $${invMensual}  mensuales, se superan los $${capitalFinal} después de <span class="resultadoNegrita">${cantPlazos} plazos</span> de 30 días c/u (<span class="resultadoNegrita">${redondear(cantPlazos*30/365)} años</span>)</p>`
    
        const generarGraficoPlazosNecesariosIntCompPlus = () => {

            Swal.fire({
                html: '<canvas id="grafico" width="1000" height="600"></canvas>',
                width: "60vw"
            })

            const grafico = document.getElementById("grafico").getContext('2d');

            const data = {
                labels: ejeX,
                datasets: [{
                  label: 'Plazos fijos necesarios',
                  data: ejeY,
                  fill: false,
                  backgroundColor: "rgb(255, 0, 0)",
                  borderColor: 'rgb(0, 0, 255)',
                  borderWidth: 1
                }]
            };
            const myChart = new Chart(grafico, {
                type: 'line',
                data: data,
                options: {
                    plugins : {
                        legend : {
                            labels : {
                                usePointStyle: true,
                                pointStyle: "circle"
                            }
                        },
                        title: {
                            display: true,
                            text: `Cantidad de plazos fijos necesarios para igualar a los distintos capitales del eje horizontal`
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Capital total ($)"
                            },
                            type: "linear"
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Cantidad de plazos fijos"
                            }
                        }
                    }
                }
            })
        }

        pResultado.innerHTML += `<button id="verGraficoPlazosNecesariosIntCompPlus" class="botonGrafico" >Ver gráfico</button>`
        document.getElementById("verGraficoPlazosNecesariosIntCompPlus").addEventListener("click", () => {
            generarGraficoPlazosNecesariosIntCompPlus()
        })
    }
})
