const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const port = process.env.PORT || 3005;

const amazonScraper = require("amazon-buddy");

const app = express();

app.use(cors());
app.options("*", cors());
app.use(helmet());

app.get(`/products`, async (req, res, next) => {
	try {
		if (req.query.keyword) {
			const products = await amazonScraper.products({ keyword: req.query.keyword, number: 50, country: "IN" });
			res.status(200).json({ products });
		} else {
			res.status(200).json({ products: [] });
		}
	} catch (error) {
		res.status(500).json({ error });
	}
});

app.get(`/products/:asin`, async (req, res, next) => {
	try {
		const product = await amazonScraper.asin({ asin: req.params.asin, country: "IN" });
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ error });
	}
});

app.get(`/products/:asin/reviews`, async (req, res, next) => {
	try {
		const reviews = await amazonScraper.reviews({ asin: req.params.asin, number: 50, country: "IN" });
		res.status(200).json(reviews);
	} catch (error) {
		res.status(500).json({ error });
	}
});

const server = app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
