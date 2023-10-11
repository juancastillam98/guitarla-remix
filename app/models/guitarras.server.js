//al ponerle la extensioón  de .server.js estamos haciendo que este archivo se ejecute sí o sí en el lado del servidor.
export async function getGuitarras(){
    const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`);//se usa una variable de entorno
    const resultado = await respuesta.json();
    return resultado;
}
export async function getGuitarra(url){
    const respuesta = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`)
    return await respuesta.json();
}