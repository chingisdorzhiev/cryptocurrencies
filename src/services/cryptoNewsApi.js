import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const cryptoNewsHeaders = {
//     'X-BingApis-SDK': 'true',
//     'X-RapidAPI-Key': 'bda1d941d7mshe053fa3a9799407p187696jsn939b59a6979d',
//     'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
//     'Ocp-Apim-Subscription-Key': 'bda1d941d7mshe053fa3a9799407p187696jsn939b59a6979d',
// };

// const baseUrl = 'https://api.bing.microsoft.com';

const cryptoNewsHeaders = {
    'X-RapidAPI-Key': 'bda1d941d7mshe053fa3a9799407p187696jsn939b59a6979d',
    'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
};

const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            // query: ({newsCategory, count}) => createRequest(`?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
            query: () => createRequest('/v1/coindesk')
        })
    })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
