type authentication = {
    username: string,
    password: string
}

type usernameCheck = {
    username: string
}

type SocketResponse = {
    success: boolean,
    message: string,
    data: any
}

export { authentication, usernameCheck, SocketResponse };