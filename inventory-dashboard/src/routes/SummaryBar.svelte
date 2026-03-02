<script lang="ts">
	let props = $props();
	const totalProducts = $derived(props.products);
</script>

<div class="summary-bar">
	<div class="counts">
		<h2>Inventory Status</h2>
		<div class="count-item all">
			<span class="count-label">Total products:</span>
			<span class="count-number">{totalProducts.length}</span>
		</div>
		<div class="count-item low">
			<span class="count-label">Low:</span>
			<span class="count-number">{props.filteredProducts(totalProducts, 'low').length}</span>
		</div>
		<div class="count-item critical">
			<span class="count-label">Critical:</span>
			<span class="count-number">{props.filteredProducts(totalProducts, 'critical').length}</span>
		</div>
	</div>
	<div class="filters">
		<span>Filter Products:</span>
		<button
			class="filter-label {props.filterText === 'all' ? 'active' : ''}"
			onclick={() => props.setFilter('all')}>All</button
		>
		<button
			class="filter-label {props.filterText === 'low' ? 'active' : ''}"
			onclick={() => props.setFilter('low')}>Low</button
		>
		<button
			class="filter-label {props.filterText === 'critical' ? 'active' : ''}"
			onclick={() => props.setFilter('critical')}>Critical</button
		>
	</div>
</div>

<style>
	.summary-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: 2rem auto 1rem auto;
		padding: 1rem 1.5rem;
		background: #ffffff;
		border-radius: 12px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
	}

	.counts {
		display: flex;
		gap: 2rem;
		align-items: center;
	}

	.count-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.count-number {
		font-size: 1.5rem;
		font-weight: 700;
		color: #111;
	}

	.count-label {
		font-size: 0.75rem;
		color: #888;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.count-item.low .count-number {
		color: orange;
	}
	.count-item.critical .count-number {
		color: red;
	}

	.filters {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.filter-label {
		font-size: 0.85rem;
		color: #888;
		margin-right: 0.25rem;
	}

	button {
		padding: 0.4rem 0.9rem;
		border: 1px solid #ddd;
		border-radius: 6px;
		background: #fafafa;
		color: #444;
		font-size: 0.85rem;
		cursor: pointer;
	}

	button:hover {
		background: #f0f0f0;
	}

	button.active {
		background: #111;
		color: #fff;
		border-color: #111;
	}
</style>
