import { Tax } from './tax.js';
import Offer from './offer.js';
import { Type } from './type.js';

export default class Portfolio {
    /**
     * Creates an instance of the Portfolio class.
     * 
     * @constructor
     * @property {Array<Object>} stocks - An array of stock objects.
     * @property {string} stocks[].stock - The name of the stock.
     * @property {number} stocks[].totalCost - The total cost of the stock.
     * @property {number} stocks[].quantity - The quantity of the stock.
     * @property {number} stocks[].avgPrice - The average price of the stock.
     * @property {Array<Offer>} stocks[].offers - An array of offers related to the stock.
     * @property {number} carryForwardTax - The carry forward tax amount.
     */
    constructor() {
        this.stocks = [{ stock: String, totalCost: Number, quantity: Number, avgPrice: Number, offers: [Offer] }];
        this.tax = 0;
    }

    /**
     * Registers an offer for a stock. If the stock already exists in the portfolio, 
     * it updates the stock's offers, total cost, and quantity. If the stock does not exist, 
     * it adds a new stock entry to the portfolio.
     *
     * @param {Object} offer - The offer object containing details of the stock offer.
     * @param {string} offer.ticker - The ticker symbol of the stock.
     * @param {string} offer.type - The type of the offer (e.g., BUY or SELL).
     * @param {number} offer.price - The price of the stock in the offer.
     * @param {number} offer.quantity - The quantity of the stock in the offer.
     */
    registerOffer(offer) {
        const stock = this.stocks.find(s => s.stock === offer.ticker);
        if (stock) {
            stock.offers.push(offer);
            if (offer.type == Type.BUY) {
                stock.totalCost += offer.price * offer.quantity;
                stock.quantity += offer.quantity;
                stock.avgPrice = stock.totalCost / stock.quantity;
            }
            else {
                this.generateTaxReport(stock.avgPrice, offer.price, offer.quantity);
                stock.totalCost -= stock.avgPrice * offer.quantity;
                stock.quantity -= offer.quantity;
                if (stock.quantity <= 0)
                    this.stocks = this.stocks.filter(s => s.stock !== offer.ticker);
            }
        }
        else
            this.stocks.push({ stock: offer.ticker, totalCost: offer.price * offer.quantity, quantity: offer.quantity, avgPrice: offer.price / offer.quantity, offers: [offer] });
    }

    /**
     * Generates a tax report based on the average price, sell price, and quantity of stocks sold.
     * Calculates the capital gains and updates the tax amount if applicable.
     * If the tax amount exceeds the minimum declaration threshold, it logs the tax and resets the tax amount.
     *
     * @param {number} avgPrice - The average price of the stocks.
     * @param {number} sellPrice - The selling price of the stocks.
     * @param {number} quantity - The quantity of stocks sold.
     * @returns {number|undefined} - The tax amount if it exceeds the minimum declaration threshold, otherwise undefined.
     */
    generateTaxReport(avgPrice, sellPrice, quantity) {
        const capitalGains = (sellPrice - avgPrice) * quantity;
        if (capitalGains > 0) {
            this.tax += capitalGains * Tax.rate;
            if (this.tax >= Tax.minDeclaration) {
                console.log(`Tax: ${this.tax}`);
                this.tax = 0;
            }
        }
    }

    /**
     * Retrieves the average price of a stock given its ticker symbol.
     *
     * @param {string} ticker - The ticker symbol of the stock.
     * @returns {number|null} The average price of the stock if found, otherwise null.
     */
    getAvgPrice(ticker) {
        const stock = this.stocks.find(s => s.stock === ticker);
        return stock ? stock.avgPrice : null;
    }
}