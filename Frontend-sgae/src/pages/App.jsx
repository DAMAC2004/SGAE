import { useState } from 'react'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import BarNav from '../components/BarNav';
import MVV from '../components/MVV';
import Contacto from '../components/Conctacto';
import { InfoInscripcion } from '../components/inscripcionInfo';


import img1 from "../assets/escuela.png";
import img2 from "../assets/LogoSec.png";
import img3 from "../assets/aula1.png";
import img4 from "../assets/cancha.png";
import img5 from "../assets/cancha2.png";
import img6 from "../assets/auditorio.png"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <BarNav></BarNav>
      <div className="flex justify-center items-center h-1/2 bg-gray-200 m-10 rounded-2xl">
        <Carousel images={[img1, img2, img3, img4, img5, img6]} interval={4000} />
      </div>
      <p className='text-blue-500 font-bold text-3xl text-center mt-5'>Acerca de la escuela</p>
      <MVV></MVV>
      <InfoInscripcion/>
      <Contacto></Contacto>
    </>
  )
}

export default App
