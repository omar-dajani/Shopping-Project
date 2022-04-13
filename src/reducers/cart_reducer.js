const cartReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, action.payload]

        case 'CHECKOUT':
            return []

        default:
            return state
    }
}

export default cartReducer;