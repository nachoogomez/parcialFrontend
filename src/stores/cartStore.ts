import type { Book } from "@/models/BookModel";
import { defineStore } from "pinia";


export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
            cart: [] as Book[],     
}),

    actions: {
        addCart(cart: Book):  void {
            this.cart.push(cart);
        },
        
        getCart():Book []{
            return this.cart;
        }
    
}
})
