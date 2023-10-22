import { contenedores } from "../utils/datosIndex.js"
import Simulation from "./Simulation.js"

const Simulations = () => {
    return (
        <>
        <div>
            <p className="mt-1">Bienvenido! Utiliza las simulaciones que más te convenga. Puedes consultar la TNA <a className="text-blue-800 font-semibold" href="https://www.bcra.gob.ar/BCRAyVos/Plazos_fijos_online.asp" target="_blank" rel="noreferrer noopener">aquí</a>. Si tienes alguna duda puedes leer el <a className="text-blue-800 font-semibold" href="https://github.com/Ale6100/simulador-plazo-fijo.git#simulaciones" target="_blank" rel="noreferrer noopener">readme</a> en el código fuente o la teoría que se encuentra al final.</p>
        </div>

        {
            contenedores.map(e => (
                <div className="mt-5 p-2 border-2 border-black rounded-sm flex flex-col bg-slate-300" key={e.id}>
                    <Simulation titulo={e.titulo} id={e.id} placeholder={e.placeholder} comentario={e.comentario} grafico={e.grafico} />
                </div>
            ))
        }
        </>
    )
}

export default Simulations
