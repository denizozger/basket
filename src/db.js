let db = {
	products: {
		butter: {
			cost: 0.8
		},
		milk: {
			cost: 1.15
		},
		bread: {
			cost: 1
		}
	},
	discounts: [ 
		{
			source: {
				name: 'butter',
				appliesWhenQuantity: 2
			},
			target: {
				name: 'bread',
				discountPercentage: 0.5
			}
		},
		{
			source: {
				name: 'milk',
				appliesWhenQuantity: 3
			},
			target: {
				name: 'milk',
				discountPercentage: 1
			}
		}
	]
}

exports.getCost = productName => {
	let product = db.products[productName];
	return product ? product.cost : undefined;
};

exports.getDiscounts = () => db.discounts;