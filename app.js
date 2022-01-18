const express = require('express');
const mongoose = require('mongoose');
const PORT = 3000 || env.PORT;
const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://aml_fakhry:aml1234567890@asis.wvifm.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

app.listen(3000, () => {
  console.log('Server is running at port 3000');
});
