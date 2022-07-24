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
                })
                .then(() => {
                    return this.createFeaturedPizzas();
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
                    
                });

        },

        message: 'Your Cart Id :',
        username: 'Archibald',
        pizzas: [],
        cartId: '',
        cart: { total: 0 },
        amount: 0,
        paymentResponse: '',
        featuredPizzas: [],

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

            let params = {
                cart_code : this.cartId,
                amount : this.amount
            }

            axios
                .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/pay', params)
                .then((response) => {
                    
                    this.paymentResponse = response.data.status
                    if (this.paymentResponse === "success") {
                        return this.creatCart()
                    }
                    
                }).then((response) => {
                    if(response != null) {
                        this.cartId = response.data.cart_code
                        this.cart = {}
                        this.amount = 0
                        this.paymentResponse = ''
                    }
                
                })
               
        },

        createFeaturedPizzas() {

            axios
                .get('https://pizza-cart-api.herokuapp.com/api/pizzas/featured')
                .then((response) => {
                    this.featuredPizzas = response.data.pizzas
                })
               
        },

        setFeaturedPizza(pizza, featureStatus) {

            const params = {
                featured : featureStatus,
                pizzaId : pizza.id
            }

            axios
                .post('https://pizza-cart-api.herokuapp.com/api/pizzas/featured', params)
                .then((response) => {
                    this.createFeaturedPizzas()
                })
        }


    }))
})