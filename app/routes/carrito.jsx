import styles from "~/styles/carrito.css"
import {useOutletContext} from "@remix-run/react";
import {useEffect, useState} from "react";
//import { useHydrated } from "./use-hydrated.js";

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
            title: "GuitarLA - Carrito de Compras",
            description: "Venta de guitarras"
        }
    ]
}
export default function Carrito() {
    const [total, setTotal]=useState(0)
    const {carrito, actualizarCantidad, eliminarGuitarra} = useOutletContext();
    useEffect(() =>{
        const calculoTotal = carrito.reduce((total, productucto) => total +(productucto.cantidad * productucto.precio), 0);//reduce es un acumulador. Va a ir recorriendo cada producto y calculando el total
        setTotal(calculoTotal)
    },[carrito])
    return (
                <main className={"contenedor"}>
                    <h1 className={"heading"}>Carrito de Compras</h1>
                    <div className={"contenido"}>
                        <div className={"carrito"}>
                            <h2>Artículo</h2>
                            {carrito?.length === 0 ? "Carrito de vacío" : (
                                carrito?.map(elemento =>{//recuerda, si pongo llaves hay que poner un return. Si uso el (), el return sobra
                                    return(
                                        <div key={elemento.id} className={"producto"}>
                                            <div>
                                                <img src={elemento.imagen} alt={`Imagen del producto ${elemento.nombre}`}/>
                                            </div>
                                            <div>
                                                <p className={"nombre"}>{elemento.nombre}</p>
                                                <p>Cantidad</p>
                                                <select
                                                    value={elemento.cantidad}//por defecto va a tener el como valor inicial la cantidad seleccionada
                                                    className={"select"}
                                                    onChange={e => actualizarCantidad({
                                                        cantidad: parseInt(e.target.value),
                                                        id: elemento.id
                                                    })}
                                                >
                                                    <option value={"1"}>1</option>
                                                    <option value={"2"}>2</option>
                                                    <option value={"3"}>3</option>
                                                    <option value={"4"}>4</option>
                                                    <option value={"5"}>5</option>
                                                </select>
                                                <p className={"precio"}>$<span>{elemento.precio}</span></p>
                                                <p className={"subtotal"}>Subtotal: $<span>{elemento.precio * elemento.cantidad}</span></p>
                                            </div>
                                            <button type={"button"} className={"btn-eliminar"}
                                                    onClick={() =>eliminarGuitarra(elemento.id)}
                                            >X</button>
                                        </div>

                                    )
                                })

                            )}
                        </div>
                        <aside className={"resumen"}>
                            <h3>Resumen del Pedido</h3>
                            <p>Total a pagar: ${total}</p>
                        </aside>
                    </div>
                </main>
    )
}
