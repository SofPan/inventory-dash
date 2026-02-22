<script lang="ts">
	import NewProduct from './NewProduct.svelte';
	import ProductCard from './ProductCard.svelte';

	export let data;
	$: products = data.products;

	function getStatus(current: number, threshold: number) {
		if (current <= threshold) return 'critical';
		if (current <= threshold * 1.2) return 'low';
		return 'ok';
	}
</script>

<div>
	<NewProduct />
</div>
<div class="grid">
	{#each products as product}
		{@const current = product.attributes.field_current_stock}
		{@const threshold = product.attributes.field_minimum_threshold}
		{@const status = getStatus(current, threshold)}
		<ProductCard {status} {product} />
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
