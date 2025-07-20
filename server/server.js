import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './DB/db.js'; 
import authRoutes from './Route/authRoute.js';
import userRoutes from './Route/authUser.js';
import restaurantRoutes from './Route/authRestaurant.js';
import menuRoutes from './Route/menuroute.js';
import cartRoutes from './Route/CartRoute.js';
import paymentRoutes from './Route/PaymentRoute.js';
import http from 'http';
import { initSocket } from './socket.js';
import adminMenuRoutes from "./Route/adminMenuRoutes.js";
import adminOrderRoutes from "./Route/adminOrderRoutes.js";


 
// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin:"https://zomato-3cc5.vercel.app",
  credentials: true,
}));
app.use(express.json());


  app.use('/api/auth', authRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/restaurants', restaurantRoutes);
  app.use('/api/menu', menuRoutes);
  app.use('/api/cart', cartRoutes);
  app.use('/api/payment', paymentRoutes);
  app.use("/api/menu", adminMenuRoutes);
  app.use("/api/admin/orders", adminOrderRoutes);



const server = http.createServer(app);

// ⬇️ Init Socket.IO
initSocket(server);

// ⬆️ Listen with HTTP server, not express
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// Start the server
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
