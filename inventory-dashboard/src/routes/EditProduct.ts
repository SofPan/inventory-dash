interface ProductData {
			data: {
				type: string;
        id: string;
				attributes: {
					title: string,
					field_current_stock: number;
					field_minimum_threshold: number;
					field_category: string;
				}
			}
		};

export const PATCH = async (request:ProductData) => {
  const tokenRes = await fetch(`${import.meta.env.VITE_API_URL}/session/token`);
  const token = await tokenRes.text();

  const res = await fetch(`${import.meta.env.VITE_API_URL}/jsonapi/node/product/${request.data.id}`, {
    method: 'PATCH',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
      'Authorization': `Basic ${btoa(import.meta.env.VITE_USERNAME + ':' + import.meta.env.VITE_PASSWORD)}`,
      'X-CSRF-Token': token
    }
  });
  console.log("base64", btoa(import.meta.env.VITE_USERNAME + ':' + import.meta.env.VITE_PASSWORD))
  const data = await res.json();
  console.log("data json", data);
}