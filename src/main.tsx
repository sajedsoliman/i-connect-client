import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";

import theme from "./styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

// apollo
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	HttpLink,
} from "@apollo/client";

const httpLink = new HttpLink({
	uri: "http://localhost:3001/graphql",
	credentials: "include",
});
const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				// getPost(_, { args, toReference }) {
				// 	return toReference({
				// 		__typename: "Post",
				// 		id: args?.id,
				// 	});
				// },
				postList: {
					// keyArgs: false, // because read and merge function are both defined, this field is defaulted to false
					merge(existing = [], incoming: any[], { args }) {
						const pageNumber = args?.pageNumber || 1;
						const limit = args?.limit || 1;
						const offset = (pageNumber - 1) * limit;
						const merged = existing ? existing.slice(0) : [];
						incoming.forEach((item, i) => {
							merged[offset + i] = item;
						});
						return merged;
					},
					read(existing, { args }) {
						const pageNumber = args?.pageNumber || 1;
						const limit = args?.limit || 1;
						const offset = (pageNumber - 1) * limit;
						return existing && existing.slice(offset, offset + limit);
					},
				},
			},
		},
	},
});
const client = new ApolloClient({
	link: httpLink,
	uri: "http://localhost:3001/graphql",
	cache,
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<ApolloProvider client={client}>
					<App />
				</ApolloProvider>
			</Router>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
