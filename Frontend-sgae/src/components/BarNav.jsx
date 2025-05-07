import { NavLink } from "react-router-dom";

export default function BarNav() {
  return (
    <div className="h-17 w-full bg-blue-500 flex items-center justify-center p-2 space-x-4">
      <NavLink to="/Login/AlumnosLog" className="text-white px-4 py-2 bg-blue-700 rounded hover:bg-blue-800">
        SGAE Alumnos
      </NavLink>
      <NavLink to="/Login/MaestrosLog" className="text-white px-4 py-2 bg-blue-700 rounded hover:bg-blue-800">
        SGAE Maestros
      </NavLink>
      <NavLink to="/Login/AdminLog" className="text-white px-4 py-2 bg-blue-700 rounded hover:bg-blue-800">
        SGAE Administradores
      </NavLink>
    </div>
  );
}
