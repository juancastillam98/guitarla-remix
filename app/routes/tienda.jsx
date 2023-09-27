import {getGuitarras} from "~/models/guitarras.server";
import {useLoaderData} from "@remix-run//react";
import {Guitarra} from "~/components/guitarra";
// @ts-ignore
import styles from "~/styles/guitarras.css"

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
            {guitarras.length && (
                <div className={"guitarras-grid"}>
                    {guitarras.map(guitarra=>(
                        <Guitarra
                            key={guitarra?.id}
                            guitarra={guitarra?.attributes}
                        />
                    ))}
                </div>
            )}
        </main>
    )
}