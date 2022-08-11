import React from 'react';
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import axios from '../axios';
import AdminProducts from '../components/AdminProducts';
import './Admin.css';

function Admin() {
  return (
    <Container>
      <Tab.Container defaultActiveKey='products'>
        <Row>
          <Col sm={3}>
            <Nav variant='pills' className='flex-column'>
              <Nav.Item>
                <Nav.Link eventKey='products'>Articles</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='orders'>Commandes</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='clients'>Clients</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content eventKey="products">
                <AdminProducts />
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default Admin;
