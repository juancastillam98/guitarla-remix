import {getGuitarras} from "../models/guitarras.server";
import {useLoaderData} from "@remix-run//react";
// @ts-ignore
import styles from "~/styles/guitarras.css"
import {ListadoGuitarras} from "~/components/listadoGuitarras";

export function links(){
    return [
        {
            rel:"stylesheet",
            href: styles
        }
    ]
}
export function meta(){
    return[
        {
            title: "GuitarraLA - Tienda",
            description: "GuitarLA - Nuestra colección de guitarras"
        }
    ]

}
export async function loader(){
    //este código se está ejecutando en guitarras.server.js
    /*const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`);//se usa una variable de entorno
    const resultado = await respuesta.json();*/
    const guitarras = await getGuitarras();
    return guitarras.data;
}
export default  function Tienda () {
    const guitarras = useLoaderData();
    return (
        <main className={"contenedor"}>
            <h2 className={"heading"}>Nuestra Colección</h2>
            <ListadoGuitarras guitarras={guitarras}/>

        </main>
    )
}