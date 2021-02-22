// scrape.ts
import "reflect-metadata";

const axios = require('axios');
const url = 'https://www.seconduse.com/inventory'

axios(url)
  .then(response => {
    const html = response.data;
    console.log(html);
  })
  .catch(console.error);
