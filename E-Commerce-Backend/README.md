# E-Commerce Backend

A comprehensive REST API for an E-Commerce platform built with Node.js, Express, and MySQL. This backend handles all core user-facing functionality including authentication, product browsing, cart management, orders, payments, and invoicing.

## 🚀 Features

### Core Modules

- **Authentication** - JWT-based authentication with email verification, password reset, and secure token management
- **Product Catalog** - Browse products with search, filters, categories, and detailed product views
- **Shopping Cart** - Add, update, remove items with price snapshots
- **Address Management** - Multiple addresses per user with default address support
- **Order Management** - Place orders with transactional integrity and order history
- **Payment Processing** - Payment initiation and status tracking (gateway-ready)
- **Invoice Generation** - Automatic invoice creation post-payment

### Additional Features

- **Admin APIs** - Product, category, order, user, inventory, payment, and invoice management
- **User Preferences** - Manage user settings and preferences
- **User Profile** - Profile management and account settings
- **Security** - Rate limiting, Helmet security headers, CORS protection, input validation

## 🛠️ Tech Stack

- **Runtime**: Node.js (>=18.0.0)
- **Framework**: Express.js
- **Database**: MySQL with InnoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Security**: Helmet, CORS, Express Rate Limit
- **Testing**: Jest + Supertest
- **Architecture**: Layered (Routes → Controllers → Services)

## 📋 Prerequisites

- Node.js >= 18.0.0
- MySQL >= 8.0
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CipheR2508/E-Commerce-Backend.git
   cd E-Commerce-Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database credentials and other configurations.

4. **Set up the database**
   - Create a MySQL database
   - Run the schema files from `docs/database/schema/` directory
   - Run seed data using `npm run seed`

5. **Start the server**
   ```bash
   # Development mode with hot reload
   npm run dev
   
   # Production mode
   npm start
   ```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=ecommerce_db

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h

# Email Configuration (for verification & password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Payment Gateway (Configure as needed)
# STRIPE_SECRET_KEY=sk_test_...
# RAZORPAY_KEY_ID=rzp_test_...
# RAZORPAY_KEY_SECRET=your_secret
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register new user |
| POST | `/auth/login` | User login |
| POST | `/auth/verify-email` | Verify email address |
| POST | `/auth/forgot-password` | Request password reset |
| POST | `/auth/reset-password` | Reset password with token |

### Product Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | List all products (with pagination, filters) |
| GET | `/products/:id` | Get product details |
| GET | `/products/search?q=query` | Search products |

### Cart Endpoints (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cart` | View cart |
| POST | `/cart` | Add item to cart |
| PUT | `/cart/:itemId` | Update cart item quantity |
| DELETE | `/cart/:itemId` | Remove item from cart |
| DELETE | `/cart` | Clear cart |

### Order Endpoints (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/orders` | Place order |
| GET | `/orders` | List user orders |
| GET | `/orders/:id` | Get order details |

### Address Endpoints (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/addresses` | List addresses |
| POST | `/addresses` | Create address |
| PUT | `/addresses/:id` | Update address |
| DELETE | `/addresses/:id` | Delete address |

### Payment Endpoints (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/payments/initiate` | Initiate payment |
| POST | `/payments/verify` | Verify payment |
| GET | `/payments/:orderId` | Get payment status |

### Admin Endpoints (Protected - Admin Only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/products` | List all products (admin) |
| POST | `/admin/products` | Create product |
| PUT | `/admin/products/:id` | Update product |
| DELETE | `/admin/products/:id` | Delete product |
| GET | `/admin/orders` | List all orders |
| PUT | `/admin/orders/:id/status` | Update order status |
| GET | `/admin/users` | List all users |

For complete API documentation, import the Postman collection:
```
ECommerce_API_Postman_Collection.json
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test -- --coverage
```

### Database Validation Tests

SQL validation scripts are available in the `tests/` directory:
- `phase1_auth_validation.sql`
- `phase1_product_validation.sql`
- `phase1_cart_validation.sql`
- `phase1_order_validation.sql`
- `phase1_payment_invoice_validation.sql`
- `phase1_address_validation.sql`
- `phase1_category_validation.sql`

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for secure password storage
- **Rate Limiting** - Prevent brute force attacks
- **Helmet** - Security headers protection
- **CORS** - Cross-origin resource sharing configuration
- **Input Validation** - Joi schema validation for all inputs
- **SQL Injection Protection** - Parameterized queries with mysql2

## 📁 Project Structure

```
E-Commerce-Backend/
├── scripts/
│   └── seed/            # Database seed scripts
├── src/
│   ├── config/          # App-level configuration (Swagger, etc.)
│   ├── database/        # Database connection pool
│   ├── modules/         # Feature-based modules (Domain-driven)
│   │   ├── auth/
│   │   ├── products/
│   │   ├── admin/
│   │   └── ...
│   ├── shared/          # Global middlewares and utilities
│   │   ├── middleware/
│   │   └── utils/
│   ├── app.js           # Express app factory
│   └── server.js        # Server entry point and HTTP setup
├── tests/               # API tests
├── docs/                # Project documentation
│   └── database/        # SQL schema and DB docs
├── .env                 # Environment variables (not in git)
├── .env.example         # Example environment file
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## 🔄 Transaction Flow

```
User Signup/Login
      ↓
Browse Products → Search/Filter
      ↓
Add to Cart → Manage Cart
      ↓
Manage Addresses
      ↓
Place Order (Transaction)
      ↓
Initiate Payment
      ↓
Payment Success → Generate Invoice
      ↓
Order Complete
```

## 🚧 Future Enhancements

- [ ] Real payment gateway integration (Stripe/Razorpay)
- [ ] Inventory management with stock alerts
- [ ] Refund and cancellation workflows
- [ ] Coupon and discount system
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Swagger/OpenAPI documentation
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**CipheR2508**

- GitHub: [@CipheR2508](https://github.com/CipheR2508)

## 🙏 Acknowledgments

- Built as a learning project for backend architecture
- Suitable for portfolio projects and interview discussions
- Production-ready foundation for e-commerce applications

---

## 📞 Support

For questions or support, please open an issue on GitHub.

**Happy Coding!** 🎉
