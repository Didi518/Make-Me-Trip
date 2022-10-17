import axios from '../axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Commandes.css';
import { Badge, Container, Table } from 'react-bootstrap';
import Loading from '../components/Loading';
import moment from 'moment';
import 'moment/locale/fr';

function Commandes() {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

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
  }, [user._id]);

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
            <th>Date de l'achat</th>
            <th>Du</th>
            <th>Au</th>
            <th>Total</th>
            <th>Numéro de réservation</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
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
              <td>
                {moment(order.dates[0].startDate).locale('fr').format('L')}
              </td>
              <td>{moment(order.dates[0].endDate).locale('fr').format('L')}</td>
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
