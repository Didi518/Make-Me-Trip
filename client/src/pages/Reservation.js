import React from 'react';
import { Alert, Col, Container, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './Reservation.css';

function Reservation() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;
  let cart = products.filter((product) => userCartObj[product._id] != null);

  return (
    <Container style={{ minHeight: '95vh' }} className='cart-container'>
      <Row>
        <Col md={7}>
          <h1 className='pt-2 h3'>Mes Réservations</h1>
          {cart.length === 0 ? (
            <Alert variant='info'>
              Aucune réservation en cours. Recherchez votre future destination.
            </Alert>
          ) : (
            <div></div>
          )}
        </Col>
        <Col md={5}>
          {cart.length > 0 && (
            <>
              <Table responsive='sm' className='cart-table'>
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Voyage</th>
                    <th>Prix</th>
                    <th>Passagers</th>
                    <th>Sous-total</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Affichage des réservations */}
                  {cart.map((item) => (
                    <tr>
                      <td>&nbsp;</td>
                      <td>
                        <i
                          className='fa fa-times'
                          style={{
                            marginRight: 10,
                            cursor: 'pointer',
                          }}
                        ></i>
                        <img
                          alt={item.pictures}
                          src={item.pictures[0].url}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: 'cover',
                          }}
                        />
                        {item.name}
                      </td>
                      <td>{item.price}€</td>
                      <td>
                        <span className='quantity-indicator'>
                          <i className='fa fa-minus-circle'></i>
                          <span>{user.cart[item._id]}</span>
                          <i className='fa fa-plus-circle'></i>
                        </span>
                      </td>
                      <td>{item.price * user.cart[item._id]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>
                <h3 className='h4 pt-4'>Total : {user.cart.total}€</h3>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Reservation;
