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
        cartId: '',
        cart: { total: 0 },
        amountPaid: 0,
        paymentResponse: '',

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

        // remove(pizza) {

        //     const params = {
        //         card_code: this.cartId,
        //         pizza_id: pizza.id
        //     }

        //     axios
        //         .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/remove', params)
        //         .then(() => {
        //             this.message = "Pizza removed from the cart"
        //             this.showCart();

        //         })
        //     alert('')
        // },


        remove(pizza) {
            // /api/pizza-cart/remove
            const params = {
              cart_code : this.cartId,
              pizza_id : pizza.id
            }
    
            axios
              .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/remove', params)
              .then(()=>{
                this.message= "Pizza removed from the cart"
                this.showCart();
              })
              .catch(err=>alert(err));
    
        },


        payPizza(cart_code) {

            axios
                .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/pay')
                .then(() => {
                    this.amountPaid === this.cart.total
                    this.paymentResponse = this.cart.status
                })
                .catch(err=>alert(err));
        },

        featuredPizzas(pizza) {

            axios
                .get('https://pizza-cart-api.herokuapp.com/api/pizzas/featured')
                .then((result) => {
                    this.pizzas = result.data.pizza
                })
        }


    }))
})