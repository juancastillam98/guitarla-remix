//estas funciones de metal, title, links... en remix, solamente funcionan en la carpeta de routes
/*export function meta(){
    return (
        {
            title:"GuitarLA - Nosotros"
        }
    )
}*/
import imagen from "../../public/img/nosotros.jpg";
import styles from "../styles/nosotros.css"
import {useOutletContext} from "@remix-run/react";//hok para extraer la información del content

export function meta(){
    return [
        {
            title:"GuitarLA - Sobre nosotros"
        }
    ]
}
export function links(){//de esta manera estamos sacando la hoja de estilos correspondiente a este página.
    return[
        {
            rel: "stylesheet",
            href: styles
        },
        {
            rel: "preload",//esto es para que tan pronto como cargue este sitio web, cargue el HTML
            href: imagen,
            as: "image"
        }
    ]
}

function Nosotros() {
    const data = useOutletContext();
    return (
        <main className={"contenedor nosotros"}>
            <h2 className={"heading"}>Nosotros</h2>
            <div className={"contenido"}>
                <img src={imagen} alt={"Imagen sobre nosotros"}/>
                <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt, elit non fringilla efficitur,
                        quam lectus commodo metus, in commodo massa nulla quis enim. Donec at efficitur elit, ut imperdiet nunc.
                        Phasellus et libero sed nulla rutrum maximus ac a neque. Proin porta in augue cursus gravida. Nullam vehicula
                        ante id imperdiet gravida. Ut dictum efficitur purus, a faucibus ante condimentum at. Mauris ullamcorper sem velit,
                        nec vehicula nisi vestibulum sit amet.
                    </p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt, elit non fringilla efficitur,
                        quam lectus commodo metus, in commodo massa nulla quis enim. Donec at efficitur elit, ut imperdiet nunc.
                        Phasellus et libero sed nulla rutrum maximus ac a neque. Proin porta in augue cursus gravida. Nullam vehicula
                        ante id imperdiet gravida. Ut dictum efficitur purus, a faucibus ante condimentum at. Mauris ullamcorper sem velit,
                        nec vehicula nisi vestibulum sit amet.
                    </p>
                </div>
            </div>
        </main>
    )
}
export  default Nosotros