var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: 'https://images-na.ssl-images-amazon.com/images/I/81PTFhxgEwL._AC_UL1500_.jpg',
        // Instock: true,
        inventory: 0,
        details: ['80% cotton', '20% polyester', 'Uni-sex'],
        variants: [
            {
                variantId: 2234,
                variantColor: "black"
            },
            {
                variantId: 2235,
                variantColor: 'white'
            }
        ],
        cart: 0
    },
    methods: {
        addToCart: function () {
            this.cart += 1 
        }
    }
})
