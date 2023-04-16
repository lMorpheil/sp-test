class Basket {
	constructor() {
		this.init();
	}
	init() {
		this.production = document.querySelector('[data-js="production-wrapper"]');
		this.price = document.querySelector('[data-js="price-wrapper"]');
		this.rotate = this.priceCalculate.bind(this);
		this.production.addEventListener('click', ev => this.deleteProduction(ev));
		this.production.addEventListener('click', ev => this.productDecrement(ev));
		this.production.addEventListener('click', ev => this.productIncrement(ev));
	}

	deleteProduction(ev) {
		if (ev.target.closest('[data-js="delete"]')) {
			ev.target.closest('.product__item').remove();
			this.rotate();
		}
	}
	productIncrement(ev) {
		if (ev.target.closest('.product__btn_decrement')) {
			const count = ev.target
				.closest('.product__item')
				.querySelector('.product__counter').innerHTML;
			ev.target.closest('.product__item').querySelector('.product__counter').innerHTML = +count + 1;
			this.rotate();
		}
	}
	productDecrement(ev) {
		if (ev.target.closest('.product__btn_increment')) {
			const count = ev.target
				.closest('.product__item')
				.querySelector('.product__counter').innerText;
			if (count > 0) {
				ev.target.closest('.product__item').querySelector('.product__counter').innerText -= 1;
				this.rotate();
			}
		}
	}
	priceCalculate() {
		const productCard = this.production.querySelectorAll('.product__item');
		const productData = [];
		let tax = this.price.querySelector('.tax > *:last-child').innerText.slice(1);
		let shipping = this.price.querySelector('.shipping > *:last-child').innerText.slice(1);

		[...productCard].forEach(item => {
			const product = {};
			product.count = item.querySelector('.product__counter').innerText.trim();
			product.price = item.querySelector('.product__price').innerText.slice(1).trim();

			productData.push(product);
		});

		const subtotal = productData.reduce((sum, current) => sum + current.count * current.price, 0);
		const count = productData.reduce((sum, current) => sum + +current.count, 0);
		if (subtotal === 0) {
			tax = 0;
			shipping = 0;
		} else {
			tax = 100;
			shipping = 150;
		}
		const total = subtotal + +tax + +shipping;
		this.render(subtotal, total, tax, shipping, count);
	}

	render(subtotal, total, tax, shipping, count) {
		const subPrice = (this.price.querySelector('.subtotal > *:last-child').innerHTML =
			'$' + subtotal);
		this.price.querySelector('.tax > *:last-child').innerText = '$' + tax;
		this.price.querySelector('.shipping > *:last-child').innerText = '$' + shipping;
		this.price.querySelector('.total > *:last-child').innerHTML = '$' + total;
		document.querySelector('.menu__counter').innerText = count;
	}
}

export default Basket;
