var ws = require("nodejs-websocket")

const port =3000

let clientCount=0
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	clientCount++
	conn.nickname='user'+clientCount
	let mes={}
	mes.type="enter"
	mes.data=conn.nickname+' comes in'
	broadcast(JSON.stringify(mes))
	conn.on("text", function (str) {
		console.log("Received "+str)
		let mes={}
		mes.type="message"
		mes.data=conn.nickname+' says:'+str
		broadcast(JSON.stringify(mes))
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
		let mes={}
		mes.type="leave"
		mes.data=conn.nickname+' left'
		broadcast(JSON.stringify(mes))
	})
	conn.on("error",(err)=>{
		console.log('handle error')
		console.log(err)
	})
}).listen(port)

function broadcast(str){
	server.connections.forEach((connection)=>{
		connection.sendText(str)
	})
}