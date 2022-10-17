import axios from '../axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import SimilarProduct from '../components/SimilarProduct';
import './Article.css';
import { LinkContainer } from 'react-router-bootstrap';
import { useAddToCartMutation } from '../services/appApi';
import ToastMessage from '../components/ToastMessage';

function Article() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [addToCart, { isSuccess }] = useAddToCartMutation();

  const handleDragStart = (e) => e.preventDefault();

  useEffect(() => {
    axios.get(`/articles/${id}`).then(({ data }) => {
      setProduct(data.product);
      setSimilar(data.similar);
    });
  }, [id]);

  if (!product) {
    return <Loading />;
  }

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const images = product.pictures.map((picture) => (
    <img
      className='product__carousel--image'
      src={picture.url}
      alt={product.name}
      onDragStart={handleDragStart}
    />
  ));

  let similarProducts = [];
  if (similar) {
    similarProducts = similar.map((product, idx) => (
      <div className='item' data-value={idx}>
        <SimilarProduct {...product} />
      </div>
    ));
  }

  return (
    <Container className='pt-4' style={{ position: 'relative' }}>
      <Row>
        <Col lg={6} className='pt-4'>
          <AliceCarousel
            mouseTracking
            items={images}
            controlsStrategy='alternate'
            autoPlay={true}
            alternate
            autoPlayInterval={5000}
            infinite
          />
        </Col>
        <Col lg={6} className='pt-4'>
          <h1>{product.name}</h1>
          <p>
            <Badge bg='primary'>{product.category}</Badge>
          </p>
          <p className='product__price'>{product.price}€</p>
          <p style={{ textAlign: 'justify' }} className='py-3'>
            <strong>Description : </strong> {product.description}
          </p>
          {user && !user.isAdmin && (
            <ButtonGroup style={{ width: '90%' }}>
              <Form.Select
                size='lg'
                style={{ width: '40%', borderRadius: '0' }}
              >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </Form.Select>
              <Button
                size='lg'
                onClick={() =>
                  addToCart({
                    userId: user._id,
                    productId: id,
                    price: product.price,
                    image: product.pictures[0].url,
                  })
                }
              >
                Réserver
              </Button>
            </ButtonGroup>
          )}
          {user && user.isAdmin && (
            <LinkContainer to={`/article/${product._id}/edit`}>
              <Button size='lg'>Éditer l'article</Button>
            </LinkContainer>
          )}
          {isSuccess && (
            <ToastMessage
              bg='info'
              title='Ajouté aux réservations'
              body={`${product.name} est bien réservé`}
            />
          )}
        </Col>
      </Row>
      <div className='my-4'>
        <h2>Vous aimerez aussi : </h2>
        <div className='d-flex justify-content-center align-items-center flex-wrap'>
          <AliceCarousel
            mouseTracking
            items={similarProducts}
            responsive={responsive}
            controlsStrategy='alternate'
          />
        </div>
      </div>
    </Container>
  );
}

export default Article;
