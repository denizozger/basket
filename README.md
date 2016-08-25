# Basket

A customer basket that allows a customer to add products and provides a total cost of the basket including applicable discounts.

Products and discounts are stored in `src/db.js`.

## Testing

Make sure you have the latest stable version of Node (>v6.4.0) or else things will break.

```sh
$ npm install
$ npm test
```

## Development notes

- The data objects and functions are implemented to satisfy the use cases defined in tests, and not over-engineered
- Seperation of concerns between objects
- Single responsibility functions
- Bits of functional programming plus ES6 here and there ʕ•ᴥ•ʔ
- As few comments as possible! (https://news.ycombinator.com/item?id=8073620)
