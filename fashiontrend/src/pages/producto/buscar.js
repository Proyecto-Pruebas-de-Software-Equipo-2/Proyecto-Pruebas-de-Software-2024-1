import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BuscarComponent from "../../components/Producto/buscar";


export default function Buscar(){
    const router = useRouter()
    const nombre = router.query.nombre
    const [products, setproducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/products')
        .then((response) => response.json())
        .then((json) => setproducts(json))
    },[])

    return(

        <div>
            {products.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase())).map(products => (
                <div>
                    <BuscarComponent {...products}/>
                </div>
            ))}
        </div>
    )}