Clone repo

gh repo clone ashu12658/NOT-MRP_INTERN_TASK

Copy env file
cp .env.example .env

Fill:
MONGO_URI=mongodb+srv://<user>:<pass>@cluster/db
JWT_SECRET=supersecret
JWT_EXPIRES_IN=7d
PORT=5000


1.cd src
2.npm init -y
3.npm start

Use token for auth:
Authorization: Bearer <token>

# Auth Endpoints
1. Register

POST https://notmrp-backend.onrender.com/api/auth/register
Headers: Content-Type: application/json

Body:

{
  "businessName": "My Shop",

  "email": "owner@shop.com",
  "username": "owner123",
  "password": "secret123"
}


Response:

{
  "user": {
    "id": "64f9a23bc2f1c3",
    "businessName": "My Shop",
    "email": "owner@shop.com"
  }
}

2. Login

POST https://notmrp-backend.onrender.com/api/auth/login
Headers: Content-Type: application/json

Body:

{
  "email": "owner@shop.com",
  "password": "secret123"
}


Response:

{
  "token": "eyJhbGciOi...",
  "user": {
    "id": "64f9a23bc2f1c3",
    "businessName": "My Shop",
    "email": "owner@shop.com"
  }
}

3. Logout

GET https://notmrp-backend.onrender.com/api/auth/logout
Headers: Authorization: Bearer <token>

Response:

{
  "message": "Logged out (client should discard token)"
}

# Products Endpoints
List Products

GET https://notmrp-backend.onrender.com/api/products?q=&category=
Headers: Authorization: Bearer <token>

Response:

[
  {
    "_id": "64f9a23bc2f1c3",
    "name": "Shampoo",
    "category": "Haircare",
    "price": 199,
    "stock": 50
  }
]

Create Product

POST https://notmrp-backend.onrender.com/api/products/create
Headers:
Authorization: Bearer <token>
Content-Type: application/json

Body:

{
  "name": "Shampoo",
  "category": "Haircare",
  "price": 199,
  "stock": 50
}


Response:

{
  "_id": "64f9a23bc2f1c3",
  "name": "Shampoo",
  "category": "Haircare",
  "price": 199,
  "stock": 50,
  "businessId": "64f9a1b2c2f1c3"
}

Update Product

PUT https://notmrp-backend.onrender.com/api/products/update/:id
Headers: Authorization: Bearer <token>
Body:

{
  "price": 220,
  "stock": 60
}

Delete Product

DELETE https://notmrp-backend.onrender.com/api/products/remove/:id
Headers: Authorization: Bearer <token>

Adjust Stock

POST https://notmrp-backend.onrender.com/api/products/adjust-stock/:id
Headers: Authorization: Bearer <token>
Body:

{
  "delta": 5
}

# Contacts Endpoints
List Contacts

GET https://notmrp-backend.onrender.com/api/contacts?q=&type=customer
Headers: Authorization: Bearer <token>

Create Contact

POST https://notmrp-backend.onrender.com/api/contacts/create
Headers:
Authorization: Bearer <token>
Content-Type: application/json

Body:

{
  "name": "Ramesh",
  "type": "customer",
  "phone": "9876543210",
  "email": "ramesh@gmail.com"
}

Update Contact

PUT https://notmrp-backend.onrender.com/api/contacts/update/:id
Headers: Authorization: Bearer <token>
Body:

{
  "phone": "9123456780"
}

Delete Contact

DELETE https://notmrp-backend.onrender.com/api/contacts/remove/:id
Headers: Authorization: Bearer <token>

# Transactions Endpoints
List Transactions

GET https://notmrp-backend.onrender.com/api/transactions?type=sale&from=2025-01-01&to=2025-12-31
Headers: Authorization: Bearer <token>

Create Transaction

POST https://notmrp-backend.onrender.com/api/transactions/create
Headers: Authorization: Bearer <token>
Body (Sale Example):

{
  "type": "sale",
  "contactId": "<customer id>",
  "products": [
    { "productId": "<id>", "quantity": 2, "price": 199 }
  ]
}


Body (Purchase Example):

{
  "type": "purchase",
  "contactId": "<vendor id>",
  "products": [
    { "productId": "<id>", "quantity": 10, "price": 150 }
  ]
}

# Reports Endpoints
Inventory Report

GET https://notmrp-backend.onrender.com/api/reports/inventory
Headers: Authorization: Bearer <token>

Transactions Report

GET https://notmrp-backend.onrender.com/api/reports/transactions?from=&to=&type=
Headers: Authorization: Bearer <token>


# Notes

All data is scoped by businessId (authenticated user).

JWT expires per JWT_EXPIRES_IN in .env.

Basic error handling included; add validation as needed.
