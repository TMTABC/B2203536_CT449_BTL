import express from 'express';
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT;
console.log(process.pid);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
