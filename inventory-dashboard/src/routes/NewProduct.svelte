<script lang="ts">
	import { POST } from './NewProduct';
</script>

<h2>Add a New Product</h2>
<form
	id="new-product-form"
	action="POST"
	onsubmit={async (e) => {
		e.preventDefault();

		const data = e.target;
		const newProduct = {
			data: {
				type: 'node--product',
				attributes: {
					title: data?.title?.value,
					field_current_stock: data?.stock?.value,
					field_minimum_threshold: data?.threshold?.value,
					field_category: data?.category?.value
				}
			}
		};
		POST(newProduct);
		return newProduct;
	}}
>
	<label for="title"></label>
	<input type="text" id="title" placeholder="Product Title" />
	<label for="category"></label>
	<input type="text" id="category" placeholder="Product Category" />
	<label for="stock">Add to Stock:</label>
	<input type="number" id="stock" value="0" />
	<label for="threshold">Threshold for Low Stock Notice:</label>
	<input type="number" id="threshold" value="0" />
	<button type="submit">Submit</button>
</form>

<style>
	form {
		max-width: 480px;
		margin: 2rem auto;
		padding: 2rem;
		background: #ffffff;
		border-radius: 12px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h2 {
		margin: 0 0 0.5rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: #111;
		text-align: center;
	}

	input {
		width: 100%;
		padding: 0.6rem 0.75rem;
		border: 1px solid #ddd;
		border-radius: 6px;
		font-size: 0.95rem;
		color: #111;
		background: #fafafa;
		box-sizing: border-box;
	}

	input:focus {
		outline: none;
		border-color: #888;
		background: #fff;
	}

	label {
		font-size: 0.85rem;
		font-weight: 500;
		color: #444;
		margin-bottom: -0.5rem;
	}

	button {
		padding: 0.65rem 1.25rem;
		background: #111;
		color: #fff;
		border: none;
		border-radius: 6px;
		font-size: 0.95rem;
		cursor: pointer;
		align-self: flex-start;
	}

	button:hover {
		background: #333;
	}
</style>
