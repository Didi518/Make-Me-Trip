import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../services/appApi';
import axios from '../axios';
import './NouvelArticle.css';

const NouvelArticle = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();

  function handleRemoveImg(imgObj) {
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}`)
      .then((res) => {
        setImgToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description || !price || !category || !images.length) {
      return alert('Merci de remplir tous les champs');
    }
    createProduct({ name, description, price, category, images }).then(
      ({ data }) => {
        if (data.length > 0) {
          setTimeout(() => {
            navigate('/');
          }, 1500);
        }
      }
    );
  }

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dyorb9ngw',
        uploadPreset: 'jluwuira',
      },
      (error, result) => {
        if (!error && result.event === 'success') {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }

  return (
    <Container>
      <Row>
        <Col md={6} className='new-product__form--container'>
          <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <h1 className='mt-4'>Ajouter un Article</h1>
            {isSuccess && <Alert variant='success'>Article ajouté</Alert>}
            {isError && <Alert variant='danger'>{error.data}</Alert>}
            <Form.Group className='mb-3'>
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type='text'
                placeholder="Nom de l'article"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                placeholder="Description de l'article"
                style={{ height: '100px' }}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Prix (€)</Form.Label>
              <Form.Control
                type='number'
                placeholder="Prix de l'article (€)"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className='mb-3'
              onChange={(e) => setCategory(e.target.value)}
            >
              <Form.Label>Catégorie</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Choisir une Catégorie --
                </option>
                <option value='sejour'>Séjour</option>
                <option value='vol'>Vol</option>
                <option value='loisir'>Loisir</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Button type='button' onClick={showWidget}>
                Charger des Images
              </Button>
              <div className='images-preview-container'>
                {images.map((image) => (
                  <div className='image-preview'>
                    <img src={image.url} alt={image.public_id} />
                    {/* ajout d'une icone de suppression de l'image */}
                    {imgToRemove !== image.public_id && (
                      <i
                        className='fa fa-times-circle'
                        onClick={() => handleRemoveImg(image)}
                      ></i>
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>
            <Form.Group>
              <Button type='submit' disabled={isLoading || isSuccess}>
                Ajouter
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className='new-product__image--container'></Col>
      </Row>
    </Container>
  );
};

export default NouvelArticle;
