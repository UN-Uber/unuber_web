import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";

import {createUploadLink} from "apollo-upload-client";

const uploadLink = createUploadLink({
  uri: "https://general-api-f6ljpbkkwa-uc.a.run.app",
});

export const client = new ApolloClient({
    link: uploadLink,
    cache: new InMemoryCache()
});







