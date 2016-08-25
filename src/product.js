'use strict';

const
	db = require('./db');

class Product {

  constructor(name, cost, quantity = 1) {
    this.name = name;
    this.quantity = quantity;

    this.populateUnitCost();
  }

  populateUnitCost() {
  	this.unitCost = db.getCost(this.name);
  }

  incrementQuantityBy(quantity) {
  	this.quantity += quantity;
  }

  get totalCost() {
  	return this.unitCost * this.quantity;
  }

}

module.exports = Product;
