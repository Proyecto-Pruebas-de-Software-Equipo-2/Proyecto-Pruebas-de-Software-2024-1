import { useRouter } from "next/router";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from "react";
import {HeartIcon} from "@heroicons/react/24/outline"
import {HeartIcon as HeartIconFilled}  from "@heroicons/react/24/solid"
import Image from "next/image";
import BuscarComponent from "@/pages/components/Producto/productoinicio";


const ISSERVER = typeof window === "undefined";
export default function ListaDeseados(){
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
      
      const [client, setclient] = useState([]);
      const [products, setProducts] = useState([]);
      const [filteredProducts, setFilteredProducts] = useState([]);
    
      useEffect(() => {
          fetch("http://localhost:3000/api/clients/" + id)
          .then((response) => response.json())
          .then((json) => setclient(json))
      },[])



      useEffect(() => {
         fetch('http://localhost:3000/api/products')
           .then((response) => response.json())
           .then((json) => {
               setProducts(json);
               setFilteredProducts(products.filter(p => client.favoritos.includes(p._id)));
           })
           .catch((error) => console.error("Error fetching products:", error));
         }, [client]); 
     
     

     return (
       <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {filteredProducts.map((product) => (
                   <BuscarComponent key={product._id} {...product} />
               ))}
           </div>
       </div>
     );

}
