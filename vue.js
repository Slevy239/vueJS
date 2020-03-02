var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        // Instock: true,
        inventory: 0,
        image: 'https://images-na.ssl-images-amazon.com/images/I/81PTFhxgEwL._AC_UL1500_.jpg',
        details: ['80% cotton', '20% polyester', 'Uni-sex'],
        variants: [
            {
                variantId: 2234,
                variantColor: "black",
                variantImage: 'https://images-na.ssl-images-amazon.com/images/I/81PTFhxgEwL._AC_UL1500_.jpg',
            },
            {
                variantId: 2235,
                variantColor: 'white',
                variantImage: 'https://dks.scene7.com/is/image/GolfGalaxy/SX4445_101-White_FRT?wid=685&fmt=jpg'
            }
        ],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1 
        },
        updateProduct(variantImage) {
            this.image = variantImage

        }
    }

})
