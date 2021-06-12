import express = require('express');
import cron = require('node-cron');
import { appConfig } from './appConfig';
import 'reflect-metadata';
import { Item } from './entity/Item';
import axios from 'axios';
import { loadProductIndex, loadProductDetail } from './scrapers/scraper';
import { createConnection } from './typeorm';
async function fetch() {
  try {
    const productIndexResponse = await axios(`${appConfig.secondUseHost}/inventory`);
    const products = loadProductIndex(productIndexResponse.data);

    products.forEach(async (p) => {
      try {
        const productDetailsResponse = await axios(p.productUrl);
        const product = loadProductDetail(productDetailsResponse.data);
        console.log(product);
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.error(e);
  }
}

const app = express();
const port = process.env.PORT ?? 8080;

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/healthcheck', (req, res) => {
  res.send('👍\n');
});

cron.schedule('* * * * *', function () {
  console.log('running a task every minute');
});

app.listen(port, async () => {
  console.log(`server started at http://localhost:${port}`);

  try {
    const connection = await createConnection();
    console.log('connection yahoo');
  } catch {
    console.log('connection failure');
  }
});
