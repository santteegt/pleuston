const initialState = {
    assets: {},
    activeAsset: null,
    search: {
        text: '',
        page: 0
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
        case 'SET_ASSET_SEARCH_PAGE':
            return Object.assign({}, state, {
                search: {
                    page: action.page
                }
            })
        default:
            return state
    }
}

export default asset
