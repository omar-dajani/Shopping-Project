export const addToCart = (param) => {
    return {
        type: 'ADD_TO_CART',
        payload: param.id
    }
}

export const checkout = () => {
    return {
        type: 'CHECKOUT'
    }
}