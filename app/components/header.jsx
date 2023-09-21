
import {Link,} from "@remix-run/react";//no te confundas, Links es para los links rel="stylesheet"...., este de Link a seca es para enlace
import logo from "../../public/img/logo.svg"
import  {Navegacion} from "./navegacion"

export default function Header() {
    return (
        <header className={"header"}>
            <div className={"contenedor barra"}>
                <Link to={"/"}>
                    <img className={"logo"} src ={logo} alt={"Imagen logo"}/>
                </Link>
                <Navegacion />
            </div>
        </header>
    )
}
