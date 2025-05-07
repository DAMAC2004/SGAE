import React, { useState, useEffect } from "react";
import img1 from "../assets/user.svg";
import { useNavigate } from "react-router-dom";


export default function Login({ usuario, mensajeProteccion }) {
  const [username, setUsername] = useState("");
  const [psw, setPsw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Verifica si ya hay sesión iniciada
  useEffect(() => {
    const tipo_user = localStorage.getItem("tipo_user");
    if (tipo_user) {
      setTimeout(() => {
        switch (tipo_user) {
          case "alumno":
            navigate("/panel/alumno");
            break;
          case "admin":
            navigate("/panel/admin");
            break;
          case "maestro":
            navigate("/panel/maestro");
            break;
        }
      }, 200); // Espera 200ms para dejar renderizar el mensaje
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    fetch("http://localhost/SGAE/Backend-sgae/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, psw }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("nombre", data.nombre);
          localStorage.setItem("tipo_user", data.tipo_user);
          localStorage.setItem("grado", data.grado);
          localStorage.setItem("grupo", data.grupo);
          localStorage.setItem("turno", data.turno);
          localStorage.setItem("estatus", data.estatus);
          localStorage.setItem("conducta", data.conducta);


          switch (data.user_type) {
            case "alumno":
              navigate("/panel/alumno");
              break;
            case "admin":
              navigate("/panel/admin");
              break;
            case "maestro":
              navigate("/panel/maestro");
              break;
            default:
              setError("Tipo de usuario desconocido.");
          }
        } else {
          setError(data.message || "Error en el inicio de sesión.");
        }
      })
      .catch(() => setError("Error de conexión con el servidor."));
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-100">
      <header className="w-full h-20 bg-blue-600 flex flex-col justify-center items-center text-white">
        <h1 className="text-2xl font-bold">Inicio de Sesión</h1>
        <h2 className="text-lg">{usuario}</h2>
      </header>

      {mensajeProteccion && (
        <p className="text-red-500 text-center mt-6">{mensajeProteccion}</p>
      )}



      <form onSubmit={handleSubmit} className="flex flex-col p-6 m-auto w-80 bg-blue-600 rounded-lg shadow-lg">
        <img src={img1} className="w-20 h-20 mx-auto mb-4" alt="Logo Usuario" />

        <label className="text-white font-semibold">Usuario</label>
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mt-1 p-2 bg-blue-200 border rounded outline-none focus:ring focus:ring-blue-400"
        />

        <label className="text-white font-semibold mt-4">Contraseña</label>
        <input
          type="password"
          name="psw"
          placeholder="Contraseña"
          value={psw}
          onChange={(e) => setPsw(e.target.value)}
          required
          className="mt-1 p-2 bg-blue-200 border rounded outline-none focus:ring focus:ring-blue-400"
        />

        {error && <p className="text-red-300 mt-2">{error}</p>}

        <button type="submit" className="mt-4 px-4 py-2 bg-white text-blue-600 font-bold rounded hover:bg-blue-200">
          Iniciar Sesión
        </button>
      </form>

      <footer className="w-full h-16 bg-blue-600 flex justify-center items-center text-white mt-auto">
        <h1>by DAMAC_</h1>
      </footer>
    </div>
  );
}
