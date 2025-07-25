// src/pages/ResponsesList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDate24 } from '../utils/formatDate';

export default function ResponsesList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/responses')
      .then(res => setData(res.data))
      .catch(console.error);
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
          {data.map(r => {
            console.log('raw:', r.createdAt, 'formatted:', formatDate24(r.createdAt));
            return (
              <tr key={r._id}>
                <td>{r.visitorId}</td>
                <td>{r.buttonCounts.cotizar}</td>
                <td>{r.buttonCounts.publicar}</td>
                <td>{r.buttonCounts.oportunidades}</td>
                <td>{formatDate24(r.createdAt)}</td>
                <td>{formatDate24(r.updatedAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
