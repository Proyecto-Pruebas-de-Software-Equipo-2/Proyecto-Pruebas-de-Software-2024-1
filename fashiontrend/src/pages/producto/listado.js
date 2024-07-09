import { useEffect, useState } from "react";
import ListadoComponent from "../components/Producto/listado";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Listado = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5; // Número de productos por página
  const maxPagesToShow = 5; // Máximo número de páginas para mostrar en la navegación

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((response) => response.json())
      .then((json) => setProducts(json))
      .catch((error) => console.error("Error fetching products:", error));
  }, [router.pathname]);

  // Calcular productos actuales para mostrar en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular total de páginas
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Lógica para mostrar botones de página
  const pageNumbers = [];
  const halfPagesToShow = Math.floor(maxPagesToShow / 2);

  // Primera página fija
  pageNumbers.push(1);

  // Páginas centrales dinámicas
  let startPage = Math.max(2, currentPage - halfPagesToShow);
  let endPage = Math.min(totalPages - 1, currentPage + halfPagesToShow);

  if (startPage <= 2) {
    endPage = Math.min(maxPagesToShow - 2, totalPages - 1);
  }

  if (endPage >= totalPages - 1) {
    startPage = Math.max(2, totalPages - maxPagesToShow + 2);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Última página fija
  pageNumbers.push(totalPages);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Listado de Productos</h1>

          <Link href={'/producto/crear'} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Crear Producto
          </Link>
        </div>

        <div className="px-2 py-2 font-bold">
          Mostrando {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, products.length)} de {products.length} productos
        </div>

        <div className="grid gap-4 grid-flow-cols-1">
          {currentProducts.map((product, index) => (
            <div key={index}>
              <ListadoComponent {...product} />
            </div>
          ))}
        </div>

        <nav className="mt-8 flex justify-center" aria-label="Pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          {pageNumbers.map((pageNumber, index) => (
            <button
              key={index}
              onClick={() => paginate(pageNumber)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${currentPage === pageNumber ? 'bg-blue-600 text-white' : 'text-gray-900 hover:bg-gray-50'}`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Listado;

