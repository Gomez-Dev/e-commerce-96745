# E-commerce Backend

Backend desarrollado con Node.js, Express y MongoDB.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose

## Instalación

npm install

## Ejecutar proyecto

npm run dev

## Endpoints principales

### Products

GET /api/products
POST /api/products
PUT /api/products/:pid
DELETE /api/products/:pid

### Carts

GET /api/carts/:cid
POST /api/carts
POST /api/carts/:cid/product/:pid
