import { io } from "socket.io-client"


const SocketState = (state = null, action) =>{
    switch(action.type){
        case "connect":{
            return io('http://' + window.location.hostname + ':3015',{
                    query:{"loggeduser": action.data.id},
                    path: "/kanban/socket/production",
                    resource: '/kanban/socket/production',
                })
        }
        case "disconnect": {
            state.disconnect();
            state = null;
            return true;
        }
        default: return state
    }
}

export const connectSocket = (id) => {
    return {
        type: 'connect',
        data: { id }
    }
}
export const disconnectSocket = () => {
    return {
        type: 'disconnect'
    }
}


export default SocketState;