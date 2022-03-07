const express = require('express')
const app = express()
const path = require('path')
const server = require('http').createServer(app)
const formatMessage = require('./utils/formatMessage')
const socketio = require('socket.io')
const io = socketio(server)

const bot = 'Chat bot'
// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Running client
io.on('connection', socket => {
    console.log('Socket.io is running...');

    // Clientga ma'lumot berish
    socket.emit('message', formatMessage(bot, 'Welcome to socket and hello from server...'))  // emit bu tarqatish socket emit bitta client, userga tarqatadi

    // broadcasting
    socket.broadcast.emit('message', formatMessage(bot, 'A user joined the group'))  // bu hammaga emitliydi faqat foydalanuvchini o'zidan tashqari. socket.emit dan farqi broadcast hammaga socket.emit faqat ulangan foydalanuvchini o'ziga ko'rinadi

    // io.emit('ketmon', 'HEllo everyone')  // bu hamma uchun emitlaydi
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(bot, 'A user left the chat'))
    })

    // Odamdan ma'lumot olish
    socket.on('chat-message', (msg) => {
        // console.log(msg);
        io.emit('message', formatMessage('User', msg))
    })

})

const port = normalizePort('3000' || process.env.PORT)

// Server is running
server.listen(port, () => {
    console.log('Server working on port', port);
})

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}