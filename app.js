import express, { json } from 'express';
import { connect, connection } from 'mongoose';
const app = express();
import { config } from './config/development';
app.use(json());

connect(config.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

app.listen(config.PORT, () => {
  console.log(`Server is running at port ${config.PORT}`);
});
