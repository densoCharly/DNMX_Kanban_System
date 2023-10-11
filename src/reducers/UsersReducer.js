const initialState = {
    usersList: [],
    usersSearch: [],
}

export const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case '@users/init_users':
            return {...state, ...action.payload }
        default:
            return state
    }
}

export const initUsers = (users) => {
    return {
        type: '@users/init_users',
        payload: users
    }
}

export const selectUsersList = (state) => state.users