const initialState = {
    assets: {},
    activeAsset: null,
    query: {
        offset: 10,
        page: 0,
        sort: {
            value: 1
        },
        text: ''
    }
}

const asset = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ASSETS':
            return Object.assign({}, state, {
                assets: action.assets
            })
        case 'SET_ACTIVE_ASSET':
            return Object.assign({}, state, {
                activeAsset: action.activeAsset
            })
        case 'SET_ASSETS_QUERY':
            return Object.assign({}, state, {
                query: action.query
            })
        default:
            return state
    }
}

export default asset
