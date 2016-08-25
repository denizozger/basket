'use strict'

// some helper functions
global._ = require('lodash');
const precision = 2;
global.renderPrice = p => parseFloat(p.toPrecision(3));

const 
  should  = require('should'),
  Basket  = require('../src/basket'),
  Product = require('../src/product');

var
  basket, butter, milk, bread;

beforeEach('create a new basket and products', function() {
  basket = new Basket();
  butter = new Product('butter', 0.8),
  milk = new Product('milk', 1.15),
  bread = new Product('bread', 1);
});

describe('Unit tests', function() {

  describe('Data model tests', function() {

    it('should create a new basket', function() {
      basket.should.be.an.instanceOf(Basket).and.have.property('totalCost', 0);
      basket.should.be.an.instanceOf(Basket).and.have.property('products', []);
    });

    it('should create a new product', function() {
      butter.should.be.an.instanceOf(Product);
      butter.should.have.property('quantity', 1);
      butter.should.have.property('unitCost', 0.8);
    });

    it('should add a product to a basket', function() {
      basket
        .addProduct(butter)
        .getProduct(butter.name)
        .should.be.an.instanceOf(Product)
        .and.have.property('name', butter.name);
    });

    it('should add multiple products to a basket', function() {
      basket.addProducts(butter, milk, bread);
      (basket.totalNumberOfProductTypes).should.be.a.Number().and.be.exactly(3);
      (basket.productNames).should.be.an.Array().with.lengthOf(3);
    });

    it('should add same product multiple times to a basket', function() {
      basket
        .addProduct(butter)
        .addProduct(butter);
      (basket.totalNumberOfProductTypes).should.be.a.Number().and.be.exactly(1);
      (basket.getProduct(butter.name).quantity).should.be.a.Number().and.be.exactly(2);
    });

  });

});

describe('Behavioural tests', function() {

  describe('Given the basket has 1 bread, 1 butter and 1 milk', function() {
    describe('When I total the basket', function() {
      it('Then the total should be £2.95', function() {
       basket.addProducts(butter, milk, bread);
       (basket.totalCost).should.be.a.Number().and.be.exactly(2.95);
      });
    });
  });

  describe('Given the basket has 2 butter and 2 bread', function() {
    describe('When I total the basket', function() {
      it('Then the total should be £3.10', function() {
        butter.quantity = 2;
        bread.quantity = 2;
        basket.addProducts(butter, bread);
        (basket.totalCost).should.be.a.Number().and.be.exactly(3.1);
      });
    });
  });

  describe('Given the basket has 4 milk', function() {
    describe('When I total the basket', function() {
      it('Then the total should be £3.45', function() {
        milk.quantity = 4;
        basket.addProducts(milk);
        (basket.totalCost).should.be.a.Number().and.be.exactly(3.45);
      });
    });
  });

  describe('Given the basket has 2 butter, 1 bread and 8 milk', function() {
    describe('When I total the basket', function() {
      it('Then the total should be £9.00', function() {
        butter.quantity = 2;
        bread.quantity = 1;
        milk.quantity = 8;
        basket.addProducts(butter, bread, milk);
        (basket.totalCost).should.be.a.Number().and.be.exactly(9);
      });
    });
  });

});
