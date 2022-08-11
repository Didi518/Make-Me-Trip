import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Inscription.css';
import { useSignupMutation } from '../services/appApi';

function Inscription() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [signup, { error, isLoading, isError }] = useSignupMutation();

  function handleSignup(e) {
    e.preventDefault();
    signup({ name, email, password });
  }

  return (
    <Container>
      <Row>
        <Col md={6} className='signup__form--container'>
          <Form style={{ width: '100%' }} onSubmit={handleSignup}>
            <h1>Inscription</h1>
            {isError && <Alert variant='danger'>{error.data}</Alert>}
            <Form.Group>
              <Form.Label>Pseudo</Form.Label>
              <Form.Control
                type='text'
                placeholder='Votre Pseudonyme'
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
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
              <Form.Label>Mot de Passe</Form.Label>
              <Form.Control
                type='password'
                placeholder='Votre mot de passe'
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group>
              <Form.Label>Confirmer le mot de passe</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirmer le mot de passe'
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group> */}
            <Form.Group>
              <Button
                type='submit'
                style={{ margin: '15px' }}
                disabled={isLoading}
              >
                Inscription
              </Button>
            </Form.Group>
            <p>
              Déjà inscrit ? <Link to='/connexion'>Connectez-vous</Link>
            </p>
            <label>
              <input type='checkbox' name='checkbox' value='value' required />{' '}
              En vous inscrivant, vous acceptez les règles de confidentialité.
            </label>
          </Form>
        </Col>
        <Col md={6} className='signup__image--container'></Col>
      </Row>
    </Container>
  );
}

export default Inscription;
