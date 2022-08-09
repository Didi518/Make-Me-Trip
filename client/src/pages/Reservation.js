import React from 'react';
import { Alert, Col, Container, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
  useDecreaseCartProductMutation,
  useIncreaseCartProductMutation,
  useRemoveFromCartMutation,
} from '../services/appApi';
import './Reservation.css';

function Reservation() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;
  let cart = products.filter((product) => userCartObj[product._id] != null);
  const [increaseCart] = useIncreaseCartProductMutation();
  const [decreaseCart] = useDecreaseCartProductMutation();
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

  function handleDecrease(product) {
    const quantity = user.cart.count;
    if (quantity <= 0) return alert('Opération impossible');
    decreaseCart(product);
  }

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
                        {!isLoading && (
                          <i
                            className='fa fa-times'
                            style={{
                              marginRight: 10,
                              cursor: 'pointer',
                            }}
                            onClick={() =>
                              removeFromCart({
                                productId: item._id,
                                price: item.price,
                                userId: user._id,
                              })
                            }
                          ></i>
                        )}
                        <div
                          style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${item.pictures[0].url}`,
                          }}
                          className='item-tile'
                        >
                          {item.name}
                        </div>
                      </td>
                      <td>{item.price}€</td>
                      <td>
                        <span className='quantity-indicator'>
                          <i
                            className='fa fa-minus-circle'
                            onClick={() =>
                              handleDecrease({
                                productId: item._id,
                                price: item.price,
                                userId: user._id,
                              })
                            }
                          ></i>
                          <span>{user.cart[item._id]}</span>
                          <i
                            className='fa fa-plus-circle'
                            onClick={() =>
                              increaseCart({
                                productId: item._id,
                                price: item.price,
                                userId: user._id,
                              })
                            }
                          ></i>
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
