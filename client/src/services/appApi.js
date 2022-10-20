import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// création de l'API
export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
  endpoints: (builder) => ({
    // inscription user
    signup: builder.mutation({
      query: (user) => ({
        url: '/utilisateurs/inscription',
        method: 'POST',
        body: user,
      }),
    }),
    // connexion user
    login: builder.mutation({
      query: (user) => ({
        url: '/utilisateurs/connexion',
        method: 'POST',
        body: user,
      }),
    }),
    // création de nouvel article en vente
    createProduct: builder.mutation({
      query: (product) => ({
        url: '/articles',
        body: product,
        method: 'POST',
      }),
    }),
    // supprimer un article du site
    deleteProduct: builder.mutation({
      query: ({ product_id, user_id }) => ({
        url: `/articles/${product_id}`,
        body: {
          user_id,
        },
        method: 'DELETE',
      }),
    }),
    // modifier un article
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/articles/${product.id}`,
        body: product,
        method: 'PATCH',
      }),
    }),
    // ajouter aux réservations
    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: '/articles/ajouter-reservations',
        body: cartInfo,
        method: 'POST',
      }),
    }),
    // supprimer des réservations
    removeFromCart: builder.mutation({
      query: (body) => ({
        url: '/articles/supprimer-reservations',
        body,
        method: 'POST',
      }),
    }),
    // augmenter la quantité des articles réservés
    increaseCartProduct: builder.mutation({
      query: (body) => ({
        url: '/articles/augmenter-reservations',
        body,
        method: 'POST',
      }),
    }),
    // diminuer la quantité des articles réservés
    decreaseCartProduct: builder.mutation({
      query: (body) => ({
        url: '/articles/diminuer-reservations',
        body,
        method: 'POST',
      }),
    }),
    // création d'une commande
    createOrder: builder.mutation({
      query: (body) => ({
        url: '/commandes',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useCreateProductMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useCreateOrderMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = appApi;

export default appApi;
