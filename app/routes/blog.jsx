//import {getPosts} from '~/models/posts.server';
import {useLoaderData} from "@remix-run//react";
import {getPosts} from '~/models/posts.server';
import Post from "~/components/post";
// @ts-ignore
import styles from "~/styles/blog.css";
export async function loader(){
    const posts = await getPosts()
    return posts.data
}
export function links(){
    return[
        {
            rel: "stylesheet",
            href: styles
        }
    ]
}
export function meta(){
    return[
        {
            title: "GuitarLA - Nuestro blog",
            description: "GuitarLA - blog de música y venta de guitarras"
        }
    ]
}

function Blog() {
    const posts = useLoaderData();
   // console.log("desde blog " +window.location)
    return (
        <main className={"contenedor"}>
            <h2 className={"heading"}>Blog</h2>
            <div className={"blog"}>
                {posts.map(post =>{

                    return (

                        <Post
                            key={post.id}
                            post={post.attributes}
                        />
                        )

                })}
            </div>
        </main>
    )
}
export default Blog