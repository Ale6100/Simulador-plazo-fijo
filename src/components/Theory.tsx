import 'katex/dist/katex.min.css';
import { BlockMath,InlineMath } from 'react-katex';

const Theory = () => {

    return (
        <div className='p-2 mb-1 border-t-2 border-black border-dashed text-lg bg-slate-300'>
            <h2 className='text-2xl font-semibold text-center'>Teoría</h2>

            <p className='my-2'>Hay ciertas restricciones para que todas las siguientes fórmulas sean válidas (por ejemplo la inversión inicial no debe ser negativa) pero el usuario no debe preocuparse por eso ya que si ingresa un dato erróneo se lo aclarará mediante un cartel.</p>

            <p>Sea <InlineMath math={'\\alpha'} /> la tasa de interés anual (o TNA) y <InlineMath math={'x_{o}'} /> la inversión inicial, se puede deducir que el capital total que devuelve un plazo fijo en <InlineMath math={'t'} /> días se corresponde con la siguiente expresión:</p>

            <div className='my-2'>
                <BlockMath math={'{x(t)} = x_{o} + x_{o} * \\alpha * 0.01 \\frac{t}{365}'} />
            </div>

            <div className='flex justify-center items-center relative'>
                <div className='px-2 border border-black rounded-sm bg-slate-200'>
                    <BlockMath math={'{x(t)} = x_{o} \\left( 1 + \\frac{\\alpha*0.01}{365}t \\right)'} />
                </div>

                <p className='absolute right-1 text-blue-800 font-semibold'>(1)</p>
            </div>

            <p className='my-2'>Si restamos <InlineMath math={'x_{o}'} /> en ambos lados de la igualdad para ignorar la inversión inicial, obtenemos</p>

            <div className='max-sm:text-xs'>
                <BlockMath math={'{R(t) = x(t) - x_{o}} = x_{o} \\left( 1 + \\frac{\\alpha*0.01}{365}t \\right) - x_{o}'} />
            </div>

            <div className='my-2 flex justify-center items-center relative'>
                <div className='px-2 border border-black rounded-sm bg-slate-200'>
                    <BlockMath math={'{R(t) = x_{o} \\frac{\\alpha*0.01}{365}t}'} />
                </div>

                <p className='absolute right-1 text-blue-800 font-semibold'>(2)</p>
            </div>

            <p>siendo <InlineMath math={'R(t)'} /> el rendimiento generado hasta el día <InlineMath math={'t'} /></p>

            <p className='mt-2'><span className='font-semibold'>Nota</span>: observar que ambas expresiones son funciones lineales.</p>            

            <p>Por otro lado, si despejamos <InlineMath math={'x_{o}'} /> en función de <InlineMath math={'t'} /> obtenemos la inversión inicial requerida para generar un rendimiento <InlineMath math={'R'} /> al cabo de <InlineMath math={'t'} /> días</p>

            <div className='my-2 flex justify-center items-center relative'>
                <div className='px-2 border border-black rounded-sm bg-slate-200'>
                    <BlockMath math={'{x_{o}(t)} = \\frac{R(t)}{\\frac{\\alpha*0.01}{365}t}'} />
                </div>

                <p className='absolute right-1 text-blue-800 font-semibold'>(3)</p>
            </div>

            <p><span className='font-semibold'>Nota</span>: esta expresion adopta la forma de una función homográfica donde la asíntota horizontal se cruza con la vertical en el origen de coordenadas.</p>

            <p className='my-2'>Para simular el interés compuesto se puede utilizar la fórmula (1) repetidas veces considerando plazos de 30 días c/u. Al finalizar el primer plazo el capital será</p>

            <BlockMath math={'{x_1} = x_{o} \\left( 1 + \\frac{\\alpha*0.01}{365}30 \\right)'} />

            <p className='my-2'>Para saber cuánto se tendrá al finalizar el segundo plazo podemos usar un razonamiento similar, considerando que se utiliza como inversión inicial al capital devuelto por el primer plazo</p>

            <div className='max-sm:text-xs'>
                <BlockMath math={'x_2 = x_1 \\left( 1 + \\frac{\\alpha*0.01}{365}30 \\right) = x_o \\left( 1 + \\frac{\\alpha*0.01}{365}30 \\right)^2'} />
            </div>

            <p className='my-2'>Para el tercer plazo fijo será</p>

            <div className='max-sm:text-xs'>
                <BlockMath math={'x_3 = x_2 \\left( 1 + \\frac{\\alpha*0.01}{365}30 \\right) = x_o \\left( 1 + \\frac{\\alpha*0.01}{365}30 \\right)^3'} />
            </div>

            <p className="my-2">Podemos notar cierto patrón y decir que en el plazo <InlineMath math={'n'} />-ésimo el capital será de</p>

            <div className='flex justify-center items-center relative'>
                <div className='px-2 border border-black rounded-sm bg-slate-200'>
                    <BlockMath math={'{x_{n}} = x_{o} \\left( 1 + \\frac{\\alpha*0.01}{365}30 \\right)^{n}'} />
                </div>

                <p className='absolute right-1 text-blue-800 font-semibold'>(4)</p>
            </div>

            <p className="my-2"><span className='font-semibold'>Nota</span>: observar que esta expresión toma la forma de una función exponencial. Por otro lado cabe aclarar que no era estrictamente necesario crear esta nueva fórmula ya que se podría iterar la fórmula (1) veces, pero con la (4) se hace menos esfuerzo computacional y se reduce el margen de error por redondeo.</p>

            <p>Podemos aprovechar esta última expresión y despejar <InlineMath math={'n'} /> (con ciertas restricciones) , obteniendo así la cantidad de plazos fijos necesarios para llegar a un capital final <InlineMath math={'x_{n}'} /></p>

            <div className='my-2 flex justify-center items-center relative'>
                <div className='px-2 border border-black rounded-sm bg-slate-200'>
                    <BlockMath math={'{n} = \\log_{P}\\left( \\frac{x_{n}}{x_{o}} \\right)'} />
                </div>

                <p className='absolute right-1 text-blue-800 font-semibold'>(5)</p>
            </div>

            <p>Siendo <InlineMath math={'P = \\left( 1 + \\frac{\\alpha*0.01}{365}30 \\right)'} /></p>
        </div>
    )
}

export default Theory
