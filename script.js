const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d');

// 16:9 ratio game
canvas.width = 1024; // -> 64 * 16 
canvas.height = 576; // -> 64 * 9

let parsedCollisions;
let collisionBlocks;
let background;
let doors;

const player = new Player(
    { 
        imageSrc: './img/king/idle.png', 
        frameRate: 11,
        animations:{
            idleRight:{
                frameRate: 11,
                frameBuffer: 3,
                loop: true,
                imageSrc: './img/king/idle.png', 
            },
            idleLeft:{
                frameRate: 11,
                frameBuffer: 3,
                loop: true,
                imageSrc: './img/king/idleLeft.png', 
            },
            runRight:{
                frameRate: 8,
                frameBuffer: 3,
                loop: true,
                imageSrc: './img/king/runRight.png', 
            },
            runLeft:{
                frameRate: 8,
                frameBuffer: 3,
                loop: true,
                imageSrc: './img/king/runLeft.png', 
            },
            enterDoor:{
                frameRate: 8,
                frameBuffer: 3,
                loop: false,
                imageSrc: './img/king/enterDoor.png', 
                onComplete: () => {
                    console.log('completed animation, loading next map');
                    gsap.to(overlay, {
                        opacity: 1,
                        onComplete: () => {
                            level++;
                            levels[level].init();
                            player.switchSprite('idleRight');
                            player.preventInput = false;
                            gsap.to(overlay, {
                                opacity: 0
                            })
                        }
                    })
                }
            },
        }
    }
);

let level = 1;
let levels = {
    1: {
        init: ()=> {
            parsedCollisions = collisionsLevel1.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();

            player.collisionBlocks = collisionBlocks

            background = new Sprite({position:{x:0,y:0},imageSrc:'./img/backgroundLevel1.png'})

            doors = [
                new Sprite({
                    position:{
                        x: 767,
                        y: 270
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },
    2: {
        init: ()=> {
            parsedCollisions = collisionsLevel2.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();

            player.collisionBlocks = collisionBlocks
            player.position.x = 96;
            player.position.y = 140;
            if(player.currentAnimation)
                player.currentAnimation.isActive = false;

            background = new Sprite({position:{x:0,y:0},imageSrc:'./img/backgroundLevel2.png'})

            doors = [
                new Sprite({
                    position:{
                        x: 770,
                        y: 335
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },
    3: {
        init: ()=> {
            parsedCollisions = collisionsLevel3.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();

            player.collisionBlocks = collisionBlocks
            player.position.x = 780;
            player.position.y = 228;
            if(player.currentAnimation)
                player.currentAnimation.isActive = false;

            background = new Sprite({position:{x:0,y:0},imageSrc:'./img/backgroundLevel3.png'})

            doors = [
                new Sprite({
                    position:{
                        x: 174,
                        y: 334
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    }
}




const keys = {
    w:{ pressed:false},
    a:{ pressed:false},
    d:{ pressed:false}
}

const overlay = {
    opacity: 0
}
// animation loop
let animationId;
function animate(){
    animationId = window.requestAnimationFrame(animate);
    
    background.draw();
    collisionBlocks.forEach( collisionBlock => {
        collisionBlock.draw();
    })

    doors.forEach( door => {
        door.draw();
    })


    player.velocity.x = 0;
    player.handleInput(keys);

    player.draw();
    player.update();
    
    context.save();
    context.globalAlpha = overlay.opacity;
    context.fillStyle = 'black';
    context.fillRect(0,0, canvas.width, canvas.height);
    context.restore();
}

levels[level].init();
animate();

