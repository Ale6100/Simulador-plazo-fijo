// Los siguientes dos objetos contienen propiedades que luego coloco en el index

const propComunes = {
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

const contenedores = [
    {
        titulo: "<span>Simulación 1</span>: Rendimiento en t días",
        id: "rendTradic",
        placeholder: {
            invInic: "100000",
            tna: "55",
            dias: "30",
        },
        comentario: "Se usa la fórmula (<span>2</span>) de la teoría",
        grafico: {
            label: "Rendimiento",
            title: "Simulación 1",
            textX: "Tiempo (días)",
            textY: "Rendimiento ($)"
        }
    },
    {
        titulo: "<span>Simulación 2</span>: Inversión necesaria para obtener un rendimiento esperado",
        id: "invRequerida",
        placeholder: {
            rendEsp: "1000",
            tna: "55",
            dias: "30",
        },
        comentario: "Se usa la fórmula (<span>3</span>) de la teoría",
        grafico: {
            label: "Inversión requerida",
            title: "Simulación 2 - Inversión requerida para obtener el rendimiento solicitado considerando distintos plazos de tiempo",
            textX: "Tiempo (días)",
            textY: "Inversión requerida ($)"
        }
    },
    {
        titulo: "<span>Simulación 3</span>: Interés compuesto (renovación de capital + interés)",
        id: "intCompuesto",
        placeholder: {
            invInic: "100000",
            tna: "55",
            plazos: "12",
        },
        comentario: "Se usa la fórmula (<span>4</span>) de la teoría",
        grafico: {
            label: "Capital total",
            title: "Simulación 3",
            textX: "Cantidad de plazos fijos",
            textY: "Capital total ($)"
        }
    },
    {
        titulo: "<span>Simulación 4</span>: Plazos fijos necesarios haciendo interés compuesto",
        id: "plazosNecesariosIntComp",
        placeholder: {
            invInic: "100000",
            tna: "55",
            capFinal: "200000",
        },
        comentario: "Se usa la fórmula (<span>5</span>) de la teoría y luego se aplica la función techo (se redondea para arriba) ya que si por ejemplo el resultado es 6.8 plazos, en realidad serían 7",
        grafico: {
            label: "Plazos fijos necesarios",
            title: "Simulación 4 - Cantidad de plazos fijos necesarios para superar a los distintos capitales del eje horizontal",
            textX: "Capital a superar ($)",
            textY: "Cantidad de plazos fijos"
        }
    },
    {
        titulo: "<span>Simulación 5</span>: Interés compuesto plus",
        id: "intCompuestoPlus",
        placeholder: {
            invInic: "100000",
            tna: "55",
            plazos: "12",
            aporte: "3000"
        },
        comentario: "¿Qué sucede si queremos hacer interés compuesto pero todos los meses agregamos un poquito más en el plazo para ayudarlo a crecer? Por ejemplo querés hacer interés compuesto con una inversión inicial de $100000 pero en vez de dejar que crezca sólo, decides aportar todos los meses $3000. Esta simulación te ayuda a predecir tu capital final utilizando este método. Se usa la fórmula (<span>1</span>) de la teoría repetidas veces y agregando una inversión mensual fija a partir del segundo plazo.",
        grafico: {
            label: "Capital total",
            title: "Simulación 5",
            textX: "Cantidad de plazos fijos",
            textY: "Capital total ($)"
        }
    },
    {
        titulo: "<span>Simulación 6</span>: Plazos fijos necesarios haciendo interés compuesto plus",
        id: "plazosNecesariosIntCompPlus",
        placeholder: {
            invInic: "100000",
            tna: "55",
            capFinal: "200000",
            aporte: "3000"
        },
        comentario: "Se usa la fórmula (<span>1</span>) repetidas veces hasta encontrar el valor que cumpla con la condición pedida",
        grafico: {
            label: "Plazos fijos necesarios",
            title: "Simulación 6 - Cantidad de plazos fijos necesarios para igualar a los distintos capitales del eje horizontal",
            textX: "Capital a igualar ($)",
            textY: "Cantidad de plazos fijos"
        }
    }
]

export { propComunes, contenedores }
