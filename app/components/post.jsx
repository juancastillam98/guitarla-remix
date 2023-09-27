import {Link} from "@remix-run/react";
import {formatearFecha} from "~/utils/helpers"
export default function  Post({post}) {
	const {contenido, imagen, titulo, url, publishedAt}=post
	return (

		<article className={"post"}>
			<img  className={"imagen"} src={imagen.data.attributes.formats.small.url} alt={`Imagen blog ${titulo}`}/>
			<div className={"contenido"}>
				<h3>{titulo}</h3>
				<p className={"fecha"}>{formatearFecha(publishedAt)}</p>
				<p className={"resumen"}>{contenido}</p>
				{/*Aquí le estoy pasando la url por parámetro , la cuál está almacenada como variable url*/}
				<Link className={"enlace"} to={url}>Leer Post</Link>
			</div>
		</article>
	)
}