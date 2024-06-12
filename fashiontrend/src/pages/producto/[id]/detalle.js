import { useRouter } from "next/router";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from "react";
import {HeartIcon} from "@heroicons/react/24/outline"
import {HeartIcon as HeartIconFilled}  from "@heroicons/react/24/solid"
import Image from "next/image";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

    const clientId = "6642497987b35bec7387870f";
    const [client, setclient] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/api/clients/" + clientId)
        .then((response) => response.json())
        .then((json) => setclient(json))
    },[])

    const handleClick = async(e) => {
        e.preventDefault();
        try {
            let clientFavoritos = client.favoritos;
            if (client.favoritos.includes(id)){
                    let index = clientFavoritos.indexOf(id);
                    clientFavoritos.splice(index,1);
            } else{
                if (!client.favoritos){
                    clientFavoritos = [id.toString()];
                } else {
                    clientFavoritos = client.favoritos;
                    clientFavoritos.push(product._id);
                }
            }
            

            const res = await fetch("http://localhost:3000/api/clients/" + clientId,{
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({favoritos:clientFavoritos}),
            });
            if (res.ok){
                if (clientFavoritos.includes(id)){
                    toast.success('Producto añadido a la lista de deseados!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
    
                        });
                } else {
                    toast.success('Producto eliminado de lista de deseados!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
    
                        });
                }


            } else {
                throw new Error('Falló la creación de producto')
            }
        } catch (error){
            console.log(error);
        }
    };
    

    return(
        <div className=" py-2 items-center">
            <div className="grid items-center grid-cols-2 gap-x-2">
                <div className=" border-white border-2 rounded-lg shadow-xl h-[500px] w-[500px]">
                    <Image alt= "test" className="px-2 py-2" src={"/images/640.webp"} width={500} height={500}/>
                </div>
                <div className=" border-white border-2 rounded-lg shadow-xl w-10/12 min-h-[50px]">
                    <button className="border-2 hover:shadow-inner w-15 flex px-2 py-2" onClick={handleClick}>
                        <HeartIcon height={40} style={{color: "red"}} />
                            
                    </button>
                    <div className="px-2 py-2 text-3xl" >Nombre: {product.nombre}</div>
                    <div className="px-2 py-2 text-2xl" >Talla: {product.talla}</div>
                    <div className="px-2 py-2 text-2xl" >Color: {product.color}</div>
                    <div className="px-2 py-2 text-2xl" >Categoría: {product.categoria}</div>
                    <div className="px-2 py-2 text-2xl" >Tipo: {product.tipo}</div>
                    <div className="px-2 py-2 text-2xl" >Precio: ${product.precio}</div>
                    <div className="px-2 py-2 text-2xl" >Stock: {product.stock}</div>
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
