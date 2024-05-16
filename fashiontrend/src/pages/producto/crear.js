import { useState } from "react"
import { useRouter } from "next/navigation";
import Head from "next/head";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Crear(){
    const [nombre, setNombre] = useState("");
    const [talla, setTalla] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [color, setColor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [tipo, setTipo] = useState("");
    const [precio, setPrecio] = useState();
    const [stock, setStock] = useState();

    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!nombre || !talla || !descripcion || !color || !categoria || !tipo || !precio || !stock){
            alert("Debe llenar todos los campos");
            return;
        }
        try {
            const res = await fetch('http://localhost:3000/api/products',{
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({nombre,talla,descripcion,color,categoria,tipo,precio,stock}),
            });
            if (res.ok){
                toast.success('Producto creado exitosamente', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    onClose: () => {
                        router.push('/producto/listado');
                    }
                    });
            } else {
                throw new Error('Falló la creación de producto')
            }
        } catch (error){
            console.log(error);
        }
    };

    return(
        <div className="items-center bg-gradient-to-b  from-slate-800 to-transparent">
            <title>Crear Producto</title>
            <h6 className="mb-2 text-center text-6xl font-serif py-10">Crear Producto</h6>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto items-center rounded-lg p-4 border-purple-950 border-4 box-border h-50 w-50">
                <div className="mb-5">
                    <label for="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                    <input onChange={(e) => setNombre(e.target.value)} value={nombre} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Ingrese Nombre"/>
                </div>
                <div className="mb-5">
                    <label for="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Talla</label>
                    <input onChange={(e) => setTalla(e.target.value)} value={talla} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Ingrese Talla"/>
                </div>
                <div className="mb-5">
                    <label for="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                    <textarea onChange={(e) => setDescripcion(e.target.value)} value={descripcion} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Ingrese Descripción"/>
                </div>
                <div className="mb-5">
                    <label for="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                    <input onChange={(e) => setColor(e.target.value)} value={color} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Ingrese Color"/>
                </div>
                <div className="mb-5">
                    <label for="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría</label>
                    <input onChange={(e) => setCategoria(e.target.value)} value={categoria} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Ingrese Categoría"/>
                </div>
                <div className="mb-5">
                    <label for="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo</label>
                    <input onChange={(e) => setTipo(e.target.value)} value={tipo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Ingrese Tipo"/>
                </div>
                <div className="mb-5">
                    <label for="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
                    <input onChange={(e) => setPrecio(e.target.value)} value={precio} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" placeholder="Ingrese Precio"/>
                </div>
                <div className="mb-5">
                    <label for="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                    <input onChange={(e) => setStock(e.target.value)} value={stock} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" placeholder="Ingrese Stock"/>
                </div>
                
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear Producto</button>
                   
            </form>
        </div>
    )
}