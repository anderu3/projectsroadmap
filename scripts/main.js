const sprite = document.getElementById('sprite');
let spriteTop = sprite.offsetTop;
let spriteLeft = sprite.offsetLeft;

window.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'ArrowUp':
            spriteTop -= 10;
            break;
        case 'ArrowDown':
            spriteTop += 10;
            break;
        case 'ArrowLeft':
            spriteLeft -= 10;
            break;
        case 'ArrowRight':
            spriteLeft += 10;
            break;
    }

    sprite.style.top = spriteTop + 'px';
    sprite.style.left = spriteLeft + 'px';

    checkCollision();
});

function checkCollision() {
    const rooms = document.getElementsByClassName('room');
    for (let i = 0; i < rooms.length; i++) {
        const room = rooms[i].getBoundingClientRect();
        const spriteRect = sprite.getBoundingClientRect();

        if (spriteRect.left < room.right &&
            spriteRect.right > room.left &&
            spriteRect.top < room.bottom &&
            spriteRect.bottom > room.top) {
            window.location.href = rooms[i].id + '.html';
        }
    }
}