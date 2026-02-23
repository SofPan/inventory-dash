<script lang="ts">
	import NewProduct from './NewProduct.svelte';
	import ProductCard from './ProductCard.svelte';

	let { data } = $props();
	let fetchedProducts = $state(null);
	let products = $derived(fetchedProducts ?? data.products);

	function getStatus(current: number, threshold: number) {
		if (current <= threshold) return 'critical';
		if (current <= threshold * 1.2) return 'low';
		return 'ok';
	}

	async function refetch() {
		const res = await fetch(
			`${import.meta.env.VITE_API_URL}/jsonapi/node/product?sort=field_category,drupal_internal__nid`
		);
		const json = await res.json();
		fetchedProducts = json.data;
	}
</script>

<div>
	<NewProduct />
</div>
<div class="grid">
	{#each products as product (product.id)}
		{@const current = product.attributes.field_current_stock}
		{@const threshold = product.attributes.field_minimum_threshold}
		{@const status = getStatus(current, threshold)}
		<ProductCard {status} {product} {current} {threshold} {refetch} />
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
		padding: 1rem;
	}
</style>
