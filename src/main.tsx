import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Views/App/App";
import { client } from "./graphql/server";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.render(
	<React.StrictMode>
        <ApolloProvider client={client}>
        <Provider store={store}>
		    <App />
        </Provider>
        </ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
