import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import BuscarComponent from "@/pages/components/Producto/buscar";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [products, setproducts] = useState([]);
  useEffect(() => {
      fetch('http://localhost:3000/api/products')
      .then((response) => response.json())
      .then((json) => setproducts(json))
  },[])
  
  const categorias = [...new Set(products.map((p)=>p.categoria))]

  return(
      <div>
          <div className="grid px-5 gap-4 grid-flow-cols-2">
              {categorias.map((categorias) => (
                  <div>
                      {products.filter(p => p.categoria == categorias).map(products => (
                          <div className="py-3">
                              <BuscarComponent {...products}/>
                          </div>
                      ))}
                  </div>
              ))}
          </div>
      </div>

  )
}
