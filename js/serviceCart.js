class ServiceCart {
    constructor(containerCart, containerCounter, productsCatalog) {
        this.containerCart = document.querySelector(containerCart);
        this.containerCounter = document.querySelector(containerCounter);
        this.productsCatalog = productsCatalog;
        this.create();
    }

    create() {
        this.containerCounter.addEventListener('click', function () {

            serviceCart.containerCart.innerHTML = '';

            serviceCart.containerCart.style.display = 'flex';
            let productsCart = serviceCart.getProductsCart();

            // to avoid costly DOM operation, will update DOM only one time
            let itemsWrapper = document.createElement('slot');

            if (productsCart.length > 0) {

                for (let product of productsCart) {

                    let itemButtonClass, itemButtonText;

                    itemButtonClass = ' item-btn-active';
                    itemButtonText = 'Remove from Cart';

                    let item = serviceBuildElement.buildElement({
                        tagName: 'div',
                        className: 'item '
                    });
                    let itemTitle = serviceBuildElement.buildElement({
                        tagName: 'div',
                        className: 'item-title',
                        innerText: product.name
                    });
                    let itemImg = serviceBuildElement.buildElement({
                        tagName: 'div',
                        className: 'item-img',
                        backgroundImage: product.img
                    });
                    let itemPrice = serviceBuildElement.buildElement({
                        tagName: 'div',
                        className: 'item-price',
                        innerText: product.price.toLocaleString() + " €"
                    });
                    let itemButton = serviceBuildElement.buildElement({
                        tagName: 'div',
                        className: 'item-btn' + itemButtonClass,
                        innerText: itemButtonText,
                        id: product.id
                    });

                    itemButton.addEventListener("click", function () {
                        let productID = parseInt(this.getAttribute("data-id"), 10);
                        let result = serviceStore.putProduct(productID);

                        let pageProductDiv = serviceProducts.container.querySelector('div[data-id="' + productID + '"]');

                        if (result.pushedProduct) {
                            this.classList.add('item-btn-active');
                            this.innerText = 'Remove from cart';
                            pageProductDiv.classList.add('item-btn-active');
                            pageProductDiv.innerText = 'Remove from cart';
                        } else {
                            this.classList.remove('item-btn-active');
                            this.innerText = 'Add to cart';
                            pageProductDiv.classList.remove('item-btn-active');
                            pageProductDiv.innerText = 'Add to cart';
                        }

                        serviceProducts.containerCounter.innerText = result.products.length;
                    });

                    item.appendChild(itemTitle);
                    item.appendChild(itemImg);
                    item.appendChild(itemPrice);
                    item.appendChild(itemButton);
                    itemsWrapper.appendChild(item);
                }
            } else {
                let itemEmptyCard = serviceBuildElement.buildElement({
                    tagName: 'div',
                    className: 'cart-empty-msg',
                    innerText: 'Your shopping cart is empty!'
                });
                let itemEmptyCardImg = serviceBuildElement.buildElement({
                    tagName: 'div',
                    className: 'cart-empty-img',
                });
                itemsWrapper.appendChild(itemEmptyCard);
                itemsWrapper.appendChild(itemEmptyCardImg);
            }

            let closeBtn = serviceBuildElement.buildElement({
                tagName: 'div',
                className: 'cart-close-btn'
            });
            closeBtn.addEventListener('click', function () {
                // serviceCart.containerCart.innerHTML = '';
                serviceCart.containerCart.style.display = 'none';
            });

            serviceCart.containerCart.appendChild(itemsWrapper);
            serviceCart.containerCart.appendChild(closeBtn);
        });
    }

    getProductsCart() {
        let products = serviceStore.getProducts();
        let productsCart = [];

        for (let el of this.productsCatalog) {
            if (products.indexOf(el.id) !== -1) {
                productsCart.push(el);
            }
        }
        return productsCart;
    }
}

let serviceCart = new ServiceCart('.container-cart', '.container-counter', productsCatalog);