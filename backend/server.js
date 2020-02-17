require('dotenv').config();
const express = require('express');
const router = require('./router');
const server = express();
const cors = require('cors');

server.use(cors());
server.use('/api', router);

server.listen(process.env.PORT, () => console.log(`Listening on ${process.env.HOST}:${process.env.PORT}`));