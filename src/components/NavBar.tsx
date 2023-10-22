const NavBar = () => {
    return (
        <header className="py-2 flex justify-center bg-slate-800">
            <div className="w-10 max-md:w-8">
                <img src="/img/icon.svg" alt="logo"/>
            </div>
            
            <h1 className="ml-2 text-3xl text-white max-md:text-2xl">Simulador de plazo fijo</h1>
        </header>
    )
}

export default NavBar
