<script lang="ts">
	import NewProduct from './NewProduct.svelte';

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

		<div class="card {status}">
			<h2>{product.attributes.title}</h2>
			<p>Current Stock: {current}</p>
			<p>Minimum Threshold: {threshold}</p>
			{#if product.attributes.field_category}
				<p>Category: {product.attributes.field_category}</p>
			{/if}
			<span class="badge">{status.toUpperCase()}</span>
		</div>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
		padding: 1rem;
	}

	.card {
		border-radius: 8px;
		padding: 1rem;
		border: 2px solid #ccc;
	}

	.ok {
		border-color: green;
		background: #f0fff0;
	}
	.low {
		border-color: orange;
		background: #fffbe6;
	}
	.critical {
		border-color: red;
		background: #fff0f0;
	}

	.badge {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: bold;
	}

	.ok .badge {
		background: green;
		color: white;
	}
	.low .badge {
		background: orange;
		color: white;
	}
	.critical .badge {
		background: red;
		color: white;
	}
</style>
