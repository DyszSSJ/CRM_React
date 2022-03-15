import { useNavigate } from "react-router-dom";

const Cliente = ({ cliente, handleEliminar }) => {
  const { nombre, empresa, email, telefono, notas, id } = cliente;
  const navigate = useNavigate();

  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="p-3">{nombre}</td>
      <td className="p-3">
        <p>
          <span className="text-gray-800 uppercase font-bold">E-mail: </span>
          {email}
        </p>
        <p>
          <span className="text-gray-800 uppercase font-bold">Tel: </span>
          {telefono}
        </p>
      </td>
      <td className="p-3">{empresa}</td>
      <td className="p-3">
        <button
          onClick={() => navigate(`/clientes/${id}`)}
          type="button"
          className="bg-orange-500 hover:bg-orange-700 block w-full text-white p-2 uppercase font-bold text-xs"
        >
          Ver
        </button>

        <button
          onClick={() => navigate(`/clientes/editar/${id}`)}
          type="button"
          className="bg-blue-500 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3"
        >
          Editar
        </button>

        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3"
          onClick={() => handleEliminar(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
