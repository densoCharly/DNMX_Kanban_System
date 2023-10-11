import { createStore, combineReducers } from 'redux';

import SocketState from './reducers/SocketState';
import { UsersReducer } from './reducers/UsersReducer';


const rootReducer = combineReducers({
    users: UsersReducer,
    socket: SocketState,
})


// export const store = createStore(
//     rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

export const store = createStore(SocketState);