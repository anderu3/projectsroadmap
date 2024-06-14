document.addEventListener('DOMContentLoaded', () => {
    const sprite = document.getElementById('sprite');
    const ladder = document.querySelector('.ladder');
    const stepSize = 5;
    // const bookShelfRows = [20, 40, 60, 80];

    let spritePosition = {
        x: 10,
        y: 90,
    };
    sprite.style.left = `${spritePosition.x}vw`;
    sprite.style.top = `${spritePosition.y}vh`;

    sprite.style.transition = 'top 0.2s, left 0.2s';

    document.addEventListener('keydown', (event) => {
        switch(event.key) {
            case 'ArrowUp':
                moveSprite(0, -stepSize);
                break;
            case 'ArrowDown':
                moveSprite(0, stepSize);
                break;
            case 'ArrowLeft':
                moveSprite(-stepSize, 0);
                break;
            case 'ArrowRight':
                moveSprite(stepSize, 0);
                break;
        }
    });

    function moveSprite(deltaX, deltaY) {
        const newX = spritePosition.x + deltaX;
        const newY = spritePosition.y + deltaY;

        const ladderLeft = ladder.offsetLeft / window.innerWidth * 100;
        const ladderRight = ladderLeft + ladder.clientWidth / window.innerWidth * 100;
        const spriteCenterX = sprite.offsetLeft / window.innerWidth * 100 + (sprite.clientWidth / window.innerWidth * 100 / 2);

        if (newX >= 0 && newX <= 100 - (sprite.clientWidth / window.innerWidth * 100)) {
            spritePosition.x = newX;
            sprite.style.left = `${spritePosition.x}vw`;
        }
        if (spriteCenterX >= ladderLeft && spriteCenterX <= ladderRight) {
            if (newY >= 0 && newY <= 100 - (sprite.clientHeight / window.innerHeight * 100)) {
                spritePosition.y = newY;
                sprite.style.top = `${spritePosition.y}vh`;
            }
        }
    }
});
