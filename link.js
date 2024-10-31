const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const socket = io("http://mercure.projectheberg.com:20220");

const users = {};

// Ajoute un cercle pour un nouvel utilisateur
socket.on('user-connected', (data) => {
    for (let userId in data.users) {
        if (!users[userId]) {
            users[userId] = data.users[userId];
        }
    }
    drawCircles();
});

// Met à jour la position du cercle d'un utilisateur
socket.on('user-moved', (data) => {
    if (users[data.userId]) {
        users[data.userId] = data.position;
    }
    drawCircles();
});

// Retire le cercle d'un utilisateur déconnecté
socket.on('user-disconnected', (userId) => {
    delete users[userId];
    drawCircles();
});

canvas.addEventListener('mousemove', (event) => {
    const position = {
        x: event.clientX,
        y: event.clientY
    };
    socket.emit('move', position);
});

canvas.addEventListener('touchmove', (event) => {
    event.preventDefault(); 
    const rect = canvas.getBoundingClientRect();
    const position = {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top
    };
    socket.emit('move', position);
});

function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let userId in users) {
        const { x, y } = users[userId];
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
}
