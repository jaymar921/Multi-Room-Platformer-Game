// we are using array prototype, so we can just call the function directly
// like map.parse2D(); // similar to extension methods in C#
Array.prototype.parse2D = function(){
    const rows = [];
    for (let i = 0; i < this.length; i+=16){ // depends on the map size
        rows.push(this.slice(i, i+16)); // we are slicing from array index to index+16
    }
    return rows;
}

Array.prototype.createObjectsFrom2D = function (){
    const objects = [];
    this.forEach( (row, _y) => {
        row.forEach((symbol, _x) => {
            if(symbol === 292 || symbol === 250){
                // push a new collision into collisionblocks array
                objects.push(new CollisionBlock({
                    position:{
                        x: _x * 64,
                        y: _y * 64
                    }
                }));
            }
        })
    })
    return objects;
}