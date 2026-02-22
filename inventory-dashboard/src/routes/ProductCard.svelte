<script lang="ts">
	let props = $props();
	let isEditing = $state(false);

	function setIsEditing(editStatus: boolean) {
		console.log('clicked a button!');
		isEditing = editStatus;
		console.log('isEditing is', isEditing);
		return isEditing;
	}
</script>

<div id={props.product.attributes.id} class="card {props.status}">
	{#if isEditing}
		<span>We're editing!</span>
		<button onclick={() => setIsEditing(false)}>Cancel</button>
	{:else}
		<h2>{props.product.attributes.title}</h2>
		<p>Current Stock: {props.current}</p>
		<p>Minimum Threshold: {props.threshold}</p>
		{#if props.product.attributes.field_category}
			<p>Category: {props.product.attributes.field_category}</p>
		{/if}
		<div class="flex">
			<span class="badge">{props.status.toUpperCase()}</span>
			<button onclick={() => setIsEditing(true)}>Edit</button>
		</div>
	{/if}
</div>

<style>
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
