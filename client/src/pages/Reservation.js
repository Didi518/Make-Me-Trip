import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { Alert, Col, Container, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CheckoutForm from '../components/CheckoutForm';
import {
  useDecreaseCartProductMutation,
  useIncreaseCartProductMutation,
  useRemoveFromCartMutation,
} from '../services/appApi';
import './Reservation.css';

const stripePromise = loadStripe(
  'pk_test_51LHDsbKXldPn3Cphk2aEaRLOiwKPfOhV2a19TLN3gqFgSbbtGvT09VPjPmDAp66YUYuONXVLeBUWdYL7HFbimWw600MwgkRDei'
);

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
    if (quantity <= 1) return alert('Opération impossible');
    decreaseCart(product);
  }

  return (
    <Container style={{ minHeight: '95vh' }} className='cart-container'>
      <Row>
        <Col md={7}>
          <h1 className='pt-2 h3'>Vos coordonnées</h1>
          {cart.length === 0 ? (
            <Alert variant='info'>
              Aucune réservation en cours. Recherchez votre future destination.
            </Alert>
          ) : (
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </Col>
        <Col md={5}>
          {cart.length > 0 && (
            <>
              <Table responsive='sm' className='cart-table' key={cart.total}>
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
                    <tr key={item.name}>
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
                          className='item-tile'
                          style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.pictures[0].url})`,
                          }}
                        >
                          {item.name}
                        </div>
                      </td>
                      <td className='details'>{item.price}€</td>
                      <td className='details'>
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
                      <td className='details'>
                        {item.price * user.cart[item._id]}
                      </td>
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
