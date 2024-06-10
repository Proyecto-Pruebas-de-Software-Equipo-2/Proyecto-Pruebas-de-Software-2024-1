import { useEffect, useState } from "react";
import ProductoInicio from "@/pages/components/Producto/productoinicio";
import { useRouter } from "next/router";

const CategoriaPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { categoria } = router.query;

  useEffect(() => {
    if (categoria) {
      fetch("http://localhost:3000/api/products")
        .then((response) => response.json())
        .then((json) => {
          const filtered = json.filter((product) => product.categoria === categoria);
          setProducts(filtered);
          const uniqueCategories = [...new Set(json.map((product) => product.categoria))];
          setCategories(uniqueCategories);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [categoria]);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{categoria}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductoInicio key={product._id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriaPage;


