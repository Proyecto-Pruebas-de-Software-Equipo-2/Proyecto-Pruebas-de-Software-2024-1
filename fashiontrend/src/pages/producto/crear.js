import { useState } from "react"
import { useRouter } from "next/navigation";

export default function Crear(){
    const [nombre, setNombre] = useState("");
    const [talla, setTalla] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [color, setColor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [tipo, setTipo] = useState("");
    const [precio, setPrecio] = useState();

    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!nombre || !talla || !descripcion || !color || !categoria || !tipo || !precio){
            alert("Debe llenar todos los campos");
            return;
        }
        try {
            const res = await fetch('http://localhost:3000/api/products',{
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({nombre,talla,descripcion,color,categoria,tipo,precio}),
            });
            if (res.ok){
                router.push('/producto/listado');
            } else {
                throw new Error('Falló la creación de producto')
            }
        } catch (error){
            console.log(error);
        }
    };

    return(
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input onChange={(e) => setNombre(e.target.value)} value={nombre} className="border border-slate-500 px-8 py-2 text-black" type="text" placeholder="Ingrese Nombre"/>
                <input onChange={(e) => setTalla(e.target.value)} value={talla} className="border border-slate-500 px-8 py-2 text-black" type="text" placeholder="Ingrese Talla"/>
                <input onChange={(e) => setDescripcion(e.target.value)} value={descripcion} className="border border-slate-500 px-8 py-2 text-black" type="text" placeholder="Ingrese Descripción"/>
                <input onChange={(e) => setColor(e.target.value)} value={color} className="border border-slate-500 px-8 py-2 text-black" type="text" placeholder="Ingrese Color"/>
                <input onChange={(e) => setCategoria(e.target.value)} value={categoria} className="border border-slate-500 px-8 py-2 text-black" type="text" placeholder="Ingrese Categoría"/>
                <input onChange={(e) => setTipo(e.target.value)} value={tipo} className="border border-slate-500 px-8 py-2 text-black" type="text" placeholder="Ingrese Tipo"/>
                <input onChange={(e) => setPrecio(e.target.value)} value={precio} className="border border-slate-500 px-8 py-2 text-black" type="number" placeholder="Ingrese Precio"/>
                <button type="submit" className="btn btn-success">Crear Producto</button>
            </form>
        </div>
    )
}