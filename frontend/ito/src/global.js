let webSocket = undefined
export let getWebSocket = ()  => {
    if (webSocket !== undefined && webSocket !== null) {
        return webSocket
    }
    webSocket =  new WebSocket("ws:localhost:6785/gameStart")
    return webSocket
}