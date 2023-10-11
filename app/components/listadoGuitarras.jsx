import {Guitarra} from "~/components/guitarra";

export function ListadoGuitarras({guitarras}) {
  return (
   <>
    {guitarras.length && (
        <div className={"guitarras-grid"}>
            {guitarras.map(guitarra=>(
                <Guitarra
                    key={guitarra?.id}
                    guitarra={guitarra?.attributes}
                />
            ))}
        </div>
    )}
   </>
  )
}

