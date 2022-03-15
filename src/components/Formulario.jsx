import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Alerta from "./Alerta";
import Spinner from './Spinner';

const Formulario = ({cliente, cargando }) => {

  const navigate = useNavigate();

  const nuevoClienteSchema = yup.object().shape({
    nombre: yup
        .string()
        .min(3, "El nombre es muy corto")
        .max(30, "El nombre es muy largo")
        .required("El nombre del cliente es obligatorio"),
    empresa: yup.string()
        .required("El nombre de la empresa es obligatorio"),
    email: yup
        .string()
        .email("email no válido")
        .required("El email es obligatorio"),
    telefono: yup.number()
        .positive('Número no válido')
        .integer('Número no válido')
        .typeError('El número no es válido'),
  });

  const handleSubmit = async (valores) => {
    try {

      let respuesta;
       
      if ( cliente.id ) {
        // Editando Registro
        const url = `http://localhost:4000/clientes/${cliente.id}`;

          respuesta = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(valores),
          headers: {
            'Content-Type': 'application/json'
          }
        }) 
      } else {
        // Nuevo Registro 

        const url = 'http://localhost:4000/clientes';

         respuesta = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(valores),
          headers: {
            'Content-Type': 'application/json'
          }
        }) 
      }

      await respuesta.json();
      navigate('/clientes');

    } catch (error) {
      console.log(error)
    }
  };

  return (
    cargando ? <Spinner/> : (
    <div className="bg-slate-100 mt-10 px-5 py-10 rounded-md shadow-2xl md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        { cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente' } </h1>

      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? '',
          empresa: cliente?.empresa ?? '',
          email: cliente?.email ?? '',
          telefono: cliente?.telefono ?? '',
          notas: cliente?.notas ?? '',
        }}
        enableReinitialize={true}
        onSubmit={async (values, {resetForm}) => {
          await handleSubmit(values);
          resetForm()
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          // console.log(data);
          return (
   
            <Form className="mt-10">
              <div className="mb-4">
                <label htmlFor="nombre">Nombre:</label>
                <Field
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 border-white"
                  placeholder="Nombre del Cliente"
                  name="nombre"
                />

                {errors.nombre && touched.nombre ? (
                  <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase">
                    <Alerta>{errors.nombre}</Alerta>
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="empresa">Empresa:</label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 border-white"
                  placeholder="Empresa del Cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase">
                    <Alerta>{errors.empresa}</Alerta>
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="email">E-mail:</label>
                <Field
                  id="email"
                  type="text"
                  className="mt-2 block w-full p-3 border-white"
                  placeholder="Email del Cliente"
                  name="email"
                />

                {errors.email && touched.email ? (
                  <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase">
                    <Alerta>{errors.email}</Alerta>
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="telefono">Telefono:</label>
                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 border-white"
                  placeholder="Telefono del Cliente"
                  name="telefono"
                />

                {errors.telefono && touched.telefono ? (
                  <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase">
                    <Alerta>{errors.telefono}</Alerta>
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="notas">Notas:</label>
                <Field
                  as="textarea"
                  id="notas"
                  type="text"
                  className="mt-2 block w-full p-3 border-white h-40"
                  placeholder="Notas del Cliente"
                  name="notas"
                />
              </div>

              <input
                type="submit"
                value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg cursor-pointer 
                rounded-xl hover:bg-blue-900"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
    )
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false
}

export default Formulario;
