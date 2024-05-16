import { useRouter } from "next/router";
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from "react";
import Image from "next/image";


const ISSERVER = typeof window === "undefined";
export default function Detalle(){
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

    return(
        <div className="bg-gradient-to-b from-violet-950 to-transparent h-screen">
            <div className="grid grid-cols-2 gap-x-2 gap-y-3">
                <div className=" border-white border-2 rounded-lg shadow-xl h-[500px] w-[500px]">
                    <Image alt= "test" className="px-2 py-2" src={"/images/640.webp"} width={500} height={500}/>
                </div>
                <div className=" border-white border-2 rounded-lg shadow-xl w-10/12 min-h-[50px]">
                    <div className="px-2 py-2 text-3xl" >Nombre: {product.nombre}</div>
                    <div className="px-2 py-2 text-2xl" >Talla: {product.talla}</div>
                    <div className="px-2 py-2 text-2xl" >Color: {product.color}</div>
                    <div className="px-2 py-2 text-2xl" >Categoría: {product.categoria}</div>
                    <div className="px-2 py-2 text-2xl" >Tipo: {product.tipo}</div>
                    <div className="px-2 py-2 text-2xl" >Precio: ${product.precio}</div>
                    <div className="px-2 py-2 text-2xl" >Stock: ${product.stock}</div>
                    <div className="px-2 py-2 text-2xl" >Descripción:</div>
                    <div className="px-2 py-2 text-1xl">{product.descripcion}</div>
                    <div className="px-2 py-2">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar al carro</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
