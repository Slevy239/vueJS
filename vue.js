Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `<div id="app">
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image">
        </div>

        <div class="product-info">

            <h1>{{ title }}</h1>
            <p v-if='inStock'>In Stock</p>
            <p v-if='variants[selectedVariant].variantQty > 0'>{{ variants[selectedVariant].variantQty }} left in stock</p>
            <p v-else>Out of Stock!</p>
            <p>Shipping: {{ shipping }}</p >

            <ul>
                <li v-for='detail in details'>{{ detail }}</li>
            </ul>
            <div v-for='(variant, index) in variants' 
            :key='variant.variantId' 
            class="color-box"
            :style='{ backgroundColor: variant.variantColor }'
            @mouseover='updateProduct(index)'>
            </div>


            <button v-on:click='addToCart' 
            :disabled='!inStock'
            :class='{disabledButton: !inStock}'
            >Add to Cart</button>

        </div>

        <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
            <li v-for="review in reviews">
            <p>{{ review.name }}</p>
            <p>{{ review.review }}</p>
            <p>Rating: {{ review.rating }}</p>

            </li>
        </ul>
        </div>

<product-review @review-submitted="addReview"></product-review>
    </div>
</div>`,
    data() {
        return {
            brand: "Levy's",
            product: 'Socks',
            // Instock: true,
            // inventory: 20,
            // inStock: true,
            selectedVariant: 0,
            // image: 'https://images-na.ssl-images-amazon.com/images/I/81PTFhxgEwL._AC_UL1500_.jpg',
            details: ['80% cotton', '20% polyester', 'Uni-sex'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "black",
                    variantImage: 'https://images-na.ssl-images-amazon.com/images/I/81PTFhxgEwL._AC_UL1500_.jpg',
                    variantQty: 15
                },
                {
                    variantId: 2235,
                    variantColor: 'red',
                    variantImage: 'https://m.media-amazon.com/images/I/71KQw2f9taL._SR500,500_.jpg',
                    variantQty: 12,
                }
            ],
            reviews: []
        }
    },
    methods: {
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index)
        },
        addToCart() {
            this.$emit('add-to-cart',
                this.variants[this.selectedVariant].variantId)
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }
    },
    computed: {
        title() {
            return this.brand + " " + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQty
        },
        shipping() {
            if (this.premium) {
                return "Free"
            } else {
                return "$2.99"
            }
        }
    }
})

Vue.component('product-review', {
    template: `
<form class="review-form" @submit.prevent="onSubmit">

<p v-if="errors.length">
    <b>Please Correct the following error(s):</b>
    <ul>
    <li v-for="error in errors">{{ error }}</li>
    </ul>
</p>



<p>
<label for="name">Name:</label>
<input id="name" v-model="name">
</p>

<p>
<label for="review">Review:</label>
<textarea id="review" v-model="review"></textarea>
</p>

<p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
    </select>
    </p>

    <p>
    <input type="submit" value="Submit">
    </p>

    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {

                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            }
            else {
                if (!this.name) this.errors.push("Name Required")
                if (!this.review) this.errors.push("review Required")
                if (!this.rating) this.errors.push("rating Required")
            }
        }
    }
})


var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },

    }

})
