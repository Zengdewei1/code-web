const app = require('http').createServer()
const io = require('socket.io')(app);

app.listen(3000);
let clientCount=0
io.on('connection',(socket)=>{
  clientCount++
  socket.nickname='user'+clientCount
  io.emit('enter',socket.nickname+' comes in')//广播
  socket.on('message', function (str) {
    io.emit('message',socket.nickname+' says:'+str)
  });
  socket.on('disconnect',()=>{
    io.emit('leave',socket.nickname+' left')
  })
})
