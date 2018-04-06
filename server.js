const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const actionRouter = require('./users/actionRoutes.js');
const projectRouter = require('./users/projectRoutes.js');

const server = express();

server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/', function(req, res) {
  res.json({ api: 'Running...' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log('API running on port 5000'));
