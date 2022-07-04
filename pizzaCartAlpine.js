document.addEventListener("alpine:init", () =>  {
    Alpine.data("pizzaCart", () => ({
            cart: false,  
            mediumTotal: 0.00, 
            mediumQty: 0, 
            largeTotal: 0.00, 
            largeQty: 0, 
            smallTotal: 0.00, 
            smallQty: 0,
            payNow: false, 
            paymentAmount: 0,
            paymentMessage: '',
            

            cartTotal() {
                return this.largeTotal + this.mediumTotal + this.smallTotal
            },

            buyMediumPizza() {
                this.mediumTotal += 78.99
                this.mediumQty +=1
            },

            clearMediumPizza() {
                if(this.mediumQty > 0) {
                    this.mediumTotal -= 78.99
                    this.mediumQty -=1
                } 
            },

            buyLargePizza() {
                this.largeTotal += 180.99
                this.largeQty +=1
            },

            clearLargePizza() {
                if(this.largeQty > 0) {
                    this.largeTotal -= 180.99
                    this.largeQty -=1
                }
            },

            buySmallPizza() {
                this.smallTotal += 38.99
                this.smallQty +=1
            },

            clearSmallPizza() {
                if(this.smallQty > 0) {
                    this.smallTotal -= 38.99
                    this.smallQty -=1
                }   
            },
            totalQty() {
                return this.mediumQty + this.largeQty + this.smallQty;
            },

            makePayment () {
                if (this.paymentAmount === 0 || !this.paymentAmount ) {
                    this.paymentMessage = 'No Amount Entered!'
                }
                else if (this.paymentAmount >= this.cartTotal () ) {
                    this.paymentMessage = 'Payment Successful!'

                    setTimeout(() => {
                        this.payNow = false
                        this.clearCart() 
                    },4000);
                } 
                else {
                    this.paymentMessage = 'Insuffienct Amount!'
                }
            },

            clearCart () {
                this.mediumTotal = 0.00; 
                this.mediumQty = 0; 
                this.largeTotal = 0.00; 
                this.largeQty = 0; 
                this.smallTotal = 0.00;
                this.smallQty = 0;
                paymentAmount = 0;
                paymentMessage = '';
            }
    }))
})