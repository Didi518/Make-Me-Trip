import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../services/appApi';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [createOrder, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation();
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [fullName, setFullName] = useState(user.name);
  const [mail, setMail] = useState(user.email);
  const [paying, setPaying] = useState(false);

  async function handlePay(e) {
    e.preventDefault();
    if (!stripe || !elements || user.cart.count <= 0) return;
    setPaying(true);
    const { client_secret } = await fetch(
      'http://localhost:8080/valider-paiement',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ',
        },
        body: JSON.stringify({ amount: user.cart.total * 100 }),
      }
    ).then((res) => res.json());
    const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    setPaying(false);

    if (paymentIntent) {
      createOrder({
        userId: user._id,
        cart: user.cart,
        fullName,
        mail,
        address,
        zipCode,
        country,
      }).then((res) => {
        if (!isLoading && !isError) {
          setAlertMessage(`Paiement ${paymentIntent.status}`);
          setTimeout(() => {
            navigate('/commandes');
          }, 3000);
        }
      });
    }
  }

  return (
    <Col md={7} className='cart-payment-container'>
      <Form onSubmit={handlePay}>
        <Row>
          {alertMessage && <Alert>{alertMessage}</Alert>}
          <Col md={5}>
            <Form.Group className='mb-3'>
              <Form.Label>Nom complet</Form.Label>
              <Form.Control
                onChange={(e) => setFullName(e.target.value)}
                type='text'
                placeholder='Nom complet'
                value={fullName}
                required
              />
            </Form.Group>
          </Col>
          <Col md={7}>
            <Form.Group className='mb-3'>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                onChange={(e) => setMail(e.target.value)}
                type='email'
                placeholder='E-mail'
                value={mail}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={7}>
            <Form.Group className='mb-3'>
              <Form.Label>Adresse</Form.Label>
              <Form.Control
                onChange={(e) => setAddress(e.target.value)}
                type='text'
                placeholder='Adresse'
                value={address}
                required
              />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group className='mb-3'>
              <Form.Label>Code postal</Form.Label>
              <Form.Control
                onChange={(e) => setZipCode(e.target.value)}
                type='text'
                placeholder='Code postal'
                value={zipCode}
                required
              />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group className='mb-3'>
              <Form.Label>Ville</Form.Label>
              <Form.Control
                onChange={(e) => setCity(e.target.value)}
                type='text'
                placeholder='Ville'
                value={city}
                required
              />
            </Form.Group>
          </Col>
          <Col md={7}>
            <Form.Group className='mb-3'>
              <Form.Label>Pays</Form.Label>
              <Form.Control
                onChange={(e) => setCountry(e.target.value)}
                type='text'
                placeholder='Pays'
                value={country}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <label htmlFor='card-element'>Carte</label>
        <CardElement id='card-element' />
        <Button
          className='mt-3'
          type='submit'
          disabled={user.cart.count === 0 || paying || isSuccess}
        >
          {paying ? 'En cours...' : 'Validée'}
        </Button>
      </Form>
    </Col>
  );
};

export default CheckoutForm;
