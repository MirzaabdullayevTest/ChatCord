const chatForm = document.querySelector('#chat-form');
const msgInp = document.querySelector('#msg');
const chatMessages = document.querySelector('.chat-messages');
const socket = io()

socket.on('message', msg => {
    outputMessages(msg)

    chatMessages.scrollTop = chatMessages.scrollHeight
})

// socket.on('disconnect', msg => {
//     console.log(msg);
// })

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // const msg = e.target.elements.msg.value
    const msg = msgInp.value
    socket.emit('chat-message', msg)

    msgInp.value = ''
})

// Output Message DOM
function outputMessages(msg) {
    const div = document.createElement('div')
    div.classList.add('message')

    div.innerHTML = `
    <p class="meta">${msg.username} <span>${msg.time}</span></p>
    <p class="text">
      ${msg.msg}
    </p>
    `

    document.querySelector('.chat-messages').appendChild(div);
}




