import express = require('express');
import { appConfig } from './appConfig';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Item } from './entity/Item';
import axios from 'axios';
import { loadProductIndex, loadProductDetail } from './scrapers/scraper';

const url = 'https://www.seconduse.com/inventory';

async function fetch() {
  try {
    const productIndexResponse = await axios(url);
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
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/healthcheck', (req, res) => {
  res.send('👍\n');
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
