import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BuscarComponent from "@/pages/components/Producto/buscar";

export default function Home() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
      fetch('http://localhost:3000/api/products')
        .then((response) => response.json())
        .then((json) => setProducts(json))
        .catch((error) => console.error("Error fetching products:", error));
  }, [router.pathname]);

  const categorias = [...new Set(products.map((p) => p.categoria))];


  return (
    <div>
      <div className="grid gap-4 grid-flow-cols-2">
        {categorias.map((categoria) => (
          <div key={categoria}>
            {products.filter((p) => p.categoria === categoria).map((product) => (
              <div key={product.id}>
                <BuscarComponent {...product} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
