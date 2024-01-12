import { TypeSimulation } from "../types/types"
import { propComunes } from "../utils/datosIndex"
import { obtenerRendTradic, valoresIncorrectos, redondear, obtenerInvRequerida, obtenerCapitalHaciendoInteresCompuesto, obtenerPlazosNecesariosInteresCompuesto, obtenerCapitTotal, crearEjeX } from "../utils/utils"
import { useState, useRef } from "react"
import { graficar } from "../utils/graficar"

const Simulation = ({ titulo, id, placeholder, comentario, grafico }: TypeSimulation) => {
    const [ graficado, setGraficado ] = useState(false)

    const [ textoResutado, setTextoResutado ] = useState<string | null>(null)

    const divGrafico = useRef<HTMLDivElement | null>(null)

    const keysPlaceholder = Object.keys(placeholder) as (keyof TypeSimulation["placeholder"])[]

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.target

        if (!(form instanceof HTMLFormElement)) {
            throw new Error("Error interno")
        }

        const values: TypeSimulation["placeholder"] = {} as TypeSimulation["placeholder"];

        keysPlaceholder.forEach((key) => {
            Object.defineProperty(values, key, { value: form[key].value })
        })

        const id = form.dataset.id

        const invInic_ = values["invInic"]
        const tna_ = values["tna"]
        const dias_ = values["dias"]
        const rendimiento_ = values["rendEsp"]
        const capitalFinal_ = values["capFinal"]
        const plazos_ = values["plazos"]
        const invMensual_ = values["aporte"]

        let invInic = undefined, tna = undefined, dias = undefined, rendimiento = undefined, capitalFinal = undefined, plazos = undefined, invMensual = undefined

        if (invInic_) invInic = parseFloat(invInic_) // Me aseguro de que todos los valores de los inputs pasen a ser números
        if (tna_) tna = parseFloat(tna_)
        if (dias_) dias = parseFloat(dias_)
        if (rendimiento_) rendimiento = parseFloat(rendimiento_)
        if (capitalFinal_) capitalFinal = parseFloat(capitalFinal_)
        if (plazos_) plazos = parseFloat(plazos_)
        if (invMensual_) invMensual = parseFloat(invMensual_)

        if ((invInic_+tna_+dias_+rendimiento_+capitalFinal_+plazos_+invMensual_).includes(",")) {
            return valoresIncorrectos("Los valores no deben tener comas! si quieres decimales puedes poner puntos")

        } else if ((invInic_+tna_+dias_+rendimiento_+capitalFinal_+plazos_+invMensual_).includes("-")) {
            return valoresIncorrectos("Los valores no deben ser negativos!")

        } else if ((""+dias_).includes(".")) {
            return valoresIncorrectos("Los días solo pueden ser números enteros!")

        } else if ((""+plazos_).includes(".")) {
            return valoresIncorrectos("Los plazos fijos solo pueden ser números enteros!")
        }

        if (!tna) {
            return valoresIncorrectos("La Tasa Nominal Anual debe ser positiva")
        }

        const ejeX: number[] = []
        const ejeY: number[] = []

        if (id === "rendTradic") {
            if (!invInic) {
                return valoresIncorrectos("La inversión inicial debe ser positiva")
            }

            if (!dias) {
                return valoresIncorrectos('"días" debe ser un número positivo')
            }

            const invInic2 = invInic, tna2 = tna // Tuve que hacer esto porque si no TypeScript se olvidaba el tipado de ambas variables
            const resultado = obtenerRendTradic(invInic, tna, dias)

            setTextoResutado(`El rendimiento en ${dias} días considerando una TNA de ${tna}%, y una inversión inicial de $${invInic} es de $${resultado}`)

            ejeX.push(...crearEjeX(0, dias));

            ejeX.forEach(num => {
                ejeY.push(obtenerRendTradic(invInic2, tna2, num))
            })
        } else if (id === "invRequerida") {
            if (!rendimiento) {
                return valoresIncorrectos("El rendimiento esperado debe ser positivo")
            }

            if (!dias) {
                return valoresIncorrectos('"días" debe ser un número positivo')
            }

            const rendimiento2 = rendimiento, tna2 = tna
            const resultado = obtenerInvRequerida(rendimiento, tna, dias)

            setTextoResutado(`Para obtener $${rendimiento} de rendimiento en ${dias} días con una TNA de ${tna}%, es necesario aportar con una inversión de $${resultado}`)

            ejeX.push(...crearEjeX(1, dias));

            ejeX.forEach(valor => {
                ejeY.push(obtenerInvRequerida(rendimiento2, tna2, valor))
            })
        } else if (id === "intCompuesto") {
            if (!invInic) {
                return valoresIncorrectos("La inversión inicial debe ser positiva")
            }

            if (!plazos) {
                return valoresIncorrectos("La cantidad de plazos debe ser positiva")
            }

            const invInic2 = invInic, tna2 = tna
            const resultado = obtenerCapitalHaciendoInteresCompuesto(invInic, tna, plazos)

            setTextoResutado(`El interés compuesto con ${plazos} plazos fijos de 30 días c/u considerando una TNA de ${tna}% y una inversión inicial de $${invInic} es de $${redondear(resultado-invInic)}. El capital total final es de $${redondear(resultado)}`)

            ejeX.push(...crearEjeX(0, plazos));

            ejeX.forEach(valor => {
                ejeY.push(obtenerCapitalHaciendoInteresCompuesto(invInic2, tna2, valor))
            })
        } else if (id === "plazosNecesariosIntComp") {
            if (!invInic) {
                return valoresIncorrectos("La inversión inicial debe ser positiva")
            }

            if (!capitalFinal) {
                return valoresIncorrectos("El capital final debe ser positivo")
            }

            if (invInic > capitalFinal) {
                return valoresIncorrectos("La inversión inicial no puede ser más grande que el capital final!")
            }

            const invInic2 = invInic, tna2 = tna
            const resultado = obtenerPlazosNecesariosInteresCompuesto(invInic, tna, capitalFinal)

            setTextoResutado(`Considerando una TNA de ${tna}% y una inversión inicial de $${invInic}, haciendo interés compuesto se superan los $${capitalFinal} al cabo de ${resultado} plazos de 30 días c/u (${redondear(resultado*30/365)} años)`)

            const ejeX_: number[] = []

            ejeX_.push(...crearEjeX(0, resultado));

            // Decido intercambiar de lugar los ejes para que el gráfico sea más acorde
            ejeX_.forEach(plazos => {
                ejeX.push(obtenerCapitalHaciendoInteresCompuesto(invInic2, tna2, plazos))
            })

            ejeY.push(...ejeX_);
        } else if (id === "intCompuestoPlus") {
            if (!invInic) {
                if (invInic !== 0) {
                    return valoresIncorrectos("La inversión inicial debe ser positiva o cero!")
                }
            }

            if (!plazos) {
                return valoresIncorrectos("La cantidad de plazos debe ser positiva")
            }

            if (!invMensual) {
                if (invMensual !== 0) {
                    return valoresIncorrectos("La inversión mensual debe ser positiva o cero!")
                }
            }

            ejeX.push(0)
            ejeY.push(invInic)

            let resultado = 0
            for (let i=0; i<plazos; i++) {
                if (i===0) {
                    resultado = obtenerCapitTotal(invInic, tna, 30)
                } else {
                    resultado = obtenerCapitTotal(resultado+invMensual, tna, 30)
                }
                ejeX.push(i+1)
                ejeY.push(redondear(resultado))
            }

            const capitalAportado = invInic + (plazos-1)*invMensual

            setTextoResutado(`Haciendo interés compuesto con ${plazos} plazos fijos de 30 días c/u considerando una TNA de ${tna}%, una inversión inicial de $${invInic} y un agregado de $${invMensual} mensuales (a partir del segundo plazo) el capital total final es de $${redondear(resultado)}. Capital total aportado: $${redondear(capitalAportado)} - Intereses generados: $${redondear(resultado-capitalAportado)}`)
        } else if (id === "plazosNecesariosIntCompPlus") {
            if (!invInic) {
                if (invInic !== 0) {
                    return valoresIncorrectos("La inversión inicial debe ser positiva o cero!")
                }
            }

            if (!capitalFinal) {
                return valoresIncorrectos("El capital final debe ser positivo")
            }

            if (invInic > capitalFinal) {
                return valoresIncorrectos("La inversión inicial no puede ser más grande que el capital final!")
            }

            if (!invMensual) {
                if (invMensual !== 0) {
                    return valoresIncorrectos("La inversión mensual debe ser positiva o cero!")
                }
            }

            if (invInic === 0 && capitalFinal === 0) {
                return valoresIncorrectos("La inversión inicial y la mensual no deben ser cero al mismo tiempo!")
            }

            let cantPlazos = 0
            let resultado = invInic
            ejeX.push(resultado)
            ejeY.push(cantPlazos)

            while (resultado <= capitalFinal) { // Itera hasta que la cantidad de plazos sean los necesarios como para que el capital total (resultado) sea mayor al capitalFinal solicitado
                if (cantPlazos === 0) {
                    resultado = obtenerCapitTotal(invInic, tna, 30)
                } else {
                    resultado = obtenerCapitTotal(resultado+invMensual, tna, 30)
                }
                cantPlazos++
                ejeX.push(redondear(resultado))
                ejeY.push(cantPlazos)
            }

            setTextoResutado(`Haciendo interés compuesto considerando una TNA de ${tna}%, una inversión inicial de $${invInic}, y agregándole además $${invMensual}  mensuales, se superan los $${capitalFinal} después de ${cantPlazos} plazos de 30 días c/u (${redondear(cantPlazos*30/365)} años)`)
        }

        graficar(ejeX, ejeY, divGrafico, grafico, setGraficado)
    }

    const AddInput = ({ clave }: { clave: keyof TypeSimulation["placeholder"] }) => {
        return (
            <div className="p-2 border border-black rounded-sm w-64 bg-slate-200">
                <p className="text-center text-lg">{propComunes.texto[clave]}</p>
                <input className="text-center mt-1 w-full" type="text" name={clave} placeholder={placeholder[clave]} />
            </div>
        )
    }

    return (
        <>
        <h2 className="text-center text-2xl text-blue-600 font-semibold">{titulo}</h2>

        <form onSubmit={handleSubmit} data-id={id} className="my-2 flex flex-col">
            <div className="flex justify-evenly flex-wrap gap-y-2">
                {
                    keysPlaceholder.map((key) => (
                        <AddInput key={key} clave={key}/>
                    ))
                }
            </div>

            <button className="mx-auto mt-3 w-24 h-9 text-lg bg-blue-500 hover:bg-blue-600 text-black rounded-sm" type="submit">Calcular</button>
        </form>

        {graficado || <p className="text-center">Coloque los valores solicitados y presione en "Calcular"</p>}

        <div ref={divGrafico} className="grafico w-full"></div>

        {graficado && <p className="mt-1 text-center">{textoResutado}</p>}

        <p className="mt-1">{comentario}</p>
        </>
    )
}

export default Simulation
