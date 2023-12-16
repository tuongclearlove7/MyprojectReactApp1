export const Reconnect = async (socket) =>{

    await new Promise(resolve => setTimeout(resolve, 1500));
    socket.connect();
}