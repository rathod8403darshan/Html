
require('dotenv').config()
require('./config/db')
const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const student=require('./models/studentSchema')
const user=require('./models/userSchema')
const product=require('./models/productSchema')
const router=require('./routes');
const cors = require('cors');
const { errorhandle } = require('./utils/error');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swgger/swger-api.postman_collection.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(express.json());
app.use(express.static('public'))

app.use('/api',router);
app.use(errorhandle)


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })