import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import ListadoComponent from "../components/Producto/listado";
import Link from "next/link";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

export default function Listado() {
    const router = useRouter();
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
    },[lastIndex,initialIndex])

    const categorias = [...new Set(products.map((p)=>p.categoria))];
    
    function handleNext(){
        let maxIndex = products.length;
        if (lastIndex >= products.length)return;
        else {
            setlastIndex(lastIndex+5);
            if (lastIndex + 5 > maxIndex) setlastIndex(maxIndex);
            setinitialIndex(initialIndex+5);
            
            window.scrollTo(0,0);
            return;
        }
    }

    function handlePrevious(){
        let maxIndex = products.length;
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
            <div className="flex justify-end py-10 px-10">
                <Link href={'/producto/crear'} className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear Producto</Link>
            </div>
            <div className=" px-2 py-2 font-bold">
                {initialIndex + 1} - {lastIndex} de {products.length}
            </div>
            <div className="grid gap-4 grid-flow-cols-1">
                {categorias.map((categorias) => (
                    <div>
                        {products.slice(initialIndex,lastIndex).filter(p => p.categoria == categorias).map(products => (
                            <div>
                                <ListadoComponent {...products}/>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
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

    )

}