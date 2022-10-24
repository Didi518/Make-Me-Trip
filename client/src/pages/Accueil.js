import axios from '../axios';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import categories from '../categories';
import './Accueil.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateProducts } from '../features/productSlice';
import ProductPreview from '../components/ProductPreview';

function Accueil() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 9);

  useEffect(() => {
    axios.get('/articles').then(({ data }) => dispatch(updateProducts(data)));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <img
        className='home-banner'
        src='https://zupimages.net/up/22/42/geiz.png'
        alt='Make Me Trip'
      />
      <div className='featured-products-container container mt-4'>
        <h2>Dernières offres</h2>
        {/* dernières offres ici */}
        <div className='d-flex justify-content-center flex-wrap'>
          {lastProducts.map((product) => (
            <ProductPreview key={product._id} {...product} />
          ))}
        </div>
        <div>
          <Link
            to='/categorie/tout'
            style={{
              textAlign: 'right',
              display: 'block',
              textDecoration: 'none',
            }}
          >
            En voir plus {'>>'}
          </Link>
        </div>
      </div>
      {/* Bannière promo */}
      <div className='sale__banner--container mt-4'>
        <img src='https://zupimages.net/up/22/42/dk6n.png' alt='Make Me Trip' />
      </div>
      <div className='recent-products-container container mt-4'>
        <h2>Catégories</h2>
        <Row>
          {categories.map((category) => (
            <LinkContainer
              to={`/categorie/${category.name.toLocaleLowerCase()}`}
              key={category.name}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                    gap: '10px',
                  }}
                  className='category-tile'
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
      <span className='copyrights'>
        &copy;Kevin 2022. Tous droits réservés.
      </span>
    </div>
  );
}

export default Accueil;
