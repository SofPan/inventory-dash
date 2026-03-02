<script lang="ts">
	import { PATCH } from './EditProduct';

	let props = $props();
	let isEditing = $state(false);
	let showMessage = $state(false);
	const product = props.product.attributes;

	function setIsEditing(editStatus: boolean) {
		isEditing = editStatus;
		return isEditing;
	}

	function successMessage() {
		showMessage = true;
		setTimeout(() => {
			showMessage = false;
		}, 4000);
	}
</script>

<div id={product.id} class="card {props.status} {props.isVisible === false ? 'hidden' : ''}">
	{#if isEditing}
		<h2>Editing {product.title}</h2>
		<form
			onsubmit={async (e) => {
				e.preventDefault();

				const data = e.target;
				const product = {
					data: {
						id: props.product.id,
						type: 'node--product',
						attributes: {
							title: data?.title?.value,
							field_current_stock: data?.stock?.value,
							field_minimum_threshold: data?.threshold?.value,
							field_category: data?.category?.value
						}
					}
				};
				await PATCH(product);
				setIsEditing(false);
				successMessage();
				props.refetch();
				return product;
			}}
		>
			<label for="title"></label>
			<input type="text" id="title" value={product.title} />
			<label for="category">Category:</label>
			<input type="text" id="category" value={product.field_category} />
			<label for="stock">New Stock:</label>
			<input type="number" id="stock" value={props.current} />
			<label for="threshold">Threshold:</label>
			<input type="number" id="threshold" value={props.threshold} />
			<button type="submit">Submit</button>
		</form>
		<button onclick={() => setIsEditing(false)}>Cancel</button>
	{:else}
		{#if showMessage}
			<span>Product Updated Successfully!</span>
		{/if}
		<h2>{product.title}</h2>
		<p>Current Stock: {props.current}</p>
		<p>Minimum Threshold: {props.threshold}</p>
		{#if product.field_category}
			<p>Category: {product.field_category}</p>
		{/if}
		<div class="flex">
			<span class="badge">{props.status.toUpperCase()}</span>
			<button onclick={() => setIsEditing(true)}>Edit</button>
		</div>
	{/if}
</div>

<style>
	.hidden {
		display: none !important;
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

	button {
		padding: 0.25rem 0.5rem;
		background: #111;
		color: #fff;
		border: none;
		border-radius: 6px;
		font-size: 0.75rem;
		cursor: pointer;
	}

	button:hover {
		background: #333;
	}

	.flex {
		display: flex;
		justify-content: space-between;
		padding-right: 0.75rem;
	}
</style>
