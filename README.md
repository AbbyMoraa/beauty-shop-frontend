# Beauty Haven 💄

A modern e-commerce platform for beauty products built with React and Vite.

## Features

- 🛍️ Product browsing and search
- 🛒 Shopping cart functionality
- 💳 Secure checkout process
- 👤 User authentication (login/register)
- 📊 Admin dashboard with analytics
- 👥 User management
- 📦 Order tracking
- 📱 Responsive design

## Tech Stack

- **Frontend:** React 18, Vite
- **State Management:** Redux Toolkit
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Backend:** Flask (Python)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://127.0.0.1:5000`

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd beauty-shop-frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
beauty-shop-frontend/
├── src/
│   ├── admin/              # Admin dashboard components
│   │   ├── components/     # Analytics, Orders, Users
│   │   ├── pages/          # Admin dashboard page
│   │   └── redux/          # Admin state management
│   ├── components/         # Shared components (Navbar, Footer)
│   ├── features/           # Feature-based modules
│   │   ├── auth/           # Authentication
│   │   ├── cart/           # Shopping cart
│   │   ├── products/       # Product management
│   │   └── payment/        # Payment processing
│   ├── pages/              # Page components
│   ├── app/                # Redux store configuration
│   └── App.jsx             # Main app component
├── public/                 # Static assets
└── index.html              # HTML entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Admin Access

Admin dashboard is accessible at `/admin` for users with admin role or email `abbymoraa876@gmail.com`.

**Admin Features:**
- View and manage orders
- Analytics dashboard with sales metrics
- User management (edit roles, delete users)
- Export orders to CSV

## Environment Variables

The app connects to the backend at `http://127.0.0.1:5000`. Update the API URLs in:
- `src/features/auth/authSlice.js`
- `src/admin/redux/adminSlice.js`
- `src/features/products/productAPI.js`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact the development team.
