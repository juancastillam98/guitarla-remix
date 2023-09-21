//el archivo root es como el archivo main de react, sin él, el proyecto no funciona
import {
    Meta, //este componente que he importado es un componente especial para utilizar el meta.
    Links,
    Outlet,
    Scripts,//este componente predefinido de Remix es para mejorar el js
    LiveReload, useCatch, //este liveReload es para no tener que recargar la página para visualizar los cambios
    Link
} from "@remix-run/react"
import styles from "~/styles/index.css"; //el símbolo ~ hace referencia a la carpeta de app Está configurado en el fichero tsconfig.json
import Header from "~/components/header";
import {Footer} from "~/components/footer";
export function meta(){//esta función meta es la encargada de configurar las meta de los ficheros .html (el meta de un fichero html se configura en esta función)
    return [
        {
            charset: "utf8",
        },
        {
            title: "GuitarLA - Remix",
        },
        {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
        }
    ];
}

<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap" rel="stylesheet"></link>
//esta función es la que va a permitir añadir hojas de estilos a nuestro programa
export function links(){
    return [
        {
          rel: "stylesheet",
            href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css"
        },
        {
            rel:"preconnect",
            href: "https://fonts.googleapis.com"
        },
        {
            rel:"stylesheet",
            href: "https://fonts.gstatic.com",
            crossOrigin: "true"
        },
        {
            rel:"preconnect",
            href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap"
        },
        {
            rel: "stylesheet",
            href: styles
        }
    ]
}
export  default  function App(){
    return (
        <Document>
            {/*El contenido dentro de document es lo que se va pasar como children*/}
            <Outlet />
        </Document>
    )
}
function Document({children}) {//también lo podemos llamar como Layout, porque va a renderizar todo lo que le pasemos
    return (
        <html lang="es">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Header />
                {children}
                <Footer />
                <Scripts />
            <LiveReload />
            </body>
        </html>
    )
}

/**Manejo de errores**/
export function CatchBoundary(){
    const error = useCatch()
    return(
        <Document>
            <p className={"error"}>{error.status} {error.statusText}</p>
            <Link className={"error-enlace"} to={"/"}>Tal vez quieras volver a la página principa</Link>
        </Document>
    )
}
export function ErrorBoundary({error}) {
    return (
        <Document>
            <p className={"error"}>{error.status} {error.statusText}</p>
            <Link className={"error-enlace"} to={"/"}>Tal vez quieras volver a la página principa</Link>
        </Document>
    )
}