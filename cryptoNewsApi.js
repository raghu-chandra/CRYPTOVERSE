import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  'x-rapidapi-key': '1ee70c29b0msh84625bfb960b42fp1e07dcjsn47bed956fed7',
  'x-rapidapi-host': 'crypto-news16.p.rapidapi.com', 
};

const baseUrl = 'https://crypto-news16.p.rapidapi.com'; 

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => createRequest('/news/top/5'),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi; 
