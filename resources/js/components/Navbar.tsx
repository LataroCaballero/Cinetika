import { useApp } from "../utilities/Context"
import logo from "../../../public/favicon.ico"



const Navbar = () => {
  const {nombrepagina} = useApp()

  return (
    <nav className="navbar nav-custom justify-content-between px-4">
        <div className="navbar-brand align-items-center" >
            <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
            <span className="fw-bold">Cinetika</span>
        </div>
        <div className="text-light">{nombrepagina}</div>
    </nav>
  )
}

export default Navbar