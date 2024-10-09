import { gql } from '$lib/graphql';
import { z } from 'zod';

const model = z.object({
	data: z.object({
		hello: z.string()
	})
});

export const load = async () => {
	return gql(/* GraphQL */ `
		query {
			hello
		}
	`).then((res) => model.parse(res).data);
};
