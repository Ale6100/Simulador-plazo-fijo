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
        
        <ToastContainer />
        </>
    )
}

export default App
