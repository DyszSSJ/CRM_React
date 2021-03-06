import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";
import Spinner from "../components/Spinner";

const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setCargando(!cargando);
      }, 200);
    };
    obtenerClienteAPI();
  }, []);
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-4 text-lg">
        Utiliza este formulario para editar datos de un cliente
      </p>
        { cliente?.nombre ? (
            <Formulario
              cargando={cargando}
              cliente={cliente}
            />
          ) : (
            <p className="font-bold mt-10 text-2xl text-center">El ID del Cliente no es válido</p>
          )
        }

    </>
  );
};

export default EditarCliente;
