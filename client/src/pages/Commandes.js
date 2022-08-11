import axios from '../axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Commandes.css';
import { Badge, Container, Table } from 'react-bootstrap';
import Loading from '../components/Loading';

function Commandes() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderToShow, setOrderToShow] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/utilisateurs/${user._id}/commandes`)
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h1 className='text-center pt-3'>Aucun voyage dans l'historique</h1>;
  }

  return (
    <Container>
      <h1 className='text-center'>Vos voyages</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Nom du voyageur</th>
            <th>Statut</th>
            <th>Date</th>
            <th>Total</th>
            <th>Numéro de réservation</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td>{order.fullName}</td>
              <td>
                <Badge
                  bg={`${order.status === 'en cours' ? 'warning' : 'success'}`}
                  text='white'
                >
                  {order.status}
                </Badge>
              </td>
              <td>{order.date}</td>
              <td>{order.total}€</td>
              <td>{order._id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Commandes;
