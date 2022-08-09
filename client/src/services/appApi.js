import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// création de l'API
export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: '/utilisateurs/inscription',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: '/utilisateurs/connexion',
        method: 'POST',
        body: user,
      }),
    }),
    // création de produit
    createProduct: builder.mutation({
      query: (product) => ({
        url: '/articles',
        body: product,
        method: 'POST',
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
        method: 'DELETE',
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
} = appApi;

export default appApi;
