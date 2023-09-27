import {useLoaderData} from "@remix-run//react";
import {getPost} from"~/models/posts.server"
import {formatearFecha} from "../utils/helpers";
import styles from "~/styles/blog.css";
export function links(){
    return[
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

export  function meta({data}){//cuando usamos el loader, el data va a estar disponible
    // console.log(data) el primer data es de remix, el 2 de strapi
    if (!data){
        return {
            title: "Entrada no encontrada",
            description: "GuitarLA - blog de música y venta de guitarras"
        }
    }
    return[
        {
            title: `GuitarLA - ${data.data[0].attributes.titulo}`,
            description: `GuitarraLA, venta de guitarras, entrada ${data.data[0].attributes.titulo}`
        }
    ]
}
export async function loader({params}){//recuerda, params es para obtener los parámetros desde la url
    console.log("params -" + params)
     const{url}=params;
     const post = await getPost(url)

    if (post.data.length===0){
        throw new Response("",{
            status:400,
            statusText:"Entrada no encontrada"
        })
    }
    return post;
}
export default function Post() {
    const post=useLoaderData();
    const {titulo, contenido, imagen, publishedAt}=post?.data[0]?.attributes;
   console.log(post)
    return (
        <>
            <h1>Me cago en la puta</h1>
            <article className={"contenedor post mt-3"}>
                <img  className={"imagen"} src={imagen.data.attributes.url} alt={`Imagen blog ${titulo}`}/>
                <div className={"contenido"}>
                    <h3>{titulo}</h3>
                    <p className={"fecha"}>{formatearFecha(publishedAt)}</p>
                    <p className={"texto"}>{contenido}</p>
                </div>
            </article>
        </>

    )
}
