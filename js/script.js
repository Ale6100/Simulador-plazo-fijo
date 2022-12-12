"use strict";

import { valoresIncorrectos, redondear, obtenerCapitTotal, obtenerRendTradic, obtenerInvRequerida, obtenerCapitalHaciendoInteresCompuesto, obtenerPlazosNecesariosInteresCompuesto, crearEjeX } from "./utils.js";
import './colocarSimulaciones.js' // Coloca las simulaciones en el index
import { contenedores } from "./datosIndex.js"

contenedores.forEach( simulacion => { // Itero sobre cada objeto que representa a una simulación en el index
    document.getElementById(`${simulacion.id}`).addEventListener("submit", (e) => { // A todos los botones "Calcular" les pongo este evento
        e.preventDefault()

        // Llamo a los inputs que sean necesarios siempre y cuando existan  
        let invInic, tna, dias, rendimiento, plazos, capitalFinal, invMensual
        if (simulacion.placeholder.invInic) invInic = document.getElementById(`inputInvInic-${simulacion.id}`).value
    
        if (simulacion.placeholder.tna) tna = document.getElementById(`inputTNA-${simulacion.id}`).value
    
        if (simulacion.placeholder.dias) dias = document.getElementById(`inputDias-${simulacion.id}`).value
    
        if (simulacion.placeholder.rendEsp) rendimiento = document.getElementById(`rendEsp-${simulacion.id}`).value
    
        if (simulacion.placeholder.plazos) plazos = document.getElementById(`inputPlazos-${simulacion.id}`).value
    
        if (simulacion.placeholder.capFinal) capitalFinal = document.getElementById(`inputCapitalFinal-${simulacion.id}`).value
        
        if (simulacion.placeholder.aporte) invMensual = document.getElementById(`inputInvMensual-${simulacion.id}`).value

        // Obtengo el valor que luego anuncio como resultado
        let resultado, ejeX, ejeY, capitalAportado, algunValorNoNumerico, cantPlazos
        if (simulacion.id === "rendTradic") {
            resultado = obtenerRendTradic(invInic, tna, dias)

        } else if (simulacion.id === "invRequerida") {
            resultado = obtenerInvRequerida(rendimiento, tna, dias)

        } else if (simulacion.id === "intCompuesto") {
            resultado = obtenerCapitalHaciendoInteresCompuesto(invInic, tna, plazos)
        
        } else if (simulacion.id === "plazosNecesariosIntComp") {
            resultado = obtenerPlazosNecesariosInteresCompuesto(invInic, tna, capitalFinal)
        
        } else if (simulacion.id === "intCompuestoPlus") {
            ejeX = [0]
            ejeY = [parseFloat(invInic)]
            for (let i=0; i<plazos; i++) {
                if (i===0) {
                    resultado = obtenerCapitTotal(invInic, tna, 30)
                    ejeX.push(i+1)
                    ejeY.push(redondear(resultado))
                } else {
                    resultado = obtenerCapitTotal(parseFloat(resultado)+parseFloat(invMensual), tna, 30)
                    ejeX.push(i+1)
                    ejeY.push(redondear(resultado))
                }
            }
            capitalAportado = parseFloat(invInic) + (parseInt(plazos)-1)*parseFloat(invMensual)
        
        } else if (simulacion.id === "plazosNecesariosIntCompPlus") {
            cantPlazos = 0
            resultado = invInic
            ejeX = [resultado]
            ejeY = [cantPlazos]
            algunValorNoNumerico = isNaN(parseFloat(invInic)) || isNaN(parseFloat(tna)) || isNaN(parseFloat(capitalFinal)) || isNaN(parseFloat(invMensual)) // Devuelve true si algún valor ingresado no es un número
            
            if (algunValorNoNumerico === false && (invInic != 0 || invMensual != 0) && (invInic <= capitalFinal)) {
                while (resultado <= capitalFinal) { // Itera hasta que la cantidad de plazos sean los necesarios como para que el capital total (resultado) sea mayor al capitalFinal solicitado
                    if (cantPlazos === 0) {
                        resultado = obtenerCapitTotal(invInic, tna, 30)
                    } else {
                        resultado = obtenerCapitTotal(parseFloat(resultado)+parseFloat(invMensual), tna, 30)
                    }
                    cantPlazos++
                    ejeX.push(redondear(resultado))
                    ejeY.push(cantPlazos)
                }
            }
        }

        let inputsValidos = false        
        if ((invInic+tna+dias+rendimiento+capitalFinal+invMensual).includes(",")) { // Analizo si los inputs son válidos
            valoresIncorrectos("Los valores no deben tener comas! si quieres decimales puedes poner puntos")
    
        } else if ((invInic+tna+dias+rendimiento+plazos+capitalFinal+invMensual).includes("-")) {
            valoresIncorrectos("Los valores no deben ser negativos!")
    
        } else if ((""+dias).includes(".")) {
            valoresIncorrectos("Los días solo pueden ser números enteros!")

        } else if ((""+plazos).includes(".")) {
            valoresIncorrectos("Los plazos fijos solo pueden ser números enteros!")

        } else if ((invInic == 0) && simulacion.id === "plazosNecesariosIntComp") {
            valoresIncorrectos("En esta simulación la inversión inicial no puede ser cero!")

        } else if (invInic == 0 && invMensual == 0 && simulacion.id === "plazosNecesariosIntCompPlus") {
            valoresIncorrectos("La inversión inicial y la mensual no pueden ser cero al mismo tiempo!")

        } else if ((tna == 0) && (simulacion.id === "plazosNecesariosIntComp" || simulacion.id === "plazosNecesariosIntCompPlus")) {
            valoresIncorrectos("En esta simulación la tasa nominal anual no puede ser cero!")

        } else if ((parseFloat(invInic) > parseFloat(capitalFinal)) && (simulacion.id === "plazosNecesariosIntComp" || simulacion.id === "plazosNecesariosIntCompPlus")) {
            valoresIncorrectos("La inversión inicial no puede ser más grande que el capital final!")
    
        } else if (isNaN(resultado) || algunValorNoNumerico){
            valoresIncorrectos("Valores incorrectos! por favor revísalos")

        } else {
            inputsValidos = true
        }

        const pResultado = document.getElementById(`resultado-${simulacion.id}`)

        if (inputsValidos) {
            if (simulacion.id === "rendTradic") { // Le coloco un texto distinto a cada carta
                pResultado.innerHTML = `<p>El rendimiento en ${dias} días considerando una TNA de ${tna}%, y una inversión inicial de $${invInic} es de <span class="resultadoNegrita">$${resultado}</span></p>`
            
            } else if (simulacion.id === "invRequerida") {
                pResultado.innerHTML = `<p>Para obtener $${rendimiento} de rendimiento en ${dias} días con una TNA de ${tna}%, es necesario aportar con una inversión de <span class="resultadoNegrita">$${resultado}</span></p>`
            
            } else if (simulacion.id === "intCompuesto") {
                pResultado.innerHTML = `<p>El interés compuesto con ${plazos} plazos fijos de 30 días c/u considerando una TNA de ${tna}% y una inversión inicial de $${invInic} es de <span class="resultadoNegrita">$${redondear(resultado-invInic)}</span></p> <p>El capital total final es de <span class="resultadoNegrita">$${redondear(resultado)}</span></p>`
            
            } else if (simulacion.id === "plazosNecesariosIntComp") {
                pResultado.innerHTML = `<p>Considerando una TNA de ${tna}% y una inversión inicial de $${invInic}, haciendo interés compuesto se superan los $${capitalFinal} al cabo de <span class="resultadoNegrita">${resultado} plazos</span> de 30 días c/u (<span class="resultadoNegrita">${redondear(resultado*30/365)} años</span>)</p>`
            
            } else if (simulacion.id === "intCompuestoPlus") {
                pResultado.innerHTML = `<p>Haciendo interés compuesto con ${plazos} plazos fijos de 30 días c/u considerando una TNA de ${tna}%, una inversión inicial de $${invInic} y un agregado de $${invMensual} mensuales (a partir del segundo plazo) el capital total final es de <span class="resultadoNegrita">$${redondear(resultado)}</span></p> <p>Capital total aportado: <span class="resultadoNegrita">$${redondear(capitalAportado)}</span> - Intereses generados: <span class="resultadoNegrita">$${redondear(resultado-capitalAportado)}</span></p>`
            
            } else if (simulacion.id === "plazosNecesariosIntCompPlus") {
                pResultado.innerHTML = `<p>Haciendo interés compuesto considerando una TNA de ${tna}%, una inversión inicial de $${invInic}, y agregándole además $${invMensual}  mensuales, se superan los $${capitalFinal} después de <span class="resultadoNegrita">${cantPlazos} plazos</span> de 30 días c/u (<span class="resultadoNegrita">${redondear(cantPlazos*30/365)} años</span>)</p>`
            }

            const generarGrafico = () => { // Genera una alerta con un gráfico
                if (simulacion.id !== "intCompuestoPlus" && simulacion.id !== "plazosNecesariosIntCompPlus") {
                    ejeY = []
                }
                
                if (simulacion.id === "rendTradic" || simulacion.id == "invRequerida") {
                    ejeX = crearEjeX(0, dias)
                
                } else if (simulacion.id === "intCompuesto") {
                    ejeX = crearEjeX(0, plazos)
                
                } else if (simulacion.id === "plazosNecesariosIntComp") {
                    const ejeX_ = crearEjeX(invInic, capitalFinal)
                    const ejeY_ = []
                    ejeX_.forEach(valor => {
                        ejeY_.push(obtenerPlazosNecesariosInteresCompuesto(invInic, tna, valor))
                    })
        
                    ejeX = []
                    for (let i=0; i<ejeY_.length-1; i++) { // De todos los grupos de puntos que están a la misma altura se queda con el último ya que no nos interesan los otros
                        if (ejeY_[i+1] !== ejeY_[i]) {
                            ejeX.push(ejeX_[i])
                            ejeY.push(ejeY_[i])
                        }
                    }
                    ejeX.push(ejeX_[ejeX_.length-1])
                    ejeY.push(ejeY_[ejeY_.length-1])
                }
                
                let anchoAlerta
                if (window.innerWidth < 1080) { // Cambio el tamaño de la alerta según sea el ancho de la pantalla al momento de activarla
                    anchoAlerta = "96vw"
                } else {
                    anchoAlerta = "75vw"
                }
                Swal.fire({
                    html: '<canvas id="grafico"></canvas>',
                    width: anchoAlerta
                })

                if (window.innerWidth < window.innerHeight) { // Se ejecuta si el alto de la pantalla es más grande que el ancho. En esos casos el gráfico podría verse aplastado, por eso se sugiere rotar el dispositivo.
                    Toastify({
                        text: 'Sugerencia: El gráfico se verá mejor si rotas tu dispositivo y luego vuelves a presionar sobre "Ver gráfico"',
                        duration: 10000,
                        close: true,
                        gravity: "top",
                        position: "right",
                        stopOnFocus: true,
                        style: {
                            background: "rgb(100, 220, 100)",
                            color : "rgb(0, 0, 0)",
                            fontWeight: "bold",
                            border : "2px solid rgb(0, 255, 0)",
                            borderRadius : "5px",
                            fontSize : "1rem"
                        }
                    }).showToast();
                }

                if (simulacion.id === "rendTradic") {
                    ejeX.forEach(valor => {
                        ejeY.push(obtenerRendTradic(invInic, tna, valor))
                    })

                } else if (simulacion.id === "invRequerida") {
                    ejeX.forEach(valor => {
                        ejeY.push(obtenerInvRequerida(rendimiento, tna, valor))
                    })

                } else if (simulacion.id === "intCompuesto") {
                    ejeX.forEach(valor => {
                        ejeY.push(obtenerCapitalHaciendoInteresCompuesto(invInic, tna, valor))
                    })
                }

                const grafico = document.getElementById("grafico").getContext('2d');

                const data = {
                    labels: ejeX,
                    datasets: [{
                      label: `${simulacion.grafico.label}`,
                      data: ejeY,
                      fill: false,
                      backgroundColor: "rgb(255, 0, 0)",
                      borderColor: 'rgb(0, 0, 255)',
                      borderWidth: 1
                    }]
                };

                const config = {
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
                                text: `${simulacion.grafico.title}`
                            }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: `${simulacion.grafico.textX}`
                                },
                                type: "linear"
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: `${simulacion.grafico.textY}`
                                }
                            }
                        }
                    }
                };
    
                const myChart = new Chart(grafico, config) // Grafico
            }

            if (simulacion.id === "rendTradic" || simulacion.id === "intCompuesto" || simulacion.id === "intCompuestoPlus") {
                if (dias > 0 || plazos > 0) { // No hace un gráfico si "dias" no es positivo ya que no tendría sentido                     
                    pResultado.innerHTML += `<button id="verGrafico-${simulacion.id}" class="botonGrafico" >Ver gráfico</button>`
                    document.getElementById(`verGrafico-${simulacion.id}`).addEventListener("click", () => {
                        generarGrafico()
                    })
                }
            } else if (simulacion.id === "invRequerida" || simulacion.id === "plazosNecesariosIntComp" || simulacion.id === "plazosNecesariosIntCompPlus") {
                pResultado.innerHTML += `<button id="verGrafico-${simulacion.id}" class="botonGrafico" >Ver gráfico</button>`
                document.getElementById(`verGrafico-${simulacion.id}`).addEventListener("click", () => {
                    generarGrafico()
                })
            }
        }
    })
})
