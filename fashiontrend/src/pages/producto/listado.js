import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default async function Listado() {

    const res = await fetch('http://localhost:3000/api/products');
    const data = await res.json();
    const read_data = JSON.stringify(data);

    console.log(data.get(0));
    

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Talla</th>
                        <th>Color</th>
                        <th>Categoria</th>
                        <th>Tipo</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    for(){

                    }
                </tbody>
            </table>
        </div>

    )

}