const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('./config/development');
app.use(express.json());

mongoose.connect(config.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

app.listen(config.PORT, () => {
  console.log(`Server is running at port ${config.PORT}`);
});
