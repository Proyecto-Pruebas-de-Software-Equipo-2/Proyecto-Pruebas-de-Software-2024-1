import Image from "next/image";
import Link from "next/link";
import React from "react";

function BuscarComponent({ _id,nombre, precio,talla,descripcion,color,categoria,tipo}){
    return(
        <Link href ={{pathname:"/producto/[id]/detalle", query: {id : _id}}} className="border-2 py-8  h-86  items-center bg-gradient-to-r from-red-900 to-violet-900 grid grid-cols-2 gap-4">
            <div className="w-64 px-2">
                <div className="mt-2 py-2">
                    <h3 className="font-bold text-3xl">{nombre}</h3>
                </div>
                <div className="bg-blue-100 p-5 rounded-x1">
                    <Image src={"/images/640.webp"} width={220} height={220}/>
                </div>

            </div>
            <div className="mt-2">
                    <p className="flex text-xl">Talla: {talla}</p>
                    <p className="flex text-xl">Precio: ${precio}</p>
                    <p className="flex text-xl">Color: {color}</p>
                    <p className="flex text-xl">Categoria: {categoria} </p>
                    <p className="flex text-xl">Tipo: {tipo}</p>
            </div>
        </Link>
    )
}

export default BuscarComponent;