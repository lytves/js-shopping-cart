class ServiceStore {
    constructor() {
    }

    getProducts() {
        let products = [];
        let productsLocalStorage = localStorage.getItem('products');
        if (productsLocalStorage !== null) {
            products = JSON.parse(productsLocalStorage);
        }
        return products;
    }

    putProduct(id) {
        let products = this.getProducts();
        let index = products.indexOf(id);
        let pushedProduct;

        if (index === -1) {
            products.push(id);
            pushedProduct = true;
        } else {
            products.splice(index,1);
            pushedProduct = false;
        }
        localStorage.setItem('products', JSON.stringify(products));

        return {
            pushedProduct: pushedProduct,
            products: products
        };
    }
}

let serviceStore = new ServiceStore();