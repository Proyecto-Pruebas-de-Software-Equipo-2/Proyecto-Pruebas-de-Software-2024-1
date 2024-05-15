import { useRouter } from "next/router";
export default function Eliminar(){

    const router = useRouter()
    const id = router.query.id
    const pathname = "http://localhost:3000/api/products/" + id
    async function handleDelete () {
        
        try {
            const res = await fetch(pathname,{
                method: "DELETE",
            });
            if (res.ok){
                router.push('/producto/listado');
            } else {
                throw new Error('Falló la creación de producto')
            }
        } catch (error){
            console.log(error);
        }
    };

    handleDelete()
}