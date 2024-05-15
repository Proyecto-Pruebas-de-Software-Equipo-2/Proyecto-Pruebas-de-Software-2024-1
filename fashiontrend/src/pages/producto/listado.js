import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import ListadoComponent from "../components/Producto/listado";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Listado() {
    const [products, setproducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/api/products')
        .then((response) => response.json())
        .then((json) => setproducts(json))
    },[])
    
    const categorias = [...new Set(products.map((p)=>p.categoria))]

    return(
        <div>
            <div className=" right-0 py-10 px-10">
                <Link href={'/producto/crear'} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear Producto</Link>
            </div>
            <div className="grid gap-4 grid-flow-cols-2">
                {categorias.map((categorias) => (
                    <div>
                        {products.filter(p => p.categoria == categorias).map(products => (
                            <div>
                                <ListadoComponent {...products}/>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>

    )

}