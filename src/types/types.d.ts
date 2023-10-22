interface TypesPropWithTna {
    invInic: string;
    dias: string;
    rendEsp: string;
    plazos: string;
    capFinal: string;
    aporte: string;
}

export interface TypePropComunes {
    input: TypesPropWithTna & { tna: string };
    texto: TypesPropWithTna & { tna: string };
}

export interface TypeSimulation {
    id: string
    titulo: string
    placeholder: Partial<TypesPropWithTna> & { tna: string };
    comentario: string
    grafico: {
        label: string
        title: string
    }
}
