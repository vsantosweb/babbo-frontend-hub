// reducers/orderReducer.js

const initialState = {
    orders: [], // Lista de pedidos
};

export default function orderReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ORDER':
            return {
                ...state,
                orders: [...state.orders, action.payload], // Adiciona um novo pedido
            };
        case 'REMOVE_ORDER':
            return {
                ...state,
                orders: state.orders.filter(order => order.id !== action.payload), // Remove o pedido pelo ID
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
