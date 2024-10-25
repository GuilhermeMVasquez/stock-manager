import express from 'express';
import Portfolio from './portfolio.js';
import Offer from './offer.js';
import 'dotenv/config';

const app = express();
app.use(express.json());

const portfolio = new Portfolio();

app.post('/offer', (req, res) => {
    portfolio.registerOffer(new Offer(req.body.ticker.toUpperCase(), req.body.price, req.body.quantity, req.body.type));
    res.send('Offer registered successfully!');
});

app.get(`/avgprice`, (req, res) => {
    const ticker = req.query.ticker.toUpperCase();
    const avgPrice = portfolio.getAvgPrice(ticker);
    if (avgPrice)
        res.send(`Average price of ${ticker}: ${portfolio.getAvgPrice(ticker)}`);
    else
        res.send(`Stock ${ticker} not found!`);
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});