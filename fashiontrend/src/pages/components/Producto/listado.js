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
        <div>
            <Link href ={{pathname:"/producto/[id]/detalle", query: {id : _id}}} className="grid gap-4">
                <div className="w-64">
                    <div className="bg-blue-100 p-5 rounded-x1">
                        <Image src={"/images/640.webp"} width={220} height={220}/>
                    </div>
                    <div className="mt-2">
                        <h3 className="font-bold text-lg">{nombre}</h3>
                    </div>
                    <div className="mt-2">
                        <p className="flex">Talla: {talla}</p>
                        <p className="flex">Precio: ${precio}</p>
                        <p className="flex">Color: {color}</p>
                        <p className="flex">Categoria: {categoria} </p>
                        <p className="flex">Tipo: {tipo}</p>
                    </div>
                </div>
            </Link>
            <form onSubmit={handleDelete} className="py-8">
                <Link href={{pathname:"/producto/[id]/editar", query:{id: _id}}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Editar</Link>
                <button type="submit"   className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Eliminar Producto</button>
            </form>
        </div>
    )
}

export default ListadoComponent;