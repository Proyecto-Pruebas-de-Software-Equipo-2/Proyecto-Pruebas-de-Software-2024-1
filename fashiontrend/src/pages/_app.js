import "@/styles/globals.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function App({ Component, pageProps }) {
  const [nombre, setNombre] = useState("");
  const router = useRouter();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log(nombre);
    router.push({pathname:'/producto/[nombre]',query:{nombre: nombre}});
  }

  return(
    <div>
        <nav className="flex justify-between items-center bg-gradient-to-b p-2 from-slate-800 to-transparent  mx-auto">
            <Link href={{pathname:"/"}}>
                Fashion Trend
            </Link>
            <form onSubmit={handleSubmit} className="w-max">
              <input onChange={(e) => setNombre(e.target.value)} value={nombre} className="bg-gray-50 border w-max border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Buscar producto"/>
            </form>
              

            
            <div className="flex items-center gap-6">
                <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">Iniciar Sesión</button>
                <ion-icon onclick="onToggleMenu(this)" name="menu" className="text-3xl cursor-pointer md:hidden"></ion-icon>
            </div>
            </nav>

      



      
      <Component {...pageProps} />
    </div>
    
  );


}
