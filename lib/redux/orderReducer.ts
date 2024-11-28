// reducers/orderReducer.js

import _ from "lodash";

const initialState = {
    orders: [], // Lista de pedidos
};

export default function orderReducer(state = initialState, action: Record<string, any>) {
    switch (action.type) {
        case 'ADD_ORDER':
            const currentCart = action.payload;

            if(_.isEmpty(state.orders)){
                return {
                    ...state,
                    orders: action.payload, 
                };
            }

            for (const cart of currentCart) {

                const updatedState = state.orders.map((order:any) => {
                    if(order.event_ticket_cart_id === cart.event_ticket_cart_id){
                        return {...order, quantity: cart.quantity}
                    }
                    return order;
                })
  
                return {
                    ...state,
                    orders: updatedState, 
                };

            }

            return {
                ...state,
                orders: [...state.orders, ...action.payload],
            };
            
        case 'REMOVE_ORDER':
            return {
                ...state,
                orders: state.orders.filter(order => order !== action.payload), // Remove o pedido pelo ID
            };
        case 'CLEAR_ORDERS':
            return {
                ...state,
                orders: [], // Limpa todos os pedidos
            };
        default:
            return state;
    }
}
