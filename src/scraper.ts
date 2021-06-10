import cheerio = require('cheerio');

interface ProductIndexProduct {
  name: string;
  imageUrl: string;
  productUrl: string;
  location: string;
  sku: string;
  price: string;
}

// <div class="product">
// 	<div class="image">
// 		<div class="image-wrapper">
// 			<a href="https://www.seconduse.com/inventory/items/563612-T/interior-28-lite-french-door/">
// 				<img src="https://s3-us-west-2.amazonaws.com/2u.inventory/tacoma/563/563612.jpg?width=250&amp;height=250&amp;timestamp=">
// 			</a>
// 		</div>
// 	</div>
// 	<div class="info">
// 		<h3><a href="https://www.seconduse.com/inventory/items/563612-T/interior-28-lite-french-door/">Interior 28 Lite French Door</a></h3>
//     <p class="inventory-no"><strong><span class="location">Tacoma</span>:</strong> 563612-T</p>
// 		<p class="price"><strong>$ 95.00</strong></p>
// 			<a href="#" class="favorite logged-out" data-id="563612-T">
// 				<span class="ir heart">Favorite</span>
// 				<span class="tool-tip">
// 					<span class="tip"></span>
// 					<span class="message">Save this item to your favorites list</span>
// 				</span>
// 			</a>
// 	</div>
// </div>

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
  imageUrl: string;
  productUrl: string;
  location: string;
  sku: string;
  price: string;
}

// <article class="product">
//   <div id="breadcrumbs">
// 	  <a href="https://www.seconduse.com/inventory/categories/decor/">Decor</a><span>&gt;</span>
// 	  <a href="https://www.seconduse.com/inventory/categories/decor/art-wall-decor/">Art &amp; Wall Decor</a><span>&gt;</span>
// 	  <a href="https://www.seconduse.com/inventory/categories/decor/art-wall-decor/other-art-wall-decor/">Other</a><span>&gt;</span>
//    </div>
// 						<div id="photos">
// 								<div id="medium-photos" class="slick-initialized slick-slider">
// 																			<div class="slick-list draggable" tabindex="0"><div class="slick-track" style="opacity: 1; width: 347px; transform: translate3d(0px, 0px, 0px);"><div class="photo slick-slide slick-active" data-thumbnail="https://s3-us-west-2.amazonaws.com/2u.inventory/seattle/846/846433.jpg?width=48&amp;height=48&amp;timestamp=59000" index="0" style="width: 347px;">
// 											<a href="#" data-index="0"><span><img src="https://s3-us-west-2.amazonaws.com/2u.inventory/seattle/846/846433.jpg?width=600&amp;height=600&amp;timestamp=59000" alt=""></span></a>
// 										</div></div></div>
// 																	</div>
// <div id="gallery">
// 	<div id="gallery-wrapper">
// 		<div class="modal">
// 			<a href="#" class="close ir">Close</a>
// 									<div class="single-photo">
// 						<img src="https://s3-us-west-2.amazonaws.com/2u.inventory/seattle/846/846433.jpg?timestamp=59000" alt="">
// 					</div>
// 		</div>
// 	</div>
// </div>
// 													</div>
// 					<div id="info">
// 						<h2>Framed Cork Board</h2>
// 						<h3 class="price">$ 10.00</h3>
// 						<div class="description"><p>Framed cork board with a small amount of wear and tear. Comes with some tacks still stuck in it!</p></div>
// 						<div id="details">
// 															<p><strong>Item:</strong> 846433-S</p>
// 															<p><strong>Location: </strong> <span class="location">Seattle</span></p>
// 															<p><strong>Rack:</strong> See Staff for Assistance</p>
// 															<p><strong>Quantity:</strong> 1</p>
// 							<p>
// 																	<strong>Width:</strong> .625 in.<br>
// 																	<strong>Length:</strong> 22.5 in.<br>
// 																	<strong>Height:</strong> 35 in.<br>
// 															</p>
// 															<p><strong>Time in Stock:</strong> Less than 1 day</p>
// 															<p><strong>Condition:</strong> Good</p>
// 															<p><strong>Job Number:</strong> 221J9401</p>
// 						</div>
// 						<div id="actions">
// 							<div id="buttons">
// 								<a href="#" id="want-this">I want this item</a>
// 																	<a href="#" class="favorite " data-id="846433-S">
// 										<span class="ir heart">Favorite</span>
// 										<span class="tool-tip">
// 											<span class="tip"></span>
// 											<span class="message">Save this item to your favorites list</span>
// 										</span>
// 									</a>
// 															</div>
// 							<div id="share">
// 								<h5>Share this product</h5>
// 										<a href="https://twitter.com/intent/tweet/?text=Framed Cork Board&amp;url=https://www.seconduse.com/?post_type=item&amp;p=3391387" class="twitter-share"><img src="https://www.seconduse.com/wp-content/themes/seconduse/img/share-twitter.png" alt="Twitter"></a>
// 		<a href="https://www.facebook.com/sharer/sharer.php?u=https://www.seconduse.com/?post_type=item&amp;p=3391387" class="facebook-share"><img src="https://www.seconduse.com/wp-content/themes/seconduse/img/share-fb.png" alt="Facebook"></a>
// 		<a href="https://www.pinterest.com/pin/create/button/?url=https://www.seconduse.com/?post_type=item&amp;p=3391387"><img src="https://www.seconduse.com/wp-content/themes/seconduse/img/share-pinterest.png" alt="Pinterest"></a>
// 		<a href="mailto:?subject=Second Use Blog: Framed Cork Board&amp;body=https://www.seconduse.com/?post_type=item&amp;p=3391387" class="email-share"><img src="https://www.seconduse.com/wp-content/themes/seconduse/img/share-email.png" alt="Email"></a>
// 									</div>
// 							<div id="view-more">
// 																	<a href="https://www.seconduse.com/inventory/job/?jobID=221J9401"><span>View more items from this job</span></a>
// 							</div>
// 							<div class="timestamp">
// 	<p>Inventory database updated 2/22/2021 5:55:07 PM</p>
// </div>
// 						</div>
// 					</div>
// 			</article>

function loadProductDetail(html): {} {
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
  const timeInStock = detail('Time in Stock');
  const condition = detail('Condition');
  const jobNumber = detail('Job Number');

  return {
    name,
    sku,
    location,
    rack,
    quantity,
    width,
    length,
    height,
    timeInStock,
    condition,
    jobNumber,
  };
}

export { loadProductIndex, loadProductDetail };
