import io from 'socket.io-client'

let socket;
export const serverURL = 'https://api.chairbord.in/'

export const initializeSocket = (serverUrl, userId) => {
    console.log(serverURL, userId)
    socket = io(serverUrl, {
        query: {
            userId: userId
        }
    })
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