class Sprite{
    constructor({position, imageSrc, frameRate = 1, animations, frameBuffer = 3, loop = true, autoplay = true}){
        this.position = position;
        this.image = new Image();
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width / this.frameRate; // frame count
            this.height = this.image.height;
        }
        this.image.src = imageSrc;
        this.loaded = false;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.elapsedFrames = 0;
        this.frameBuffer = frameBuffer;
        this.animations = animations;
        this.loop = loop;
        this.autoplay = autoplay;
        this.currentAnimation;

        if(this.animations){
            for(let key in this.animations){
                const image = new Image();
                image.src = this.animations[key].imageSrc;
                this.animations[key].image = image;
            }
        }
    }

    draw(){
        if (!this.loaded)
            return;
        const cropbox = {
            position:{
                x: this.width * this.currentFrame,
                y: 0
            },
            witdh: this.width,
            height: this.height
        }
        //context.drawImage(this.image, this.position.x, this.position.y);
        context.drawImage(
            this.image, 
            cropbox.position.x, 
            cropbox.position.y, 
            cropbox.witdh, 
            cropbox.height, 
            this.position.x, 
            this.position.y,
            this.width,
            this.height
            );
        this.updateFrames();
    }

    play(){
        this.autoplay = true;
    }

    updateFrames(){
        if(!this.autoplay)
            return;
        this.elapsedFrames++;
        if(this.elapsedFrames % this.frameBuffer === 0){
            if(this.currentFrame < this.frameRate -1) this.currentFrame ++
            else if(this.loop) this.currentFrame = 0;
        }
        
        if(this.currentAnimation?.onComplete){
            if(this.currentFrame === this.frameRate - 1 && !this.currentAnimation.isActive){
                this.currentAnimation.onComplete();
                this.currentAnimation.isActive = true;
            }  
        }
    }
}