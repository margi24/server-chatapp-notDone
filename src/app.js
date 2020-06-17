const express = require('express')
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRouter')
const hospitalRoute = require('./routes/hospitalRoute')
const appointmentRoute = require('./routes/appointmentRouter')
const doctorRoute = require('./routes/doctorRouter')
const specialityRoute = require('./routes/specialityRouter')
const { appendFile } = require('fs')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log("socket connected")
    socket.on('enteringRoom', (roomName) => onEnteringRoom(roomName, socket))
    socket.on('newMessage', (data) => onNewwMessage(data, socket))
    socket.on('disconnect', () => {
        console.log('user left')
    })
})
 //app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded());
app.use(express.json());
app.use('/users',userRoute)
app.use('/appointment',appointmentRoute)
app.use('/auth',authRoute)
app.use('/hospital',hospitalRoute)
app.use('/speciality',specialityRoute)
app.use('/doctor',doctorRoute)

function onEnteringRoom(data, socket) {
    const room_data = JSON.parse(data)
    userName = room_data.userName;
    const roomName = room_data.roomName;
    socket.join(`${roomName}`)
    console.log('entered room')
    io.to(`${roomName}`).emit('newUserToChatRoom',userName);
}
 
function onNewwMessage(data, socket) {
    console.log('newMessage triggered')

        const messageData = JSON.parse(data)
        const messageContent = messageData.messageContent
        const roomName = messageData.roomName
        
        console.log(`[Room Number ${roomName}] ${userName} : ${messageContent}`)
        
        // Just pass the data that has been passed from the writer socket
        const chatData = {
            userName : userName,
            messageContent : messageContent,
            roomName : roomName
        }
        socket.broadcast.to(`${roomName}`).emit('updateChat',JSON.stringify(chatData))
}

server.listen(4000,"192.168.43.34")
