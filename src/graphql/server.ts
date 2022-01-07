import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";

import {createUploadLink} from "apollo-upload-client";

const uploadLink = createUploadLink({
  uri: "http://localhost:4000",
});

export const client = new ApolloClient({
    link: uploadLink,
    cache: new InMemoryCache()
});







