const express = require('express');
require('./connectDB')
const placeRoute = require('./route/place')
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/place', placeRoute);

app.listen(port, ()=> {
  console.log(`server running on port ${port}...`)
})