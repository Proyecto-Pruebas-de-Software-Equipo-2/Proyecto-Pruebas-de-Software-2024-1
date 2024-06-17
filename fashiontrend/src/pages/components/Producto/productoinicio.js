import Link from "next/link";
import Image from "next/image";

const ProductoInicio = ({ _id, nombre, precio, color }) => {
  return (
    <Link href={{ pathname: "/producto/[id]/detalle", query: { id: _id } }} passHref>
      <div className="group relative border rounded-lg overflow-hidden shadow-lg transform transition-transform duration-200 hover:scale-105 cursor-pointer">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <Image
            src="/images/640.webp"
            width={220}
            height={220}
            alt={nombre}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between p-4">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href="#">
                <span aria-hidden="true" className="absolute inset-0"></span>
                {nombre}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{color}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">${precio}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductoInicio;

