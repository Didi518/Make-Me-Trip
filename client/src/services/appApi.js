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
  }),
});

export const { useSignupMutation, useLoginMutation, useCreateProductMutation } =
  appApi;

export default appApi;
