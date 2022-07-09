document.addEventListener("alpine:init", () => {
    Alpine.data("pizzaCart", () => ({
       

        init() {
            //call the API to get all pizzas
            //set this.pizzas

            const pizzaCartURL = 'https://pizza-cart-api.herokuapp.com/api/pizzas';

            axios
                .get(pizzaCartURL)
                .then((result) => {
                    this.pizzas = result.data.pizzas;
                })
                .then(() => {
                   return this.creatCart();
                })
                .then((result) => {
                    this.cartId = result.data.cart_code;
                });


        },

        pizzaImg(pizza) {
            return `./Images/${pizza.size}.jpg`;
        },


        creatCart() {
            
            return axios.get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username=' + this.username)
            
        },


        showCart() {
            const url = `https://pizza-cart-api.herokuapp.com/api/pizza-cart/${this.cartId}/get`;

            axios
                .get(url)
                .then((result) => {
                    this.cart = result.data;
                    console.log(this.cart)
                });

        },

        message: 'Your Cart Id :',
        username: 'Archibald',
        pizzas: [],
        cartId : '',
        cart : { total: 0 },
        amountPaid : 0,
        paymentResponse : '',

        add(pizza) {
            // cart Id so that user can add pizza to id
           const params = {
                cart_code: this.cartId,
                pizza_id: pizza.id
            }

            axios
                .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/add', params)
                .then(() => {
                    this.message = "Pizza added to the cart"
                    this.showCart();
            })
        },

        remove(pizza) {

            const params = {
                card_code: this.cartId,
                pizza_id: pizza.id
            }

            axios
                .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/remove', params)
                .then(() => {
                    this.message = "Pizza removed from the cart"
                    this.showCart();
                })
        }, 

        payPizza(cart_code) {

            axios
                .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/${this.cartId}/pay')
                .then(() => {
                    cart.total = this.amountPaid
                    this.paymentResponse = data.status
                })
        },

        featuredPizzas() {

            axios
                .get('https://pizza-cart-api.herokuapp.com/api/pizzas/featured')
                .then((results) => {
                    this.pizzas = result.data.pizza
                })
        }
 

    }))
})