import cheerio = require("cheerio");

function scrapeItems(html) {
  const $ = cheerio.load(html);
  $("#products").find(".product").each((idx, el) => {
                                       console.log(el);
                                       console.log("\n");
  });
}

export { scrapeItems };
