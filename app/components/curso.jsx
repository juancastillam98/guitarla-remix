export function Curso({curso}){
    const {contenido, imagen, titulo} = curso
    return (
        <section className={"curso"}>
            {/*esto es una sintaxis especial de jsx*/}
            <style jsx="true">{`
                .curso {
                  background-image: linear-gradient(to right, rgb(0 0 0 / .65), rgb(0 0 0 / .7)), url(${imagen.data.attributes.url});
                  background-repeat: no-repeat;
                  
                }
            `}</style>
            <div className={"contenedor curso-grid"}>
                <div className={"contenido"}>
                    <h2 className={"heading"}>{titulo}</h2>
                    <p className={"text"}>{contenido}</p>
                </div>
            </div>
        </section>
    )
}