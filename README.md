# Back End II 'design & architecture' API project

#### `dev ~ Joey Alvarado`

## Description

A backend API project focusing on product and cart management, designed with RESTful architecture and utilizing Node.js, Express, and MongoDB. This API enables CRUD operations for products and carts and includes user authentication with JWT and Passport.
It also includes designated roles for users so they can perform certain actions depending if they are "user" or "admin". At the end of a purchase, a confirmation email is sent to the user using a mail service

## Table of contents

1. Installation
2. Usage
3. API Endpoints
   - products
   - Carts
4. Technologies
5. Contact
6. Contributions
7. License

<br>

## Installation

1. Clone the repository:

```bash
git clone https://github.com/jalvaradoz/backEndII70070.git
```

2. Navigate to the project directory:

```bash
cd backend-project
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables in a .env file if needed (e.g., MongoDB connection URL, JWT secret):

```bash
MONGO_URL=<your-mongodb-url>
JWT_SECRET=<your-jwt-secret>
```

## Usage

1. Start the server

```bash
npm start
```

2. The server will be running on port 8080. You can change the port in the app.js file if needed.

## API Endpoints

### Products

- Get all products

```bash
GET /products
```

- Delete a product by ID

```bash
DELETE /products/delete/:pid
```

- Path parameters:

  - 'id': The ID of the product

- POST a new product

```bash
POST /newProduct
```

- Update an existing product by ID

```bash
PUT /products/update/:pid
```

- Carts

* GET cart by ID

```bash
GET /carts/:cid
```

- Create a cart

```bash
POST /carts
```

- Add products to a cart

```bash
POST /carts/:cid/products/:pid
```

- Delete cart on the DB

```bash
DELETE /carts/:cid
```

- Remove a product from the cart by ID

```bash
DELETE /carts/:cid/products/:pid
```

- Purchase the Cart

```bash
POST /carts/:cid/purchase
```

## Technologies

[![My Skills](https://skillicons.dev/icons?i=nodejs,express,js,vscode,postman,mongo&theme=dark)](https://skillicons.dev)

## Contact

<p align="center">
  <a href="https://github.com/jalvaradoz">
    <img src="https://skillicons.dev/icons?i=github" />
  </a>
  <a href="https://www.linkedin.com/in/joey-alvarado-741a36180/">
    <img src="https://skillicons.dev/icons?i=linkedin" />
  </a>
  <a href="https://joeyalvarado.netlify.app/">
    <img src="https://joeyalvarado.netlify.app/Assets/Img/joeyContact.png" width='50px'/>
  </a>
</p>

## Contributions

If you want to contribute to this project, please fork the repository and create a pull request.

## License

#### This project is licensed under the MIT License.
