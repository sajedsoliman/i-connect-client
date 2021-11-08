import Homepage from "../pages/Homepage";

const routes = [
	{
		path: "/",
		component: Homepage,
	},
];

export const ApiAuthEndpoint = "http://localhost:3001/auth";
export const GraphqlEndpoint = "http://localhost:3001/graphql";
