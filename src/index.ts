import { appConfig } from "./appConfig";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Item } from "./entity/Item";
import axios from "axios";
import { loadProductIndex, loadProductDetail } from "./scraper";

const url = "https://www.seconduse.com/inventory";

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

fetch()
  .then(() => {})
  .catch(() => {});
