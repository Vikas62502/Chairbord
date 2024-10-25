import io from 'socket.io-client'

let socket;

export const serverURL = 'http://192.168.31.51:3001'

export const initializeSocket = (serverUrl, userId) => {
    socket = io(serverUrl, {
        query: {
            userId: userId
        }
    })
    console.log(socket, "socket")
    return socket;
}

export const getSocket = () => {
    if (!socket) {
        console.warn('Socket has not been initialized. Call initialize first.')
    }
    return socket;
}

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}