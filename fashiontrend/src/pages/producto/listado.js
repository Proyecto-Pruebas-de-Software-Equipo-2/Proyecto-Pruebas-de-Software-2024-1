import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import ListadoComponent from "../components/Producto/listado";
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

    )

}