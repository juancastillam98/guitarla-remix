
import {getGuitarras} from "~/models/guitarras.server";
import {getPosts} from "~/models/posts.server";
import {getCurso} from "~/models/curso.server";
import {useLoaderData} from "@remix-run//react";
import {ListadoPosts} from "~/components/listadoPosts"
import {ListadoGuitarras} from "~/components/listadoGuitarras"
import {Curso} from "~/components/curso";
import stylesGuitarras from "~/styles/guitarras.css"
import stylesPosts from "~/styles/blog.css"
import stylesCurso from "~/styles/curso.css"

export function links(){
    return [
        {
            rel:"stylesheet",
            href: stylesGuitarras
        },
        {
            rel:"stylesheet",
            href: stylesPosts
        },
        {
            rel:"stylesheet",
            href: stylesCurso
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
    const [guitarras, posts, curso] = await Promise.all([getGuitarras(), getPosts(), getCurso()])
    return {
        guitarras: guitarras.data,
        posts: posts.data,
        curso: curso.data
        }
}


function Index() {
 const {guitarras, posts, curso} = useLoaderData();
    console.log("contenido de guitarras")
    console.log(guitarras)

    return (
        <div>
            <h1>Desde index.jsx</h1>
            <main className={"contenedor"}>
                <ListadoGuitarras guitarras={guitarras}/>
            </main>

            <Curso curso ={curso.attributes}/>

            <section className={"contenedor"}>
                <ListadoPosts posts={posts}/>
            </section>
        </div>
    )
}
export default Index