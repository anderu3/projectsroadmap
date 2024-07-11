
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

    const projects = [
        { id: 'project1', url: 'https://github.com/anderu3/pomodorotimer', alreadyopened: false },
        { id: 'project2', url: 'https://github.com/anderu3/crossing-game', alreadyopened: false  },
        { id: 'project3', url: 'https://github.com/anderu3', alreadyopened: false  },
        { id: 'project4', url: 'https://github.com/anderu3', alreadyopened: false  },
        { id: 'project5', url: 'https://github.com/anderu3', alreadyopened: false  },
    ];

    function checkCollision() {
        const spriteRect = sprite.getBoundingClientRect();

        for (const project of projects) {
            if (!project.alreadyopened) {
                const projectElement = document.getElementById(project.id);
                if (projectElement) {
                    const projectRect = projectElement.getBoundingClientRect();

                    if (spriteRect.x < projectRect.x + projectRect.width &&
                        spriteRect.x + spriteRect.width > projectRect.x &&
                        spriteRect.y < projectRect.y + projectRect.height &&
                        spriteRect.y + spriteRect.height > projectRect.y) {
                            
                        window.open(project.url, '_blank');
                        project.alreadyopened = true;
                    }
                }
            }
        }
    }
    
    setInterval(checkCollision, 100);


    let shelves;
        // this was for laptop size, between 1536-1919 x 715-1080
        if (window.innerWidth > 1536 && window.innerWidth <= 1919 && window.innerHeight >= 781 && window.innerHeight <= 1080) {
            shelves = [87.5, 80.8, 73.3, 66.3, 59.3, 51, 43.3];
            
            // laptop size, between 1320-1535 x 600-714     
        } else if (window.innerWidth >= 1320 && window.innerWidth <= 1535 && window.innerHeight >= 600 && window.innerHeight <= 780) {
            shelves = [87, 80.8, 73.3, 66.3, 59.3, 51, 44.3];
            
        } else if (window.innerWidth == 1536 && window.innerHeight == 715) {
            shelves = [88, 80.8, 73.3, 66.3, 59.3, 51, 43.3];

        } else {
            shelves = [89, 82.5, 75, 68, 61, 52.5, 45.3];
        } 
    // desktop size was: const shelves = [89, 82.5, 75, 68, 61, 52.5, 45.3];
    // const shelves = [87.5, 80.8, 73.3, 66.3, 59.3, 51, 43.3];

    const topOfLadder = 39

    function fallToNearestShelf() {
        if (!isSpriteWithinLadder() && spritePosition.y < 88) {
            // const shelves = [89, 82.5, 75, 68, 61, 52.5, 45.3];
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
        

        switch(event.key) {
            case 'ArrowUp':
                if ((isSpriteWithinLadder() || spritePosition.y >= 91) && spritePosition.y > topOfLadder)  {
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