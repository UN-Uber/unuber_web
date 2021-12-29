import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";

export const clientAuth = new ApolloClient({
    uri: "https://general-api-f6ljpbkkwa-uc.a.run.app/auth",
    cache: new InMemoryCache()
});

export const client = new ApolloClient({
    uri: "https://general-api-f6ljpbkkwa-uc.a.run.app/",
    cache: new InMemoryCache()
});



