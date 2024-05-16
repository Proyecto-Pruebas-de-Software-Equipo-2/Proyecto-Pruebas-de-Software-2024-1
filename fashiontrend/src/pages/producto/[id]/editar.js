import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const ISSERVER = typeof window === "undefined";
export default function Editar(){
    const router = useRouter();
    const [id, setId] = useState(() => {
        const Id = router.query.id
        if (ISSERVER) return Id;
        if (Id) {
           localStorage.setItem("Id", Id);
           return Id;
        } else {
           return localStorage.getItem("Id");
        }
      });

    const [product, setproduct] = useState([]);


    useEffect(() => {
        fetch("http://localhost:3000/api/products/" + id)
        .then((response) => response.json())
        .then((json) => setproduct(json))
    },[])

    const [nombre, setNombre] = useState("");
    const [talla, setTalla] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [color, setColor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [tipo, setTipo] = useState("");
    const [precio, setPrecio] = useState();
    const [stock, setStock] = useState();




    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!nombre || !talla || !descripcion || !color || !categoria || !tipo || !precio || !stock){
            alert("Debe llenar todos los campos");
            return;
        }
        try {
            const res = await fetch(pathname,{
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({nombre,talla,descripcion,color,categoria,tipo,precio,stock}),
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
        <div className="items-center bg-gradient-to-b  from-slate-800 to-transparent">
        <title>Editar Producto</title>
        <h6 className="mb-2 text-center text-6xl font-serif py-10">Editar Producto</h6>
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto items-center rounded-lg p-4 border-purple-950 border-4 box-border h-50 w-50">
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                <input onChange={(e) => setNombre(e.target.value)} value={nombre} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder={product.nombre}/>
            </div>
            <div className="mb-5">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Talla</label>
                <input onChange={(e) => setTalla(e.target.value)} value={talla} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder={product.talla}/>
            </div>
            <div className="mb-5">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                <textarea onChange={(e) => setDescripcion(e.target.value)} value={descripcion} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder={product.descripcion}/>
            </div>
            <div className="mb-5">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                <input onChange={(e) => setColor(e.target.value)} value={color} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder={product.color}/>
            </div>
            <div className="mb-5">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría</label>
                <input onChange={(e) => setCategoria(e.target.value)} value={categoria} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder={product.categoria}/>
            </div>
            <div className="mb-5">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo</label>
                <input onChange={(e) => setTipo(e.target.value)} value={tipo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder={product.tipo}/>
            </div>
            <div className="mb-5">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
                <input onChange={(e) => setPrecio(e.target.value)} value={precio} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" placeholder={product.precio}/>
            </div>
            <div className="mb-5">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                    <input onChange={(e) => setStock(e.target.value)} value={stock} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" placeholder={product.stock}/>
            </div>
            
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Editar Producto</button>    
        </form>
    </div>
    )
}