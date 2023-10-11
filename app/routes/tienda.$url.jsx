//esta fichero es el routing dinámico. EL routing dinámico comienza con un símbolo de $

//para obtener la guitarra a la que hemos hecho click, vamos a filtrar por url --> http://localhost:1337/api/guitarras?filters[url]=beck&populate=imagen
import {getGuitarra} from "../models/guitarras.server";
import {useLoaderData} from "@remix-run/react"
import styles from "~/styles/guitarras.css";

export async function loader({request, params}){
    console.log(params)
    const {url}=params //desde params obtenemos el valor de la URL
    const guitarra = await getGuitarra(url)
    //console.log(guitarra.data[0].attributes.nombre)
    if (guitarra.data.length===0){
        throw new Response("",{
            status: 404,
            statusText: "GuitarLA -  Guitarra no encontrada"
        })
    }
    return guitarra
}

export  function meta({data}){//cuando usamos el loader, el data va a estar disponible
   // console.log(data) el primer data es de remix, el 2 de strapi
    if (!data){
        return {
            title: "Guitarra no encontrada",
            description: "Guitarras, venta de guitarras, guitarra no encontrada"
        }
    }
    return[
        {
            title: `Guitarra - ${data.data[0].attributes.nombre}`,
            description: `Guitarras, venta de guitarras, guitarra ${data.data[0].attributes.nombre}`
        }
    ]
}
export function links(){
    return[
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

function Guitarra() {
    const guitarra = useLoaderData();
    console.log(guitarra)
    const {nombre, descripcion, imagen, precio}= guitarra?.data[0]?.attributes;
    return (
        <main className={"contenedor guitarra"}>
            <img className={"imagen"} src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`}/>
            <div className={"contenido"}>
                <h3>{nombre}</h3>
                <p className={"texto"}>{descripcion}</p>
                <p className={"precio"}>${precio}</p>
            </div>
        </main>
    )
}
export default Guitarra