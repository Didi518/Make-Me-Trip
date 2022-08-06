import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../services/appApi';
import './Inscription.css';

function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isError, isLoading, error }] = useLoginMutation();

  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <Container>
      <Row>
        <Col md={6} className='login__form--container'>
          <Form style={{ width: '100%' }} onSubmit={handleLogin}>
            <h1>Connexion</h1>
            {isError && <Alert variant='danger'>{error.data}</Alert>}
            <Form.Group>
              <Form.Label>Adresse E-mail</Form.Label>
              <Form.Control
                type='email'
                placeholder='Votre E-mail'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type='password'
                placeholder='Votre mot de passe'
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Button type='submit' disabled={isLoading}>
                Connexion
              </Button>
            </Form.Group>
            <p>
              Pas encore inscrit ?{' '}
              <Link to='/inscription'>Créez votre compte</Link>
            </p>
          </Form>
        </Col>
        <Col md={6} className='login__image--container'></Col>
      </Row>
    </Container>
  );
}

export default Connexion;
