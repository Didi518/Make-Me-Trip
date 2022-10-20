import React from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../features/userSlice';
import './Navigation.css';

function Navigation() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Navbar bg='light' expand='lg' className='container'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Make Me Trip</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            {/* si non connecté */}
            {!user && (
              <>
                <LinkContainer to='/connexion'>
                  <Nav.Link>Connexion</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/inscription'>
                  <Nav.Link>Inscription</Nav.Link>
                </LinkContainer>
              </>
            )}
            {user && !user.isAdmin && (
              <LinkContainer to='/reservation'>
                <Nav.Link>
                  <i className='fa-regular fa-paper-plane'></i>
                  {user?.cart.count > 0 && (
                    <span className='badge badge-warning' id='cartcount'>
                      {user.cart.count}
                    </span>
                  )}
                </Nav.Link>
              </LinkContainer>
            )}
            {/* si connecté */}
            {user && (
              <NavDropdown title={`${user.name}`} id='basic-nav-dropdown'>
                {user.isAdmin && (
                  <>
                    <LinkContainer to='/admin'>
                      <NavDropdown.Item>Administration</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/nouvel-article'>
                      <NavDropdown.Item>Ajout d'Articles</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}
                {!user.isAdmin && (
                  <>
                    <LinkContainer to='/reservation'>
                      <NavDropdown.Item>Mon Panier</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/commandes'>
                      <NavDropdown.Item>Mes Réservations</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}
                <NavDropdown.Divider />
                <Button
                  variant='danger'
                  onClick={handleLogout}
                  className='logout-btn'
                >
                  Déconnexion
                </Button>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
