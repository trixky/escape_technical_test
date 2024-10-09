import { getCases, gql } from '$lib/graphql';
import type Emplacement from '$lib/models/emplacement';
import { z } from 'zod';

const model = z.object({
	data: z.object({
		hello: z.string()
	})
});

export const load = async () => {
	const cases = await getCases() as Array<Emplacement>;

	return { cases };

	// return gql(/* GraphQL */ `
	// 	query {
	// 		hello
	// 	}
	// `).then((res) => model.parse(res).data);

};
