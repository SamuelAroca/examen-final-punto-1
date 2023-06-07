import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProgressBar, Table } from "react-bootstrap";

const TablePagination = () => {
  const [empleados, setEmpleados] = useState([]);

  const url = "http://89.116.25.43:3500/api/empleados/listar";

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

  return (
    <>
      <h1>Tabla de Empleados</h1>
      <Table striped bordered hover>
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
          {empleados?.map((item, index) => {
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
    </>
  );
};

export default TablePagination;
