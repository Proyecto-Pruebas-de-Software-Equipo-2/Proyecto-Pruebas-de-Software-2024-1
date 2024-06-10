import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BuscarComponent from "@/pages/components/Producto/productoinicio";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
      fetch('http://localhost:3000/api/products')
        .then((response) => response.json())
        .then((json) => {
            setProducts(json);
            setFilteredProducts(json); // Initially show all products
            const uniqueCategories = [...new Set(json.map((product) => product.categoria))];
            setCategories(uniqueCategories);
        })
        .catch((error) => console.error("Error fetching products:", error));
  }, [router.pathname]); 

  const categorias = [...new Set(products.map((p)=>p.categoria))]

  return (
    
    <div className="container mx-auto px-4">
        {categorias.map((categoria) => (
            <div key={categoria} className="mb-8">
                <h2 className="text-3xl font-bold mb-4">{categoria}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.filter(p => p.categoria === categoria).map((product) => (
                        <BuscarComponent key={product._id} {...product} />
                    ))}
                </div>
            </div>
        ))}
    </div>
);
}
