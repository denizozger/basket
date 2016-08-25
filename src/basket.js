'use strict';

const
  db = require('./db'),
  Product = require('./product');

class Basket {

  /**
   * A basket with unique products; product quantites are kept in Product objects.
   * Some functions return the basket itself to chain functions.
   */
  constructor(products = []) {
    this.products = products;
  }

  addProduct(newProduct) {
    const existingProduct = this.getProduct(newProduct.name);

    if (!existingProduct) {
      this.products.push(newProduct);
    } else {
      existingProduct.incrementQuantityBy(newProduct.quantity);
    }

    return this;
  }

  addProducts(...newProducts) {
    newProducts.forEach(product => this.addProduct(product));
    return this;
  }

  getProduct(name) {
    return this.products.find(p => p.name === name);
  }

  getDiscountAmount() {
    let discountAmount = 0;

    const applicableDiscounts = db.getDiscounts().filter(discount => 
      _.includes(this.productNames, discount.source.name))

    for (const discount of applicableDiscounts) {
      const sourceProduct = this.getProduct(discount.source.name);
      const discountedProduct = this.getProduct(discount.target.name);

      let numberOfDiscountedProducts =  Math.floor(sourceProduct.quantity / discount.source.appliesWhenQuantity);
      let discountAmountPerUnit = discountedProduct.unitCost * discount.target.discountPercentage;

      discountAmount += numberOfDiscountedProducts * discountAmountPerUnit
    }

    return discountAmount;
  }

  get totalCost() {
    if (!this.products.length) {
      return 0;
    } 

    let costBeforeDiscounts = this.products
      .map(p => p.totalCost)
      .reduce((prevCost, nextCost) => prevCost + nextCost);

    const discountAmount = this.getDiscountAmount();

    return renderPrice(Math.max(costBeforeDiscounts - discountAmount, 0));
  }

  get productNames() {
    return this.products.map(p => p.name);
  }

  get totalNumberOfProductTypes() {
    return this.productNames.length;
  }

}

module.exports = Basket;
