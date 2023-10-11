export const UserReducer = (state = false, action) => {
    switch (action.type) {
        case '@session/login':
            return true
        case '@session/logout':
            return false
        default:
            return state
    }
}


export const login = () => {
    return {
        type: '@session/login'
    }
}

export const logout = () => {
    return {
        type: '@session/logout'
    }
}

export const selectUser = (state) => state.user