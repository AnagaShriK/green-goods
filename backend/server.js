require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
connectDB();
app.use(cors({ origin: '*' })); // Or specify your frontend URL, e.g., 'https://your-frontend.vercel.app'
app.use(express.json());

app.use('/api/plants', require('./routes/plants'));
app.use('/api/users', require('./routes/users'));
app.use('/api/orders', require('./routes/orders'));

app.get('/', (req, res) => res.send('GreenGoods API running'));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = app;
