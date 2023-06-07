import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination, ProgressBar, Table } from "react-bootstrap";

const TablePagination = () => {
  const [empleados, setEmpleados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const empleadosPorPagina = 10;

  /* const url = import.meta.env.VITE_API_URL; */
  const url = "http://89.116.25.43:3500/api/empleados/listar"

  const getApi = async () => {
    const response = await axios.get(url);
    setEmpleados(response.data.result);
    console.log(response);
  };

  useEffect(() => {
    getApi();
  }, []);

  const getColor = (estado) => {
    return estado ? "green" : "red";
  };

  const indexOfLastEmpleado = paginaActual * empleadosPorPagina;
  const indexOfFirstEmpleado = indexOfLastEmpleado - empleadosPorPagina;
  const currentEmpleados = empleados.slice(
    indexOfFirstEmpleado,
    indexOfLastEmpleado
  );

  const handlePageChange = (pageNumber) => {
    setPaginaActual(pageNumber);
  };

  const totalPages = Math.ceil(empleados.length / empleadosPorPagina);

  return (
    <>
      <h1>Tabla de Empleados</h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Identificacion</th>
            <th>Nombres</th>
            <th>Fecha de nacimiento</th>
            <th>Tiempo Contrato</th>
            <th>Valor Contrato</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {currentEmpleados?.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.identificacion}</td>
                <td>{item.nombres}</td>
                <td>{item.fecha_nacimiento}</td>
                <td>
                  <ProgressBar
                    now={item.tiempo_contrato}
                    label={`${item.tiempo_contrato}%`}
                  />
                </td>
                <td>{item.valor_contrato}</td>
                <td style={{ color: getColor(item.estado) }}>
                  {item.estado ? "Activo" : "Inactivo"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(paginaActual - 1)}
          disabled={paginaActual === 1}
        />
        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === paginaActual}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(paginaActual + 1)}
          disabled={paginaActual === totalPages}
        />
      </Pagination>
    </>
  );
};

export default TablePagination;
