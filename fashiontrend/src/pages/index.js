import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BuscarComponent from "@/pages/components/Producto/productoinicio";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
      fetch('http://localhost:3000/api/products')
        .then((response) => response.json())
        .then((json) => {
            setProducts(json);
            setFilteredProducts(json); // Initially show all products
        })
        .catch((error) => console.error("Error fetching products:", error));
  }, [router.pathname]); 

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

