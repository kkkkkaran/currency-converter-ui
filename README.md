# Currency Converter with Laravel Breeze & Vue.js 3

## Inspiration

This Currency Converter project is inspired by Laravel's approach to building modern web applications, combining the robust backend capabilities of Laravel with the dynamic frontend possibilities of Vue.js 3. Special thanks to faisalfjri's breeze-vue-api for providing the foundation and inspiration for integrating Laravel Breeze with a Vue.js 3 frontend.

## Introduction

The Currency Converter project leverages Laravel Breeze for its authentication and application scaffolding, providing a seamless integration between a Laravel backend and a Vue.js 3 frontend. By utilizing Laravel Sanctum for API token authentication, this setup allows for the quick development of a currency conversion application with both a powerful server and an interactive client-side experience.

## Documentation

### Installation

Follow the backend setup at: https://github.com/kkkkkaran/currency-converter

Ensure that your application's `APP_URL` and `FRONTEND_URL` environment variables are set to `http://localhost:8000` and `http://localhost:3000`, respectively.

Next, clone this repository and install its dependencies with `yarn install` or `npm install`. Then, copy the `.env.example` file to `.env` and supply the URL of your backend:

```
VITE_APP_NAME=Currency Converter
VITE_PUBLIC_BACKEND_URL=http://localhost:8000
```

Finally, run the application via `npm run dev`. The application will be available at `http://localhost:3000`:

```
npm run dev
```

> Note: Currently, we recommend using `localhost` during local development of your backend and frontend to avoid CORS "Same-Origin" issues.