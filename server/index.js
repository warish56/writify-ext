require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const aiRoutes = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: [process.env.CORS_ORIGIN],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/ai', aiRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

