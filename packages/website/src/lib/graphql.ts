import { env } from '$env/dynamic/public';

export const gql = async (query: string, variables?: Record<string, unknown>) => {
	return fetch(env.PUBLIC_API_ENDPOINT, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query,
			variables
		})
	}).then((res) => res.json());
};

export const getCases = async () => {
	const query = `
        query {
            cases {
                x
                y
                color
            }
        }
    `;
	const response = await gql(query);
	return response.data?.cases || [];
};

export const createOrUpdateEmplacement = async (x: number, y: number, color: string) => {
	const mutation = `
        mutation ($x: Float!, $y: Float!, $color: String!) {
            createOrUpdateEmplacement(x: $x, y: $y, color: $color) {
                id
                x
                y
                color
            }
        }
    `;
	const variables = { x, y, color };
	const response = await gql(mutation, variables);
	return response.data?.createOrUpdateEmplacement || null;
};

export const subscribe = <T = unknown>(query: string, onData: (d: T) => void) => {
	const subscriptionURL = new URL(env.PUBLIC_API_ENDPOINT);
	subscriptionURL.searchParams.append('query', query);

	const source = new EventSource(subscriptionURL);

	source.addEventListener('next', ({ data }) => onData(data));

	source.addEventListener('error', (e) => {
		console.error(e);
	});

	source.addEventListener('complete', () => {
		source.close();
	});

	return source.close.bind(source);
};
