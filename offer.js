/**
 * Represents a stock offer.
 */
export default class Offer {
    /**
     * Counter to generate unique IDs for each offer.
     * @type {number}
     * @static
     */
    static counter = 0;

    /**
     * Creates an instance of Offer.
     * @param {string} ticker - The stock ticker symbol.
     * @param {number} price - The price of the stock.
     * @param {number} quantity - The quantity of the stock.
     * @param {number} type - The type of the offer (buy: 0 / sell: 1).
     */
    constructor(ticker, price, quantity, type) {
        /**
         * The unique ID of the offer.
         * @type {number}
         */
        this.id = Offer.counter++;

        /**
         * The stock ticker symbol.
         * @type {string}
         */
        this.ticker = ticker;

        /**
         * The price of the stock.
         * @type {number}
         */
        this.price = price;

        /**
         * The quantity of the stock.
         * @type {number}
         */
        this.quantity = quantity;

        /**
         * The type of the offer.
         * @type {number}
         */
        this.type = type;
    }
}