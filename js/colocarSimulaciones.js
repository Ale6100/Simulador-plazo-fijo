import { propComunes, contenedores } from "./datosIndex.js"

const colocarDiv = (texto, input, id, placeholder) => { // Similar a un componente de React. Coloca un div personalizado
    return `
    <div class="contenedor-input">
        <p>${texto}</p>
        <input type="text" id="${input}-${id}" placeholder="Ej: ${placeholder}">
    </div>
    `
}

const simulaciones = document.getElementById("simulaciones")

contenedores.forEach(simulacion => { // Estructura de cada contenedor. Luego dentro del form coloco los inputs
    simulaciones.innerHTML += `
        <div class="contenedor">
            <h2 class="tituloSimulacion"> ${simulacion.titulo}</h2>
            
            <form id="${simulacion.id}">
                <div></div>
                <button type="submit">Calcular</button>
            </form>
            
            <p id="resultado-${simulacion.id}">Coloque los valores solicitados y presione en "Calcular"</p>

            <p class="seUsoLaFormula">${simulacion.comentario}</p>
        </div>`

    const idSimulacion = document.getElementById(`${simulacion.id}`).children[0]
    // Coloco los divs que sean necesarios siempre y cuando las propiedades que van dentro de ellos existan

    if (simulacion.placeholder.rendEsp) idSimulacion.innerHTML += colocarDiv(propComunes.texto.rendEsp, propComunes.input.rendEsp, simulacion.id, simulacion.placeholder.rendEsp)

    if (simulacion.placeholder.dias) idSimulacion.innerHTML += colocarDiv(propComunes.texto.dias, propComunes.input.dias, simulacion.id, simulacion.placeholder.dias)

    if (simulacion.placeholder.aporte) idSimulacion.innerHTML += colocarDiv(propComunes.texto.aporte, propComunes.input.aporte, simulacion.id, simulacion.placeholder.aporte)

    if (simulacion.placeholder.plazos) idSimulacion.innerHTML += colocarDiv(propComunes.texto.plazos, propComunes.input.plazos, simulacion.id, simulacion.placeholder.plazos)
   
    if (simulacion.placeholder.capFinal) idSimulacion.innerHTML += colocarDiv(propComunes.texto.capFinal, propComunes.input.capFinal, simulacion.id, simulacion.placeholder.capFinal)
    
    if (simulacion.placeholder.invInic) idSimulacion.innerHTML += colocarDiv(propComunes.texto.invInic, propComunes.input.invInic, simulacion.id, simulacion.placeholder.invInic)

    if (simulacion.placeholder.tna) idSimulacion.innerHTML += colocarDiv(propComunes.texto.tna, propComunes.input.tna, simulacion.id, simulacion.placeholder.tna)
})
