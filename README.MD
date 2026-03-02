# Inventory Alert Dashboard

A small business inventory management tool built with a decoupled architecture. Drupal serves as a headless CMS and API layer, while a SvelteKit frontend provides a real-time dashboard for monitoring stock levels.

## Tech Stack

- **Backend:** Drupal 11 (PHP) — content management, JSON API, authentication
- **Frontend:** SvelteKit — dashboard UI, product management
- **Architecture:** Headless/decoupled CMS with REST API communication

## Features

- Live inventory dashboard with color-coded stock status (ok, low, critical)
- Add new products
- Inline product editing
- Summary bar with total, low, and critical counts
- Filter products by status

## Project Structure
```
/web                  Drupal backend
/inventory-dashboard  SvelteKit frontend
```

## Running Locally

### Backend
Requires [DDEV](https://ddev.readthedocs.io/en/stable/).
```bash
ddev start
```

Drupal will be available at `https://inventory.ddev.site`

### Frontend
```bash
cd inventory-dashboard
npm install
npm run dev
```

Create a `.env` file in `/inventory-dashboard` before running — see `.env.example` for required variables.

Frontend will be available at `http://localhost:5173`

## Notes

- `ssr = false` is set in the SvelteKit load function because the local Drupal hostname only resolves in the browser environment. This would not be necessary in a production deployment with a public URL.
- Write operations (POST/PATCH) require Basic Auth credentials and a Drupal CSRF token.