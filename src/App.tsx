import NavBar from "./components/NavBar"
import Simulations from "./components/Simulations"
import Theory from "./components/Theory"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
        <NavBar/>

        <div className="px-2">
            <Simulations/>

            <p className="my-5 px-2">Deseas que agregue otra simulación personalizada? Pídela y lo haré! alejandro_portaluppi@outlook.com</p>

            <Theory/>
        </div>

        <a className="fixed bottom-[1vw] right-[1vw] hover:font-semibold text-sm max-md:text-xs hover:scale-105 hover:translate-x-[-0.25vw] transition-all duration-100 text-black" href="https://www.linkedin.com/in/alejandro-portaluppi/" target="_blank" rel="noopener noreferrer">Desarrollado por Alejandro P</a>

        <ToastContainer />
        </>
    )
}

export default App
