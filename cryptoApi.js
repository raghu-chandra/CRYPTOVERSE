import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const cryptoApiHeaders={
    'x-rapidapi-key': '1ee70c29b0msh84625bfb960b42fp1e07dcjsn47bed956fed7',
      'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
}
  const baseUrl='https://coinranking1.p.rapidapi.com';
  const createRequest =(url)=>({url,headers:cryptoApiHeaders});
  export const cryptoApi=createApi({
    reducerPath:'cryptoApi',
    baseQuery:fetchBaseQuery({baseUrl}),
      endpoints:(builder)=>({
           getCryptos: builder.query({
              query:(count)=>createRequest(`/coins?limit=${count}`),
           }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) => 
        createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
    })
  })
});

export const { 
  useGetCryptosQuery,
  useGetExchangesQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery
} = cryptoApi;
