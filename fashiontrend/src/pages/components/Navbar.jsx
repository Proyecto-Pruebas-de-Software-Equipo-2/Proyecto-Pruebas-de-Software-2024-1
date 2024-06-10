import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";


const Navbar = () => {

    const [nombre, setNombre] = useState("");
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Hardcoded categories
    const categories2 = [
        'Men',
        'Women',
        'Kids',
        'Accessories',
        'Shoes',
        'Sales',
        'faldas'
        
        // Add more categories as needed
      ];

    const handleCategorySelect = (category) => {
        if (category) {
          router.push(`/categoria/${category}`);
        } else {
          router.push('/');
        }
      };

    const handleSubmit = async(e) =>{
      e.preventDefault();
      console.log(nombre);
      router.push({pathname:'/producto/buscar',query:{nombre: nombre}});
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
      };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link className="text-white text-lg font-bold px-2" href={{ pathname: "/" }}>
            Fashion Trend
          </Link>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-white px-2 focus:outline-none"
            >
              Menú
            </button>
            {dropdownOpen && (
              <ul className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                {categories2.map((categoria) => (
                  <li key={categoria}>
                    <button
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                      onClick={() => {
                        handleCategorySelect(categoria);
                        setDropdownOpen(false);
                      }}
                    >
                      {categoria}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex px-4">
            <input
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              className="bg-gray-50 border w-96 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Buscar producto"
            />
          </form>
          <Link className="text-white px-2" href={{ pathname: "/producto/listado" }}>
            Listado
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-[#a6c1ee] text-white px-3 py-1 rounded-full hover:bg-[#87acec]">
            Iniciar Sesión
          </button>
          <button className="bg-[#a6c1ee] text-white px-3 py-1 rounded-full hover:bg-[#87acec]">
            Registrarse
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



