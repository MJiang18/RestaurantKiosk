require('dotenv').config({ path: './config.env' });
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cors = require('cors');
// const cookieParser = require('cookie-parser');

connectDB();

// app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('Api running');
});

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use('/api/restaurantKiosk', require('./routes/restaurantKiosk'));
app.use('/api/private', require('./routes/private'));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () =>
  console.log(`Server is running on ${PORT}`),
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
