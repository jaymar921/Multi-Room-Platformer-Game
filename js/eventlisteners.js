// event listener
window.addEventListener('keydown', ({key})=>{
    if(player.preventInput) return;
    switch(key){
        case 'w':
            for(let i = 0; i < doors.length; i++){
                const door = doors[i];

                // making sure that the player is inside the door boundary
                if(player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width && // left side of player is inside the right side of collision block
                player.hitbox.position.x >= door.position.x &&  // right side of player is inside left side of collision block
                player.hitbox.position.y + player.hitbox.height >= door.position.y && // colliding bottom side of player and top side of collision block
                player.hitbox.position.y <= door.position.y + door.height // colliding top side of player and bottom side of the collision block
                ){
                    player.velocity.x = 0;
                    player.velocity.y = 0;
                    door.play();
                    player.preventInput = true;
                    player.switchSprite('enterDoor');
                    return;
                }
            }
            if(player.velocity.y === 0) // jump only if player is not falling
                player.velocity.y = -25;
            break;
        case 'a':
            // move player to the left
            keys.a.pressed = true;
            break;
        case 'd':
            // move player to the right
            keys.d.pressed = true;
            break;
    }
});

window.addEventListener('keyup', ({key})=>{
    switch(key){
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
});