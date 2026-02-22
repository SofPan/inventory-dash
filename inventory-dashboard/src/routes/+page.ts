export const ssr = false;

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/jsonapi/node/product`);
    const json = await res.json();

    return { products: json.data };
};