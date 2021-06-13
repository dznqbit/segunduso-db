import cheerio = require('cheerio');

interface ProductIndexProduct {
  name: string;
  imageUrl: string;
  productUrl: string;
  location: string;
  sku: string;
  price: string;
}

function loadProductIndex(html): ProductIndexProduct[] {
  const $ = cheerio.load(html);
  return $('#products')
    .find('.product')
    .map((i, el) => {
      const $el = $(el);
      const imageUrl = $el.find('.image img').attr('src');
      const productUrl = $el.find('.info h3 a').attr('href');
      const name = $el.find('.info h3 a').text();
      const [location, sku] = $el.find('.info .inventory-no').text().split(': ');
      const price = $el.find('.info .price').text();
      return { name, imageUrl, productUrl, location, sku, price };
    })
    .get();
}

interface ProductDetailProduct {
  name: string;
  location: string;
  sku: string;
  price: string;
  rack: string;
  quantity: string;
  width: string;
  length: string;
  height: string;
  depth: string;
  timeInStock: string;
  condition: string;
  jobNumber: string;
}

function loadProductDetail(html): ProductDetailProduct {
  const $ = cheerio.load(html);
  const $p = $('.product');
  const name = $p.find('#info h2').text();
  const price = $p.find('#info .price').text();
  const description = $p.find('#info .description').text();

  const detailTextLines = $p
    .find('#info #details')
    .text()
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const detail = (detail) => {
    const detailLabel = `${detail}:`;
    return detailTextLines
      .find((s) => s.startsWith(detailLabel))
      ?.replace(detailLabel, '')
      .trim();
  };

  const sku = detail('Item');
  const location = detail('Location');
  const rack = detail('Rack');
  const quantity = detail('Quantity');
  const width = detail('Width');
  const length = detail('Length');
  const height = detail('Height');
  const depth = detail('Depth');
  const timeInStock = detail('Time in Stock');
  const condition = detail('Condition');

  // Sometimes the Job Number field isn't filled, but they still have the association
  const detailJobNumber = detail('Job Number');
  const viewMoreJobNumber = $('#view-more a:contains("View more items from this job")')
    .attr('href')
    .match(/.*jobID=(\w+)/)?.[1];

  return {
    name,
    sku,
    price,
    location,
    rack,
    quantity,
    width,
    length,
    height,
    depth,
    timeInStock,
    condition,
    jobNumber: detailJobNumber ?? viewMoreJobNumber,
  };
}

export { loadProductIndex, loadProductDetail };
