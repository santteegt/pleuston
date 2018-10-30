const initialState = {
    orders: {},
    activeOrder: null
}

const order = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ORDERS':
            return Object.assign({}, state, {
                orders: action.orders
            })
        case 'SET_ACTIVE_ORDER':
            return Object.assign({}, state, {
                activeOrder: action.activeOrder
            })
        default:
            return state
    }
}

export default order
