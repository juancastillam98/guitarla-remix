//esta fichero es el routing dinámico. EL routing dinámico comienza con un símbolo de $

//para obtener la guitarra a la que hemos hecho click, vamos a filtrar por url --> http://localhost:1337/api/guitarras?filters[url]=beck&populate=imagen
import {useState} from "react";
import {getGuitarra} from "../models/guitarras.server";
import {useLoaderData, useOutletContext} from "@remix-run/react"
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
    const [cantidad, setCantidad] = useState(0)
    const guitarra = useLoaderData();
    const {nombre, descripcion, imagen, precio}= guitarra?.data[0]?.attributes;
    const {agregarCarrito} = useOutletContext();

    const handleSubmit= e => {
        e.preventDefault()
        if (cantidad < 1){
            alert("Debes seleccionar una cantidad")
            return
        }
        const guitarraSeleccionada ={
            id: guitarra.data[0].id,
            imagen: imagen.data.attributes.url,
            nombre,
            precio,
            cantidad
        }
        agregarCarrito(guitarraSeleccionada)
    }

    return (
        <main className={"contenedor guitarra"}>
            <img className={"imagen"} src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`}/>
            <div className={"contenido"}>
                <h3>{nombre}</h3>
                <p className={"texto"}>{descripcion}</p>
                <p className={"precio"}>${precio}</p>
                <form onSubmit={handleSubmit} className={"formulario"}>
                    <label htmlFor={"cantidad"}>Cantidad</label>
                    <select
                        id={"cantidad"}
                        onChange={event =>setCantidad(parseInt(event.target.value))}
                    >
                        <option value={"0"}>-- Seleccione --</option>
                        <option value={"1"}>1</option>
                        <option value={"2"}>2</option>
                        <option value={"3"}>3</option>
                        <option value={"4"}>4</option>
                        <option value={"5"}>5</option>
                    </select>
                    <input type={"submit"}
                           value={"Agregar al carrito"}
                    />
                </form>
            </div>
        </main>
    )
}
export default Guitarra