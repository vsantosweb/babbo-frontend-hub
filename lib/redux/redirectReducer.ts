const initialState = {
    origin: null
};

export default function redirectReducer(state = initialState, action: Record<string, any>) {
    switch (action.type) {
        case 'REGISTER_ORIGIN':
            return { ...state, origin: action.payload }
        case 'LOGIN_ORIGIN':
            return { ...state, origin: action.payload };
        default:
            return state
    }
}