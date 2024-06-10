import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BuscarComponent from "../components/Producto/productoinicio";


export default function Buscar(){
    const router = useRouter();
    const nombre = router.query.nombre
    const [products, setproducts] = useState([]);
    const [productsAmount, setproductsAmount] = useState(5);
    const [initialIndex, setinitialIndex] = useState(0);
    const [lastIndex, setlastIndex] = useState(5);
    useEffect(() => {
        fetch('http://localhost:3000/api/products')
        .then((response) => response.json())
        .then((json) => setproducts(json))
    },[router.pathname])


    useEffect(() => {
        setproductsAmount(products.length)
    },[initialIndex])

    
    function handleNext(){
        let maxIndex = products.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase())).length;
        if (lastIndex >= maxIndex)return;
        else {
            setlastIndex(lastIndex+5);
            if (lastIndex + 5 > maxIndex) setlastIndex(maxIndex);
            setinitialIndex(initialIndex+5);
            window.scrollTo(0,0);
            return;
        }
    }

    function handlePrevious(){
        let maxIndex = products.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase())).length;
        if (initialIndex - 5 < 0)return;
        else {
            if (maxIndex == lastIndex ) {
                setlastIndex(initialIndex);
                setinitialIndex(initialIndex-5);
            }
            else {
                setinitialIndex(initialIndex-5);
                setlastIndex(lastIndex-5);
            }
            window.scrollTo(0,0);
            return;
        }
    }


    return(

        <div>
            <div className=" px-2 py-2 font-bold">
                {initialIndex + 1} - {lastIndex} de {products.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase())).length}
            </div>
            {products.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase())).slice(initialIndex,lastIndex).map(products => (
                    <BuscarComponent {...products}/>
            ))}
            <footer className="grid px-10 py-6 grid-cols-6 w-screen">
                <div>
                    <button onClick={handlePrevious} className="w-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Anterior</button>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className="flex">
                    <button onClick={handleNext} className=" w-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Siguiente</button>
                </div> 
            </footer>
        </div>
    )}