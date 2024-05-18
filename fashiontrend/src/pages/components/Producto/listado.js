import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";


function ListadoComponent({ _id,nombre, precio,talla,descripcion,color,categoria,tipo}){
    const id = _id
    const router = useRouter();
    const handleDelete = async(e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/api/products/" + id,{
                method: "DELETE",
            });
            if (res.ok){
                router.reload();
            } else {
                throw new Error('Falló la creación de producto')
            }
        } catch (error){
            console.log(error);
        }
    };

    return(
        <Link href ={{pathname:"/producto/[id]/detalle", query: {id : _id}}} className=" h-86 border-2 border-t-sky-200 items-center grid grid-cols-3 px-4 gap-8 py-8">
            <div  className="grid gap-4">
                <div className="w-64 px-2 py-2">
                    <div className="mt-2 py-2">
                        <h3 className="font-bold text-2xl">{nombre}</h3>
                    </div>
                    <div className="bg-violet-200 p-5 rounded-x1">
                        <Image src={"/images/640.webp"} width={220} height={220}/>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-2 mt-2">
                <p className="flex text-xl">Talla: {talla}</p>
                <p className="flex text-xl">Precio: ${precio}</p>
                <p className="flex text-xl">Color: {color}</p>
                <p className="flex text-xl">Categoria: {categoria} </p>
                <p className="flex text-xl">Tipo: {tipo}</p>
            </div>
            <form onSubmit={handleDelete} className="h-5 w-max grid grid-cols-2 px-3 gap-8 py-8">
                <Link href={{pathname:"/producto/[id]/editar", query:{id: _id}}} className=" w-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Editar</Link>
                <button type="submit"   className=" w-10 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Eliminar Producto</button>
            </form>
        </Link>
    )
}

export default ListadoComponent;