import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductoInicio({ _id, nombre, precio, color }) {
    return (
        <Link href={{ pathname: "/producto/[id]/detalle", query: { id: _id } }} passHref>
            <div className="border rounded-lg overflow-hidden shadow-lg transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                <div className="bg-gray-100 p-4">
                    <Image src={"/images/640.webp"} width={220} height={220} alt={nombre} className="rounded-md" />
                </div>
                <div className="p-4">
                    <h3 className="font-bold text-2xl mb-2">{nombre}</h3>
                    <p className="text-lg text-gray-700 mb-1">Precio: ${precio}</p>
                    <p className="text-lg text-gray-500">Color: {color}</p>
                </div>
            </div>
        </Link>
    );
}

export default ProductoInicio;
