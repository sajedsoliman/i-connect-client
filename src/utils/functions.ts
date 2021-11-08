const dateRegex = new RegExp("^\\d\\d\\d\\d-\\d\\d-\\d\\d");

function jsonDateReviver(key: string, value: string) {
	if (dateRegex.test(value)) return new Date(value);
	return value;
}

import { GraphqlEndpoint } from "./info";
async function graphqlFetch(
	query: string,
	variables: Record<string, any> = {}
) {
	const res = await fetch(GraphqlEndpoint, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query, variables }),
	});
	const body = await res.text();
	const result = JSON.parse(body, jsonDateReviver);

	if (!result.errors && result.data !== null) return result;
}

export { jsonDateReviver, graphqlFetch };
