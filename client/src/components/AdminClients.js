import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from '../axios';
import Loading from './Loading';

function ClientsAdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('/utilisateurs')
      .then(({ data }) => {
        setLoading(false);
        setUsers(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  if (loading) return <Loading />;
  if (users?.length == 0)
    return (
      <h2 className='py-2 text-center'>Aucun utilisateur pour le moment</h2>
    );

  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>ID du client</th>
          <th>Nom du client</th>
          <th>E-mail</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.email}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ClientsAdminPage;
