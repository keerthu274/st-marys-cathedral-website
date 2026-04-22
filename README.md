# St Mary's Cathedral Website

## Frontend Design
Figma design and UI files by Keerthu.

## Backend System
Laravel admin panel and API developed by Dunura.

## Local Development

Run the backend from the `backend` folder:

```bash
composer install
php artisan migrate
php artisan serve --host=127.0.0.1 --port=8000
```

Run the frontend from the `Frontend` folder:

```bash
npm install
npm run dev
```

During local development the React app is available at:

```text
http://127.0.0.1:5173
```

The Laravel backend is available at:

```text
http://127.0.0.1:8000
```

Backend `/login`, `/register`, and `/dashboard` browser routes redirect to the React app so users see the designed frontend screens.

## Backend Route Areas

Public JSON API routes live under:

```text
/api/v1
```

Admin JSON and admin management routes live under:

```text
/admin
```

React authentication helpers use:

```text
/auth-api
```

## Useful Checks

Run backend tests:

```bash
cd backend
php artisan test
```

Run frontend checks:

```bash
cd Frontend
npm run lint
npm run build
```
