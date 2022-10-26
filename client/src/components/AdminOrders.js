import React, { useEffect, useState } from 'react';
import { Badge, Button, Modal, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from '../axios';
import Loading from './Loading';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products);
  const [orderToShow, setOrderToShow] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  function markShipped(orderId, ownerId) {
    axios
      .patch(`/commandes/${orderId}/valide`, { ownerId })
      .then(({ data }) => {
        setOrders(data).catch((err) => console.log(err.response));
      });
  }
  function showOrder(productsObj) {
    let productsToShow = products.filter((product) => productsObj[product._id]);
    productsToShow = productsToShow.map((product) => {
      const productCopy = { ...product };
      productCopy.count = productsObj[product._id];
      delete productCopy.description;
      return productCopy;
    });
    setShow(true);
    setOrderToShow(productsToShow);
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get('/commandes')
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
    return <h1 className='text-center pt-4'>Aucune commande pour le moment</h1>;
  }

  return (
    <>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Numéro de réservation</th>
            <th>Nom du client</th>
            <th>Items</th>
            <th>Total</th>
            <th>Adresse</th>
            <th>Statut</th>
            <th>Détails</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.fullName}</td>
              <td>{order.count}</td>
              <td>{order.total}</td>
              <td>
                {order.address} {order.zipCode} {order.city}
              </td>
              <td>
                {order.status === 'en cours' ? (
                  <>
                    <Badge bg='warning' text='dark'>
                      En cours
                    </Badge>
                    <Button
                      size='sm'
                      onClick={() => markShipped(order._id, order.owner?._id)}
                      className='btn btn-primary'
                    >
                      Valider
                    </Button>
                  </>
                ) : (
                  <Badge bg='success'>Validée</Badge>
                )}
              </td>
              <td>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => showOrder(order.products)}
                >
                  <i className='fa fa-eye'></i>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Détails</Modal.Title>
        </Modal.Header>
        {orderToShow.map((order) => (
          <div
            key={order._id}
            className='order-details__container d-flex justify-content-around py-2'
          >
            <img
              src={order.pictures[0].url}
              alt={order.name}
              style={{ maxWidth: 100, height: 100, objectFit: 'cover' }}
            />
            <p>
              <span>{order.count} x </span> {order.name}
            </p>
            <p>Prix: {Number(order.price) * order.count}€</p>
          </div>
        ))}
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminOrders;
