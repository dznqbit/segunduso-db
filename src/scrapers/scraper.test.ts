import { loadProductIndex, loadProductDetail } from './scraper';
import { readFileSync } from 'fs';

describe('loadProductIndex', () => {
  const PRODUCT_INDEX_HTML = readFileSync('src/scrapers/productIndex.html').toString();

  it('parses all products on page', () => {
    const products = loadProductIndex(PRODUCT_INDEX_HTML);
    expect(products.length).toBe(30);
  });

  it('parses first product correctly', () => {
    const products = loadProductIndex(PRODUCT_INDEX_HTML);
    const product = products[0];

    expect(product.imageUrl).toBe(
      'https://cdn.seconduse.com/seattle/881/881947.jpg?width=250&height=250&timestamp=63521',
    );
    expect(product.location).toBe('Seattle');
    expect(product.name).toBe('28″ Hollow Core Interior Door');
    expect(product.price).toBe('$ 20.00');
    expect(product.productUrl).toBe('https://www.seconduse.com/inventory/items/881947-S/28-hollow-core-interior-door/');
    expect(product.sku).toBe('881947-S');
  });
});

describe('loadProductDetails', () => {
  const PRODUCT_DETAIL_HTML = readFileSync('src/scrapers/productDetail.html').toString();

  it('parses product correctly', () => {
    const product = loadProductDetail(PRODUCT_DETAIL_HTML);

    expect(product.name).toBe('Live Edge Coat Rack');
    expect(product.price).toBe('$ 60.00');
    expect(product.location).toBe('Tacoma');
    expect(product.sku).toBe('571706-T');
    expect(product.rack).toBe('See Staff for Assistance');
    expect(product.quantity).toBe('1');
    expect(product.width).toBe('28.5 in.');
    expect(product.length).toBe(undefined);
    expect(product.height).toBe('7 in.');
    expect(product.depth).toBe('3.875 in.');
    expect(product.timeInStock).toBe('Less than 1 day');
    expect(product.condition).toBe('Excellent');
    expect(product.jobNumber).toBe('621J9533');
  });
});
