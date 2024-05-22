import "@/styles/globals.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from 'react-toastify';


export default function App({ Component, pageProps }) {
  const [nombre, setNombre] = useState("");
  const router = useRouter();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log(nombre);
    router.push({pathname:'/producto/buscar',query:{nombre: nombre}});
  }

  return(
    <div className="">
        <nav className="flex h-16 w-screen justify-between items-center bg-sky-500  mx-auto">
            <Link className="px-2" href={{pathname:"/"}}>
                Fashion Trend
            </Link>
            <form onSubmit={handleSubmit} className="px-8 items-center">
              <input onChange={(e) => setNombre(e.target.value)} value={nombre} className=" bg-gray-50 border w-[72rem] border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Buscar producto"/>
            </form>
            
            <Link className="px-2" href={{pathname:"/producto/listado"}}>Listado</Link>

            
            <div className="flex px-4 items-center">
                <button className="bg-[#a6c1ee] text-white px-3 py-1 rounded-full hover:bg-[#87acec]">Iniciar Sesión</button>
            </div>
            <ToastContainer />
            </nav>

      <Component {...pageProps} />
    </div>
    
  );


}
