import { TypePropComunes, TypeSimulation } from "../types/types"

// Los siguientes dos objetos contienen propiedades que luego coloco en el index
const tnaPlaceholder = "80"

const propComunes: TypePropComunes = {
    input: {
        invInic: "inputInvInic",
        tna: "inputTNA",
        dias: "inputDias",
        rendEsp: "rendEsp",
        plazos: "inputPlazos",
        capFinal: "inputCapitalFinal",
        aporte: "inputInvMensual"
    },
    texto: {
        invInic: "Inversión inicial ($)",
        tna: "Tasa nominal anual (%)",
        dias: "Días",
        rendEsp: "Rendimiento esperado ($)",
        plazos: "Plazos fijos (30 días c/u)",
        capFinal: "Capital final ($)",
        aporte: "Aporte mensual ($)"
    }
}

const contenedores: TypeSimulation[] = [
    {
        titulo: "Simulación 1: Rendimiento en t días",
        id: "rendTradic",
        placeholder: {
            invInic: "100000",
            tna: tnaPlaceholder,
            dias: "30",
        },
        comentario: "Se usa la fórmula (2) de la teoría",
        grafico: {
            label: "Rendimiento",
            title: "Rendimiento generado en distintos plazos de tiempo"
        }
    },
    {
        titulo: "Simulación 2: Inversión necesaria para obtener un rendimiento esperado",
        id: "invRequerida",
        placeholder: {
            rendEsp: "1000",
            tna: tnaPlaceholder,
            dias: "30",
        },
        comentario: "Se usa la fórmula (3) de la teoría",
        grafico: {
            label: "Inversión requerida",
            title: "Inversión requerida para alcanzar rendimiento en diferentes plazos"
        }
    },
    {
        titulo: "Simulación 3: Interés compuesto (renovación de capital + interés)",
        id: "intCompuesto",
        placeholder: {
            invInic: "100000",
            tna: tnaPlaceholder,
            plazos: "12",
        },
        comentario: "Se usa la fórmula (4) de la teoría",
        grafico: {
            label: "Capital total",
            title: "Capital total haciendo interés compuesto"
        }
    },
    {
        titulo: "Simulación 4: Plazos fijos necesarios haciendo interés compuesto",
        id: "plazosNecesariosIntComp",
        placeholder: {
            invInic: "100000",
            tna: tnaPlaceholder,
            capFinal: "200000",
        },
        comentario: "Se usa la fórmula (5) de la teoría y luego se aplica la función techo (se redondea para arriba) ya que si por ejemplo el resultado es 6.8 plazos, en realidad serían 7",
        grafico: {
            label: "Plazos fijos necesarios",
            title: "Plazos fijos para alcanzar a los capitales del eje horizontal"
        }
    },
    {
        titulo: "Simulación 5: Interés compuesto plus",
        id: "intCompuestoPlus",
        placeholder: {
            invInic: "100000",
            tna: tnaPlaceholder,
            plazos: "12",
            aporte: "3000"
        },
        comentario: "¿Qué sucede si queremos hacer interés compuesto pero todos los meses agregamos un poquito más en el plazo para ayudarlo a crecer? Por ejemplo querés hacer interés compuesto con una inversión inicial de $100000 pero en vez de dejar que crezca sólo, decides aportar todos los meses $3000. Esta simulación te ayuda a predecir tu capital final utilizando este método. Se usa la fórmula (1) de la teoría repetidas veces y agregando una inversión mensual fija a partir del segundo plazo.",
        grafico: {
            label: "Capital total",
            title: "Capital total haciendo interés compuesto plus"
        }
    },
    {
        titulo: "Simulación 6: Plazos fijos necesarios haciendo interés compuesto plus",
        id: "plazosNecesariosIntCompPlus",
        placeholder: {
            invInic: "100000",
            tna: tnaPlaceholder,
            capFinal: "200000",
            aporte: "3000"
        },
        comentario: "Se usa la fórmula (1) de la teoría repetidas veces hasta encontrar el valor que cumpla con la condición pedida",
        grafico: {
            label: "Plazos fijos necesarios",
            title: "Plazos fijos para alcanzar a los capitales del eje horizontal"
        }
    }
]

export { propComunes, contenedores }
