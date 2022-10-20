import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDeleteProductMutation } from '../services/appApi';
import './AdminProducts.css';

function AdminProducts() {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);

  // supprimer un produit du site

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  function handleDeleteProduct(id) {
    // logique ici
    if (window.confirm('Êtes-vous sur de vous ?'))
      deleteProduct({ product_id: id, user_id: user._id });
  }

  return (
    <Table bordered striped hover responsive>
      <thead>
        <tr>
          <th>Image</th>
          <th>ID de l'article</th>
          <th>Nom de l'article</th>
          <th>Prix de l'article</th>
          <th className='buttons'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.name}>
            <td>
              <img
                src={product.pictures[0].url}
                alt={product.name}
                className='dashboard-product-preview'
              />
            </td>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.price}€</td>
            <td>
              <Button
                className='btn btn-danger'
                onClick={() => handleDeleteProduct(product._id, user._id)}
                disabled={isLoading}
              >
                Supprimer
              </Button>
              <Link
                to={`/article/${product._id}/edit`}
                className='btn btn-warning'
                disabled={isLoading}
              >
                Modifier
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default AdminProducts;
