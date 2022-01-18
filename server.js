const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect(
  'mongodb+srv://aml_fakhry:aml1234567890@asis.wvifm.mongodb.net/test',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});
// mongodb+srv://aml_fakhry:aml1234567890@asis.wvifm.mongodb.net/test?authSource=admin&replicaSet=atlas-wdlxf0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
app.listen(3000, () => {
  console.log('Server is running at port 3000');
});
