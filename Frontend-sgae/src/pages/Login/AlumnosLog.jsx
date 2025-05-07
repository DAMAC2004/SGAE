import { useLocation } from "react-router-dom";
import Login from '../../components/Login';

export default function AlumnosLog() {
  const location = useLocation();
  const mensajeProteccion = location.state?.message;

  return (
    <>
      <Login usuario={"Alumnos"} mensajeProteccion={mensajeProteccion} />
    </>
  );
}
