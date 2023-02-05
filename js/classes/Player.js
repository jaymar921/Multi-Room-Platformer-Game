class Player extends Sprite{
    constructor({collisionBlocks = [], imageSrc, frameRate, animations, loop}){
        super({imageSrc, frameRate, animations, loop}); // set the property of sprite

        this.position = {
            x: 200,
            y: 200
        };
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 1;
        this.sides = {
            bottom: this.position.y + this.height
        }
        this.collisionBlocks = collisionBlocks;
        
    }

    // draw is already in Sprite.js

    update(){
        

        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkForHorizontalCollisions();

        this.applyGravity();

        this.updateHitbox();

        this.checkForVerticalCollisions();
    }

    switchSprite(name){
        if(this.image === this.animations[name].image)
            return;
        this.currentFrame = 0;
        this.image = this.animations[name].image;
        this.frameRate = this.animations[name].frameRate;
        this.frameBuffer = this.animations[name].frameBuffer;
        this.loop = this.animations[name].loop;
        this.currentAnimation = this.animations[name]
    }

    updateHitbox(){
        this.hitbox = {
            position:{
                x: this.position.x + 58,
                y: this.position.y + 34
            },
            width: 50,
            height: 53
        }
    }

    handleInput(keys){
        if(this.preventInput) return;
        if(keys.d.pressed){
            player.switchSprite('runRight');
            player.velocity.x = 5;
            player.lastDirection = 'right';
        }else if(keys.a.pressed){
            player.switchSprite('runLeft');
            player.velocity.x = -5;
            player.lastDirection = 'left';
        }else{
            if(player.lastDirection === 'left')
                player.switchSprite('idleLeft');
            else
                player.switchSprite('idleRight');
        }
    }

    checkForHorizontalCollisions(){
        // check for horizontal collisions
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i];
            // if a collision exists
            if(
                this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width && // colliding left side of player and right side of collision block
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&  // colliding right side of player and left side of collision block
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y && // colliding bottom side of player and top side of collision block
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height // colliding top side of player and bottom side of the collision block
                ){
                    // collision on the x axis going to the left
                    if(this.velocity.x < 0){ // we know that the player is moving on the left since the velocity is less than 1
                        const offset = this.hitbox.position.x - this.position.x;
                        this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01; // move the player a little bit to the right
                        break;
                    }

                    // collision on the x axis going to the right
                    if(this.velocity.x > 0){
                        const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
                        this.position.x = collisionBlock.position.x -  offset - 0.01;
                        break;
                    }
            }
        }
    }

    applyGravity(){
        // apply gravity
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
        this.sides.bottom = this.position.y + this.height;
    }

    checkForVerticalCollisions(){
        // check for vertical collisions
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i];
            // if a collision exists
            if(
                this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width && // colliding left side of player and right side of collision block
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&  // colliding right side of player and left side of collision block
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y && // colliding bottom side of player and top side of collision block
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height // colliding top side of player and bottom side of the collision block
                ){
                    // collision on the y axis going to the top
                    if(this.velocity.y < 0){ // we know that the player is moving up since the velocity is less than 1// in html rendering, negative value is going up
                        this.velocity.y = 0;
                        const offset = this.hitbox.position.y - this.position.y;
                        this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01; // move the player a little bit to the right
                        break;
                    }

                    // collision on the y axis going to the bottom
                    if(this.velocity.y > 0){
                        this.velocity.y = 0;
                        const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                        this.position.y = collisionBlock.position.y - offset - 0.01;
                        
                        break;
                    }
            }
        }
    }
}