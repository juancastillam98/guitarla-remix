
import {getGuitarras} from "~/models/guitarras.server";
import {getPosts} from "~/models/posts.server";
import {useLoaderData} from "@remix-run//react";
import {ListadoGuitarras} from "~/components/guitarra";
import {ListadoPosts} from "~/components/ListadoPosts";
// @ts-ignore
import stylesGuitarras from "~/styles/guitarras.css"
import stylesPosts from "~/styles/blog.css"

export function links(){
    return [
        {
            rel:"stylesheet",
            href: stylesGuitarras
        },
        {
            rel:"stylesheet",
            href: stylesPosts
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
    const [guitarras, posts] = await Promise.all(getGuitarras, getPosts)
    return {
        guitarras: guitarras.data,
        posts: posts.data
        }
}


function Index() {
    const guitarras=useLoaderData()
    const posts=useLoaderData()
    return (
        <div>
            <h1>Desde index.jsx</h1>
            <ListadoGuitarras guitarras={guitarras}/>
            <ListadoPosts posts={posts}/>
        </div>
    )
}
export default Index