
var Student = {
    name: 'Colen',
    class: 5,
    marks: [75,90,80,100],
    age: 11
}

var car = {
    name: 'SPAMTON',
    cost: 234,
    x: 200,
    y: 200,
    radius: 22,
    speed: 10,
    color: ['white','black','yellow','pink']
}
var rand;
var carThing

function setup(){
    //console.log(Student.marks[3]);
    createCanvas[400,400];
    
    rand = Math.round(random[0,3]);

    carThing = createSprite(200,car.y,car.radius,car.cost);
}

function draw(){
    background('purple');
    var randColor = car.color[0,1,2,3];
    carThing.shapeColor = randColor;
    
    drawSprites();
}