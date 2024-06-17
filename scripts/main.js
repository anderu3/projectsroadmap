
document.addEventListener('DOMContentLoaded', () => {
    const sprite = document.getElementById('sprite');
    const ladder = document.querySelector('.ladder');
    const stepSize = 2;

    let spritePosition = {
        x: 10,
        y: 90,
    };
    sprite.style.left = `${spritePosition.x}vw`;
    sprite.style.top = `${spritePosition.y}vh`;

    sprite.style.transition = 'top 0.2s, left 0.2s';


    function fallToNearestShelf() {
        if (!isSpriteWithinLadder() && spritePosition.y < 88) {
            const shelves = [89, 82.5, 75, 68, 61, 52.5, 45.3];
            let nearestShelf = shelves[0];
    
            for (let i = 0; i < shelves.length; i++) {
                if (spritePosition.y < shelves[i] - 5) { // account for sprite feet, change if needed for new sprite
                    nearestShelf = shelves[i];
                } else {
                    break;
                }
            }
    
            if (spritePosition.y !== nearestShelf - 5) { // account for sprite feet
                spritePosition.y = nearestShelf - 5; 
                sprite.style.top = `${spritePosition.y}vh`;
            }
        }
    }
    

    document.addEventListener('keydown', (event) => {
        const shelves = [89, 82.5, 75, 68, 61, 52.5, 45.3];

        switch(event.key) {
            case 'ArrowUp':
                if ((isSpriteWithinLadder() || spritePosition.y >= 91) && spritePosition.y > 40.3)  {
                    moveSprite(0, -stepSize);
                }
                break;
            case 'ArrowDown':
                if ((isSpriteWithinLadder() && spritePosition.y <= 89) || spritePosition.y >= 90) {
                    moveSprite(0, stepSize);
                }
                break;
            case 'ArrowLeft':
                if (spritePosition.y >= 90 || spritePosition.x > ladder.offsetLeft / window.innerWidth * 100) {
                    moveSprite(-stepSize, 0); // account for sprite feet
                    if (!shelves.includes(spritePosition.y + 5) && !isSpriteWithinLadder()) {
                        fallToNearestShelf();
                    }
                }
                break;
            case 'ArrowRight':
                if (spritePosition.x < 63 || spritePosition.y > 89) {
                    moveSprite(stepSize, 0); // account for sprite feet
                    if (!shelves.includes(spritePosition.y + 5) && !isSpriteWithinLadder()) {
                        fallToNearestShelf();
                    }
                }
                break;
        }
    });
    
    function isSpriteWithinLadder() {
        const ladderLeft = ladder.offsetLeft / window.innerWidth * 100;
        const ladderRight = ladderLeft + ladder.clientWidth / window.innerWidth * 100;
        const spriteCenterX = sprite.offsetLeft / window.innerWidth * 100 + (sprite.clientWidth / window.innerWidth * 100 / 2);
        return spriteCenterX >= ladderLeft && spriteCenterX <= ladderRight;
    }
    
    function moveSprite(deltaX, deltaY) {
        const newX = spritePosition.x + deltaX;
        const newY = spritePosition.y + deltaY;
    
        if (newX >= 0 && newX <= 100 - (sprite.clientWidth / window.innerWidth * 100)) {
            spritePosition.x = newX;
            sprite.style.left = `${spritePosition.x}vw`;
        }
        if ((isSpriteWithinLadder() || spritePosition.y <= 90 || spritePosition.y >= 92) && newY >= 0 && newY <= 100 - (sprite.clientHeight / window.innerHeight * 100)) {
            spritePosition.y = newY;
            sprite.style.top = `${spritePosition.y}vh`;
        }
        console.log(`Sprite Y position: ${spritePosition.y}`);
        console.log(`Sprite X position: ${spritePosition.x}`);
    }
}   );