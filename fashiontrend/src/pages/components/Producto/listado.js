import Image from "next/image";
import React from "react";

function ListadoComponent({ nombre, precio,talla,descripcion,color,categoria,tipo}){
    return(
        <div className="grid gap-4">
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
        </div>
    )
}

export default ListadoComponent;