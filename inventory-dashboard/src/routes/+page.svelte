<script lang="ts">
	import NewProduct from './NewProduct.svelte';
	import ProductCard from './ProductCard.svelte';
	import SummaryBar from './SummaryBar.svelte';

	let { data } = $props();
	let fetchedProducts = $state(null);
	let filterText = $state('all');
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

	function filteredProducts(productList, status: string) {
		return productList.filter((product) => {
			const current = product.attributes.field_current_stock;
			const threshold = product.attributes.field_minimum_threshold;
			const prodStatus = getStatus(current, threshold);
			return prodStatus === status;
		});
	}

	function setFilter(filter: string) {
		filterText = filter;
		return filterText;
	}
</script>

<div>
	<SummaryBar {products} {filteredProducts} {setFilter} {filterText} />
	<NewProduct />
</div>
<div class="grid">
	{#each products as product (product.id)}
		{@const current = product.attributes.field_current_stock}
		{@const threshold = product.attributes.field_minimum_threshold}
		{@const status = getStatus(current, threshold)}
		<!-- TODO: Replace isVisible with refetch logic -->
		{@const isVisible = filterText === 'all' ? true : filterText === status}
		<ProductCard {isVisible} {status} {product} {current} {threshold} {refetch} />
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
