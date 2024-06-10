import "@/styles/globals.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import Navbar from '@/pages/components/Navbar';


export default function App({ Component, pageProps }) {
  const [nombre, setNombre] = useState("");
  const router = useRouter();

  return(
    <div className="">
   
      <ToastContainer />
      <Navbar/>
      <Component {...pageProps} />
    </div>
    
  );


}
