import "reflect-metadata";
import {createConnection} from "typeorm";
import {Item} from "./entity/Item";
import axios from "axios";
import {scrapeItems} from "./scraper";

const url = 'https://www.seconduse.com/inventory'

createConnection().then(async connection => {
  axios(url)
    .then(response => {
      const html = response.data;
      let items = scrapeItems(html);
    })
    .catch(console.error);
}).catch(error => console.log(error));
