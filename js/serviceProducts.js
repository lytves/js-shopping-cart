class ServiceProducts {
    constructor(containerProducts, containerCounter, productsCatalog) {
        this.container = document.querySelector(containerProducts);
        this.containerCounter = document.querySelector(containerCounter);
        this.productsCatalog = productsCatalog;
        this.create();

    }

    create() {
        // to avoid costly DOM operation, will update DOM only one time
        let itemsWrapper = document.createElement('slot');

        // on page loaded - to mark which products are already in the cart
        let cartProducts = serviceStore.getProducts();

        // on page loaded - show number of products in the cart
        this.containerCounter.innerText = cartProducts.length;

        for (let product of this.productsCatalog) {

            let itemButtonClass, itemButtonText;
            if (cartProducts.indexOf(product.id) === -1) {
                itemButtonClass = '';
                itemButtonText = 'Add to Cart';
            } else {
                itemButtonClass = ' item-btn-active';
                itemButtonText = 'Remove from Cart';
            }

            let item = this.buildElement({
                tagName: 'div',
                className: 'item '
            });
            let itemTitle = this.buildElement({
                tagName: 'div',
                className: 'item-title',
                innerText: product.name
            });
            let itemImg = this.buildElement({
                tagName: 'div',
                className: 'item-img',
                backgroundImage: product.img
            });
            let itemPrice = this.buildElement({
                tagName: 'div',
                className: 'item-price',
                innerText: product.price.toLocaleString() + " €"
            });
            let itemButton = this.buildElement({
                tagName: 'div',
                className: 'item-btn' + itemButtonClass,
                innerText: itemButtonText,
                id: product.id
            });

            itemButton.addEventListener("click", function () {
                let productID = parseInt(this.getAttribute("data-id"),10);
                let result = serviceStore.putProduct(productID);

                if (result.pushedProduct) {
                    this.classList.add('item-btn-active');
                    this.innerText = 'Remove from cart';
                } else {
                    this.classList.remove('item-btn-active');
                    this.innerText = 'Add to cart';
                }

                serviceProducts.containerCounter.innerText = result.products.length;
            });

            item.appendChild(itemTitle);
            item.appendChild(itemImg);
            item.appendChild(itemPrice);
            item.appendChild(itemButton);
            itemsWrapper.appendChild(item);
        }
        this.container.appendChild(itemsWrapper);
    }

    buildElement(options) {
        let element = document.createElement(options.tagName);

        if ('className' in options) {
            element.className = options.className;
        }

        if ('innerText' in options) {
            element.innerText = options.innerText;
        }

        if ('backgroundImage' in options) {
            element.style.backgroundImage = `url(img/${options.backgroundImage})`;

        }

        if ('id' in options) {
            element.setAttribute("data-id", options.id)
        }

        return element;
    }

    actions() {

    }
}

let serviceProducts = new ServiceProducts('.container-products', '.container-counter',productsCatalog);