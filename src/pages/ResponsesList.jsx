// src/pages/ResponsesList.jsx
import React, { useEffect, useState } from 'react';
import { getResponses } from '../services/api';
import { formatDate24 } from '../utils/formatDate';

export default function ResponsesList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getResponses()
      .then(setData)
      .catch(err => {
        console.error('❌ No se pudieron cargar las respuestas:', err);
      });
  }, []);

  return (
    <div className="container py-5">
      <h2>Respuestas recibidas</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Visitor ID</th>
            <th>Cotizar</th>
            <th>Publicar</th>
            <th>Oportunidades</th>
            <th>Creado</th>
            <th>Última actualización</th>
          </tr>
        </thead>
        <tbody>
          {data.map(r => (
            <tr key={r._id}>
              <td>{r.visitorId}</td>
              <td>{r.buttonCounts.cotizar}</td>
              <td>{r.buttonCounts.publicar}</td>
              <td>{r.buttonCounts.oportunidades}</td>
              <td>{formatDate24(r.createdAt)}</td>
              <td>{formatDate24(r.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
