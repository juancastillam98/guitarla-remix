//el archivo root es como el archivo main de react, sin él, el proyecto no funciona
import {
    Meta, //este componente que he importado es un componente especial para utilizar el meta.
    Links,
    Outlet,
    Scripts,//este componente predefinido de Remix es para mejorar el js
    LiveReload, //este liveReload es para no tener que recargar la página para visualizar los cambios
    Link, useRouteError
} from "@remix-run/react"
import {useState, useEffect} from "react";
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
    /*
    SI no hay naa en localStorage, va a inicializar con un array vacío. Lo del typeof window es porque por defecto, localStorage ha estar dentro de un useEfect, o estate.
     pero al principio, como está fuera esto no funciona y nos dice la consola que localStorage no está definido.
        */
    const carritoLS = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("carrito")) ?? [] : null;
    const [carrito, setCarrito] =useState(carritoLS);
    useEffect(()=>{
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito])
    const agregarCarrito = (guitarra)=>{
        //si ya existe esa guitarra
        if (carrito.some( guitarraCarrito => guitarraCarrito.id === guitarra.id )){
            //iterar sobre el array e identificar el carrito duplicado
             const carritoActualizado = carrito.map(guitarraCarrito =>{
                 if (guitarraCarrito.id=== guitarra.id){
                     //Reescribir la cantidad
                     guitarraCarrito.cantidad = guitarra.cantidad;
                 }
                 return guitarraCarrito;
             } )
            setCarrito(carritoActualizado)
          }else{
            //registro nuevo
            setCarrito([...carrito, guitarra])
        }
    }
    const actualizarCantidad = (guitarra)=>{
        const carritoActualizado = carrito.map(guitarraElemento =>{
                if (guitarraElemento.id === guitarra.id){
                    guitarraElemento.cantidad =guitarra.cantidad;
                }
                return guitarraElemento;

        })
        setCarrito(carritoActualizado)
    }
    const eliminarGuitarra = (id)=>{
        const carritoActualizado = carrito.filter(guitarraElemento =>{
            return guitarraElemento.id !== id
        })
        setCarrito(carritoActualizado)
    }
    return (
        <Document>
            {/*El contenido dentro de document es lo que se va pasar como children*/}
            <Outlet
                /*
                El context, es para pasar la iinformación a través del árbol sin necesidad de pasarla usando los props. Por ejemplo, antes para pasara el estado de un De una tienda a un producto,
                se lo pasábamos de tienda a carrito y de carrito a producto. Con context ya podemos pasarla directamente a producto
                */
                //context siempre es un objeto. Para usar la información de este context, hay que importar el hook de useOutletContext en el componte/ruta... es decir donde queramos utilizaro
                context={{
                    guitarLA: "GuitarLA",
                    agregarCarrito,
                    carrito,
                    actualizarCantidad,
                    eliminarGuitarra
                }}
            />
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
                {children}{/*Esto es lo que gracias al outlet, se va a ir cambio. Lo que hace el outlet para que esto sea posible, es renderizar un componente distion en base a la ruta*/}
                <Footer />
                <Scripts />
            <LiveReload />
            </body>
        </html>
    )
}

/**Manejo de errores**/
export function CatchBoundary(){
    const error = useRouteError()
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