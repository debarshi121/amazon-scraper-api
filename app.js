const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;

const amazonScraper = require("amazon-buddy");

const app = express();

app.use(cors());
app.options("*", cors());

app.get(`/products`, async (req, res, next) => {
	try {
		if (req.query.keyword) {
			// const reviews = await amazonScraper.reviews({ asin: "B01GW3H3U8", number: 50 });
			const products = await amazonScraper.products({ keyword: req.query.keyword, number: 50, country: "IN" });
			res.status(200).json({ products });
		} else {
			res.status(200).json({ products: [] });
		}
	} catch (error) {
		res.status(500).json({ error });
	}
});

const server = app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
